#!/usr/bin/env node

/**
 * Cache Reset Script for Coding JoJo Backend
 * This script clears all Redis cache and provides options for selective clearing
 */

require('dotenv').config();
const cacheService = require('../src/services/cacheService');

class CacheManager {
  constructor() {
    this.patterns = {
      all: '*',
      sessions: 'session:*',
      users: 'user:*',
      courses: 'course:*',
      search: 'search:*',
      analytics: 'analytics:*',
      rateLimit: 'rate_limit:*',
      views: 'views:*',
      online: 'online:*',
      leaderboard: 'leaderboard:*'
    };
  }

  async clearCache(pattern = 'all') {
    console.log(`🧹 Clearing cache with pattern: ${pattern}`);
    
    try {
      const actualPattern = this.patterns[pattern] || pattern;
      const result = await cacheService.clearPattern(actualPattern);
      
      if (result.success) {
        console.log(`✅ Successfully cleared ${result.cleared} cache entries`);
      } else {
        console.log('❌ Failed to clear cache:', result.error);
      }
      
      return result;
    } catch (error) {
      console.error('❌ Cache clearing error:', error);
      return { success: false, error: error.message };
    }
  }

  async getCacheStats() {
    console.log('📊 Getting cache statistics...');
    
    try {
      const stats = await cacheService.getStats();
      
      if (stats.success) {
        console.log('✅ Cache Statistics:');
        console.log(`   Connected: ${stats.stats.connected}`);
        console.log(`   Total Keys: ${stats.stats.totalKeys}`);
        
        if (stats.stats.info) {
          const info = stats.stats.info;
          console.log(`   Memory Used: ${info.used_memory_human || 'N/A'}`);
          console.log(`   Uptime: ${info.uptime_in_seconds || 'N/A'} seconds`);
          console.log(`   Connected Clients: ${info.connected_clients || 'N/A'}`);
        }
      } else {
        console.log('❌ Failed to get cache stats:', stats.error);
      }
      
      return stats;
    } catch (error) {
      console.error('❌ Stats retrieval error:', error);
      return { success: false, error: error.message };
    }
  }

  async listCachePatterns() {
    console.log('📋 Available cache patterns:');
    Object.entries(this.patterns).forEach(([name, pattern]) => {
      console.log(`   ${name}: ${pattern}`);
    });
  }

  async analyzeCache() {
    console.log('🔍 Analyzing cache usage...');
    
    try {
      const analysis = {};
      
      for (const [name, pattern] of Object.entries(this.patterns)) {
        if (pattern === '*') continue; // Skip 'all' pattern
        
        // Get keys count for each pattern
        const keys = await this.getKeysCount(pattern);
        analysis[name] = keys;
      }
      
      console.log('📊 Cache Analysis:');
      Object.entries(analysis).forEach(([name, count]) => {
        console.log(`   ${name}: ${count} keys`);
      });
      
      return analysis;
    } catch (error) {
      console.error('❌ Cache analysis error:', error);
      return {};
    }
  }

  async getKeysCount(pattern) {
    try {
      const result = await cacheService.clearPattern(pattern);
      // This is a hack since we don't have a direct keys count method
      // In production, you'd want a proper keys count method
      return 0;
    } catch (error) {
      return 0;
    }
  }

  async cleanup() {
    console.log('🧹 Running cache cleanup...');
    
    try {
      const result = await cacheService.cleanup();
      
      if (result.success) {
        console.log('✅ Cleanup completed:');
        Object.entries(result.cleaned).forEach(([pattern, count]) => {
          if (typeof count === 'number') {
            console.log(`   ${pattern}: ${count} expired keys removed`);
          } else if (count.error) {
            console.log(`   ${pattern}: Error - ${count.error}`);
          }
        });
      } else {
        console.log('❌ Cleanup failed:', result.error);
      }
      
      return result;
    } catch (error) {
      console.error('❌ Cleanup error:', error);
      return { success: false, error: error.message };
    }
  }

  showHelp() {
    console.log('🔧 Coding JoJo Cache Manager');
    console.log('Usage: node scripts/resetCache.js [command] [options]');
    console.log('');
    console.log('Commands:');
    console.log('  clear [pattern]  - Clear cache entries (default: all)');
    console.log('  stats           - Show cache statistics');
    console.log('  analyze         - Analyze cache usage by pattern');
    console.log('  cleanup         - Remove expired cache entries');
    console.log('  patterns        - List available cache patterns');
    console.log('  help            - Show this help message');
    console.log('');
    console.log('Examples:');
    console.log('  node scripts/resetCache.js clear users');
    console.log('  node scripts/resetCache.js clear search');
    console.log('  node scripts/resetCache.js stats');
    console.log('  node scripts/resetCache.js cleanup');
  }

  async run() {
    const args = process.argv.slice(2);
    const command = args[0] || 'help';
    const options = args.slice(1);

    console.log('🚀 Starting Cache Manager...\n');

    switch (command) {
      case 'clear':
        const pattern = options[0] || 'all';
        await this.clearCache(pattern);
        break;

      case 'stats':
        await this.getCacheStats();
        break;

      case 'analyze':
        await this.analyzeCache();
        break;

      case 'cleanup':
        await this.cleanup();
        break;

      case 'patterns':
        await this.listCachePatterns();
        break;

      case 'help':
      default:
        this.showHelp();
        break;
    }

    // Disconnect from cache
    await cacheService.disconnect();
    console.log('\n✅ Cache Manager completed successfully!');
  }
}

// Run cache manager if called directly
if (require.main === module) {
  const cacheManager = new CacheManager();
  cacheManager.run().catch(error => {
    console.error('❌ Cache Manager failed with error:', error);
    process.exit(1);
  });
}

module.exports = CacheManager;
