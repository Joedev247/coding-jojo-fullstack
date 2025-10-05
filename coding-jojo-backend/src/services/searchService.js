const { Client } = require('@elastic/elasticsearch');
const mongoose = require('mongoose');

class SearchService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.initializeClient();
  }

  async initializeClient() {
    // Only initialize Elasticsearch if enabled
    if (process.env.ELASTICSEARCH_ENABLED === 'false') {
      console.log('Elasticsearch disabled, using MongoDB search fallback');
      this.isConnected = false;
      return;
    }

    try {
      this.client = new Client({
        node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
        auth: process.env.ELASTICSEARCH_USERNAME ? {
          username: process.env.ELASTICSEARCH_USERNAME,
          password: process.env.ELASTICSEARCH_PASSWORD
        } : undefined,
        requestTimeout: 5000,
        pingTimeout: 3000,
        maxRetries: 1
      });

      // Test connection with shorter timeout
      const health = await this.client.cluster.health();
      console.log('Elasticsearch connected:', health.cluster_name);
      this.isConnected = true;

      // Initialize indices
      await this.initializeIndices();
    } catch (error) {
      console.error('Elasticsearch connection failed:', error.message);
      console.log('Falling back to MongoDB search');
      this.isConnected = false;
      this.client = null;
    }
  }

  async initializeIndices() {
    const indices = {
      courses: {
        mappings: {
          properties: {
            title: { 
              type: 'text', 
              analyzer: 'standard',
              fields: {
                keyword: { type: 'keyword' },
                autocomplete: {
                  type: 'text',
                  analyzer: 'autocomplete',
                  search_analyzer: 'standard'
                }
              }
            },
            description: { type: 'text', analyzer: 'standard' },
            content: { type: 'text', analyzer: 'standard' },
            category: { type: 'keyword' },
            subcategory: { type: 'keyword' },
            level: { type: 'keyword' },
            language: { type: 'keyword' },
            tags: { type: 'keyword' },
            instructor: {
              type: 'object',
              properties: {
                id: { type: 'keyword' },
                name: { type: 'text' },
                bio: { type: 'text' }
              }
            },
            price: { type: 'float' },
            duration: { type: 'integer' },
            rating: { type: 'float' },
            reviewCount: { type: 'integer' },
            enrollmentCount: { type: 'integer' },
            createdAt: { type: 'date' },
            updatedAt: { type: 'date' },
            isPublished: { type: 'boolean' },
            isFree: { type: 'boolean' },
            location: { type: 'geo_point' }
          }
        },
        settings: {
          analysis: {
            analyzer: {
              autocomplete: {
                tokenizer: 'autocomplete',
                filter: ['lowercase']
              }
            },
            tokenizer: {
              autocomplete: {
                type: 'edge_ngram',
                min_gram: 2,
                max_gram: 10,
                token_chars: ['letter', 'digit']
              }
            }
          }
        }
      },
      users: {
        mappings: {
          properties: {
            name: { 
              type: 'text',
              fields: {
                keyword: { type: 'keyword' },
                autocomplete: {
                  type: 'text',
                  analyzer: 'autocomplete',
                  search_analyzer: 'standard'
                }
              }
            },
            email: { type: 'keyword' },
            bio: { type: 'text' },
            skills: { type: 'keyword' },
            role: { type: 'keyword' },
            location: {
              type: 'object',
              properties: {
                country: { type: 'keyword' },
                city: { type: 'keyword' },
                coordinates: { type: 'geo_point' }
              }
            },
            createdAt: { type: 'date' },
            isActive: { type: 'boolean' },
            completedCourses: { type: 'integer' },
            averageRating: { type: 'float' }
          }
        }
      },
      lessons: {
        mappings: {
          properties: {
            title: { 
              type: 'text',
              fields: {
                keyword: { type: 'keyword' },
                autocomplete: {
                  type: 'text',
                  analyzer: 'autocomplete',
                  search_analyzer: 'standard'
                }
              }
            },
            content: { type: 'text', analyzer: 'standard' },
            transcript: { type: 'text', analyzer: 'standard' },
            courseId: { type: 'keyword' },
            courseTitle: { type: 'text' },
            sectionTitle: { type: 'text' },
            duration: { type: 'integer' },
            type: { type: 'keyword' }, // video, text, quiz, etc.
            order: { type: 'integer' },
            tags: { type: 'keyword' },
            createdAt: { type: 'date' }
          }
        }
      },
      discussions: {
        mappings: {
          properties: {
            title: { 
              type: 'text',
              fields: {
                keyword: { type: 'keyword' }
              }
            },
            content: { type: 'text', analyzer: 'standard' },
            courseId: { type: 'keyword' },
            userId: { type: 'keyword' },
            userName: { type: 'text' },
            tags: { type: 'keyword' },
            category: { type: 'keyword' },
            createdAt: { type: 'date' },
            replyCount: { type: 'integer' },
            viewCount: { type: 'integer' },
            isResolved: { type: 'boolean' }
          }
        }
      }
    };

    for (const [indexName, config] of Object.entries(indices)) {
      try {
        const exists = await this.client.indices.exists({ index: indexName });
        if (!exists) {
          await this.client.indices.create({
            index: indexName,
            body: config
          });
          console.log(`Created index: ${indexName}`);
        }
      } catch (error) {
        console.error(`Failed to create index ${indexName}:`, error);
      }
    }
  }

  // Index a document
  async indexDocument(index, id, document) {
    if (!this.isConnected) {
      return { success: false, error: 'Elasticsearch not connected' };
    }

    try {
      const response = await this.client.index({
        index,
        id,
        body: document
      });

      return { success: true, result: response.body };
    } catch (error) {
      console.error(`Failed to index document in ${index}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Bulk index documents
  async bulkIndex(index, documents) {
    if (!this.isConnected) {
      return { success: false, error: 'Elasticsearch not connected' };
    }

    try {
      const body = documents.flatMap(doc => [
        { index: { _index: index, _id: doc._id || doc.id } },
        doc
      ]);

      const response = await this.client.bulk({ body });

      return {
        success: true,
        indexed: response.body.items.length,
        errors: response.body.errors
      };
    } catch (error) {
      console.error(`Failed to bulk index in ${index}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Search courses
  async searchCourses(query, options = {}) {
    const {
      page = 1,
      limit = 20,
      category,
      level,
      priceRange,
      rating,
      duration,
      language,
      location,
      sortBy = 'relevance'
    } = options;

    if (this.isConnected) {
      return await this.elasticsearchSearch('courses', query, {
        page, limit, category, level, priceRange, rating, duration, language, location, sortBy
      });
    } else {
      return await this.mongoSearch('courses', query, options);
    }
  }

  // Search users/instructors
  async searchUsers(query, options = {}) {
    const {
      page = 1,
      limit = 20,
      role,
      location,
      skills,
      sortBy = 'relevance'
    } = options;

    if (this.isConnected) {
      return await this.elasticsearchSearch('users', query, {
        page, limit, role, location, skills, sortBy
      });
    } else {
      return await this.mongoSearch('users', query, options);
    }
  }

  // Search lessons
  async searchLessons(query, options = {}) {
    const {
      page = 1,
      limit = 20,
      courseId,
      type,
      sortBy = 'relevance'
    } = options;

    if (this.isConnected) {
      return await this.elasticsearchSearch('lessons', query, {
        page, limit, courseId, type, sortBy
      });
    } else {
      return await this.mongoSearch('lessons', query, options);
    }
  }

  // Search discussions
  async searchDiscussions(query, options = {}) {
    const {
      page = 1,
      limit = 20,
      courseId,
      category,
      isResolved,
      sortBy = 'relevance'
    } = options;

    if (this.isConnected) {
      return await this.elasticsearchSearch('discussions', query, {
        page, limit, courseId, category, isResolved, sortBy
      });
    } else {
      return await this.mongoSearch('discussions', query, options);
    }
  }

  // Elasticsearch search implementation
  async elasticsearchSearch(index, query, options) {
    try {
      const { page, limit, sortBy } = options;
      const from = (page - 1) * limit;

      // Build query
      const searchBody = {
        query: this.buildElasticsearchQuery(index, query, options),
        from,
        size: limit,
        highlight: {
          fields: {
            title: {},
            description: {},
            content: {}
          }
        }
      };

      // Add sorting
      if (sortBy && sortBy !== 'relevance') {
        searchBody.sort = this.buildSort(sortBy);
      }

      // Add aggregations for faceted search
      searchBody.aggs = this.buildAggregations(index);

      const response = await this.client.search({
        index,
        body: searchBody
      });

      const hits = response.body.hits;
      const aggregations = response.body.aggregations;

      return {
        success: true,
        data: {
          results: hits.hits.map(hit => ({
            ...hit._source,
            score: hit._score,
            highlights: hit.highlight
          })),
          total: hits.total.value,
          page,
          limit,
          pages: Math.ceil(hits.total.value / limit),
          aggregations: this.formatAggregations(aggregations)
        }
      };
    } catch (error) {
      console.error(`Elasticsearch search failed in ${index}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Build Elasticsearch query
  buildElasticsearchQuery(index, query, options) {
    const must = [];
    const filter = [];

    // Main search query
    if (query) {
      const multiMatch = {
        multi_match: {
          query,
          fields: this.getSearchFields(index),
          type: 'best_fields',
          fuzziness: 'AUTO',
          prefix_length: 2
        }
      };
      must.push(multiMatch);
    } else {
      must.push({ match_all: {} });
    }

    // Add filters based on index type
    switch (index) {
      case 'courses':
        this.addCourseFilters(filter, options);
        break;
      case 'users':
        this.addUserFilters(filter, options);
        break;
      case 'lessons':
        this.addLessonFilters(filter, options);
        break;
      case 'discussions':
        this.addDiscussionFilters(filter, options);
        break;
    }

    return {
      bool: {
        must,
        filter
      }
    };
  }

  getSearchFields(index) {
    const fieldMap = {
      courses: ['title^3', 'description^2', 'content', 'tags^2', 'instructor.name'],
      users: ['name^3', 'bio^2', 'skills^2'],
      lessons: ['title^3', 'content^2', 'transcript'],
      discussions: ['title^3', 'content^2', 'tags']
    };
    return fieldMap[index] || ['title', 'content'];
  }

  addCourseFilters(filter, options) {
    if (options.category) {
      filter.push({ term: { category: options.category } });
    }
    if (options.level) {
      filter.push({ term: { level: options.level } });
    }
    if (options.language) {
      filter.push({ term: { language: options.language } });
    }
    if (options.priceRange) {
      filter.push({
        range: {
          price: {
            gte: options.priceRange.min,
            lte: options.priceRange.max
          }
        }
      });
    }
    if (options.rating) {
      filter.push({
        range: {
          rating: { gte: options.rating }
        }
      });
    }
    if (options.duration) {
      filter.push({
        range: {
          duration: {
            gte: options.duration.min,
            lte: options.duration.max
          }
        }
      });
    }
    // Always show only published courses
    filter.push({ term: { isPublished: true } });
  }

  addUserFilters(filter, options) {
    if (options.role) {
      filter.push({ term: { role: options.role } });
    }
    if (options.skills && options.skills.length > 0) {
      filter.push({ terms: { skills: options.skills } });
    }
    if (options.location) {
      filter.push({ term: { 'location.country': options.location } });
    }
    // Always show only active users
    filter.push({ term: { isActive: true } });
  }

  addLessonFilters(filter, options) {
    if (options.courseId) {
      filter.push({ term: { courseId: options.courseId } });
    }
    if (options.type) {
      filter.push({ term: { type: options.type } });
    }
  }

  addDiscussionFilters(filter, options) {
    if (options.courseId) {
      filter.push({ term: { courseId: options.courseId } });
    }
    if (options.category) {
      filter.push({ term: { category: options.category } });
    }
    if (options.isResolved !== undefined) {
      filter.push({ term: { isResolved: options.isResolved } });
    }
  }

  buildSort(sortBy) {
    const sortMap = {
      price_asc: [{ price: { order: 'asc' } }],
      price_desc: [{ price: { order: 'desc' } }],
      rating: [{ rating: { order: 'desc' } }],
      newest: [{ createdAt: { order: 'desc' } }],
      oldest: [{ createdAt: { order: 'asc' } }],
      popular: [{ enrollmentCount: { order: 'desc' } }],
      name: [{ 'title.keyword': { order: 'asc' } }]
    };
    return sortMap[sortBy] || [{ _score: { order: 'desc' } }];
  }

  buildAggregations(index) {
    const aggMap = {
      courses: {
        categories: { terms: { field: 'category', size: 20 } },
        levels: { terms: { field: 'level', size: 10 } },
        languages: { terms: { field: 'language', size: 20 } },
        price_ranges: {
          range: {
            field: 'price',
            ranges: [
              { key: 'free', from: 0, to: 0.01 },
              { key: 'under_50', from: 0.01, to: 50 },
              { key: '50_100', from: 50, to: 100 },
              { key: '100_200', from: 100, to: 200 },
              { key: 'over_200', from: 200 }
            ]
          }
        },
        ratings: {
          range: {
            field: 'rating',
            ranges: [
              { key: '4_plus', from: 4 },
              { key: '3_plus', from: 3 },
              { key: '2_plus', from: 2 },
              { key: '1_plus', from: 1 }
            ]
          }
        }
      },
      users: {
        roles: { terms: { field: 'role', size: 10 } },
        countries: { terms: { field: 'location.country', size: 20 } },
        skills: { terms: { field: 'skills', size: 50 } }
      },
      discussions: {
        categories: { terms: { field: 'category', size: 20 } },
        resolved_status: { terms: { field: 'isResolved' } }
      }
    };
    return aggMap[index] || {};
  }

  formatAggregations(aggregations) {
    const formatted = {};
    for (const [key, agg] of Object.entries(aggregations || {})) {
      if (agg.buckets) {
        formatted[key] = agg.buckets.map(bucket => ({
          key: bucket.key,
          count: bucket.doc_count
        }));
      }
    }
    return formatted;
  }

  // MongoDB fallback search
  async mongoSearch(type, query, options) {
    try {
      const models = {
        courses: mongoose.model('Course'),
        users: mongoose.model('User'),
        lessons: mongoose.model('Lesson'),
        discussions: mongoose.model('Discussion')
      };

      const Model = models[type];
      if (!Model) {
        return { success: false, error: 'Invalid search type' };
      }

      const { page = 1, limit = 20 } = options;
      const skip = (page - 1) * limit;

      // Build MongoDB query
      const searchQuery = this.buildMongoQuery(type, query, options);
      const sortQuery = this.buildMongoSort(options.sortBy);

      const [results, total] = await Promise.all([
        Model.find(searchQuery).sort(sortQuery).skip(skip).limit(limit),
        Model.countDocuments(searchQuery)
      ]);

      return {
        success: true,
        data: {
          results,
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error(`MongoDB search failed for ${type}:`, error);
      return { success: false, error: error.message };
    }
  }

  buildMongoQuery(type, query, options) {
    const baseQuery = {};

    // Add text search if query provided
    if (query) {
      baseQuery.$text = { $search: query };
    }

    // Add type-specific filters
    switch (type) {
      case 'courses':
        baseQuery.isPublished = true;
        if (options.category) baseQuery.category = options.category;
        if (options.level) baseQuery.level = options.level;
        if (options.language) baseQuery.language = options.language;
        break;
      case 'users':
        baseQuery.isActive = true;
        if (options.role) baseQuery.role = options.role;
        break;
      case 'lessons':
        if (options.courseId) baseQuery.courseId = options.courseId;
        if (options.type) baseQuery.type = options.type;
        break;
      case 'discussions':
        if (options.courseId) baseQuery.courseId = options.courseId;
        if (options.category) baseQuery.category = options.category;
        if (options.isResolved !== undefined) baseQuery.isResolved = options.isResolved;
        break;
    }

    return baseQuery;
  }

  buildMongoSort(sortBy) {
    const sortMap = {
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      rating: { rating: -1 },
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      popular: { enrollmentCount: -1 },
      name: { title: 1 }
    };
    return sortMap[sortBy] || { score: { $meta: 'textScore' } };
  }

  // Get search suggestions/autocomplete
  async getSuggestions(index, query, limit = 10) {
    if (!this.isConnected) {
      return { success: false, error: 'Elasticsearch not connected' };
    }

    try {
      const response = await this.client.search({
        index,
        body: {
          query: {
            multi_match: {
              query,
              fields: [`title.autocomplete`],
              type: 'bool_prefix'
            }
          },
          size: limit,
          _source: ['title', 'id']
        }
      });

      const suggestions = response.body.hits.hits.map(hit => ({
        id: hit._source.id,
        title: hit._source.title,
        score: hit._score
      }));

      return { success: true, data: suggestions };
    } catch (error) {
      console.error(`Failed to get suggestions from ${index}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Delete document from index
  async deleteDocument(index, id) {
    if (!this.isConnected) {
      return { success: false, error: 'Elasticsearch not connected' };
    }

    try {
      await this.client.delete({
        index,
        id
      });
      return { success: true };
    } catch (error) {
      console.error(`Failed to delete document from ${index}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Update document in index
  async updateDocument(index, id, document) {
    if (!this.isConnected) {
      return { success: false, error: 'Elasticsearch not connected' };
    }

    try {
      await this.client.update({
        index,
        id,
        body: { doc: document }
      });
      return { success: true };
    } catch (error) {
      console.error(`Failed to update document in ${index}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Reindex all data
  async reindexAll() {
    if (!this.isConnected) {
      return { success: false, error: 'Elasticsearch not connected' };
    }

    try {
      const models = {
        courses: mongoose.model('Course'),
        users: mongoose.model('User'),
        lessons: mongoose.model('Lesson'),
        discussions: mongoose.model('Discussion')
      };

      const results = {};

      for (const [indexName, Model] of Object.entries(models)) {
        try {
          // Get all documents
          const documents = await Model.find({}).lean();
          
          // Bulk index
          if (documents.length > 0) {
            const result = await this.bulkIndex(indexName, documents);
            results[indexName] = result;
          }
        } catch (error) {
          results[indexName] = { success: false, error: error.message };
        }
      }

      return { success: true, results };
    } catch (error) {
      console.error('Failed to reindex all data:', error);
      return { success: false, error: error.message };
    }
  }

  // Get search analytics
  async getSearchAnalytics(dateRange = 30) {
    // This would typically be stored in a separate analytics collection
    // For now, return placeholder data
    return {
      success: true,
      data: {
        totalSearches: 0,
        topQueries: [],
        noResultsQueries: [],
        averageResultsPerQuery: 0,
        searchTrends: []
      }
    };
  }
}

module.exports = new SearchService();
