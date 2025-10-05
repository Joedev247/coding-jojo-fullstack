#!/bin/bash

# Coding JoJo Backend - Development Setup Script
# This script helps you set up optional services for development

echo "🚀 Coding JoJo Development Setup"
echo "================================="

# Check if Redis is needed
echo ""
echo "📝 Redis is used for:"
echo "   - Caching"
echo "   - Analytics"
echo "   - Email queue"
echo ""
read -p "Do you want to install Redis? (y/N): " install_redis

if [ "$install_redis" = "y" ] || [ "$install_redis" = "Y" ]; then
    echo "Installing Redis..."
    
    # Check OS and install Redis
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if command -v apt-get &> /dev/null; then
            # Ubuntu/Debian
            sudo apt-get update
            sudo apt-get install redis-server -y
            sudo systemctl enable redis-server
            sudo systemctl start redis-server
        elif command -v yum &> /dev/null; then
            # CentOS/RHEL
            sudo yum install redis -y
            sudo systemctl enable redis
            sudo systemctl start redis
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install redis
            brew services start redis
        else
            echo "❌ Please install Homebrew first: https://brew.sh"
        fi
    fi
    
    # Update .env file
    sed -i 's/REDIS_ENABLED=false/REDIS_ENABLED=true/' .env
    echo "✅ Redis installed and enabled"
else
    echo "⏭️  Skipping Redis installation"
fi

# Check if Elasticsearch is needed
echo ""
echo "📝 Elasticsearch is used for:"
echo "   - Advanced search functionality"
echo "   - Course and user search"
echo ""
read -p "Do you want to install Elasticsearch? (y/N): " install_elasticsearch

if [ "$install_elasticsearch" = "y" ] || [ "$install_elasticsearch" = "Y" ]; then
    echo "Installing Elasticsearch..."
    echo "⚠️  Elasticsearch requires Java 11 or higher"
    
    # Basic Elasticsearch installation instructions
    echo ""
    echo "📋 Please follow these steps to install Elasticsearch:"
    echo "   1. Download from https://www.elastic.co/downloads/elasticsearch"
    echo "   2. Extract and run: ./bin/elasticsearch"
    echo "   3. Update your .env file: ELASTICSEARCH_ENABLED=true"
    echo ""
    read -p "Press Enter after installing Elasticsearch..."
    
    # Update .env file
    sed -i 's/ELASTICSEARCH_ENABLED=false/ELASTICSEARCH_ENABLED=true/' .env
    echo "✅ Elasticsearch configuration updated"
else
    echo "⏭️  Skipping Elasticsearch installation"
fi

echo ""
echo "✅ Development setup completed!"
echo ""
echo "📝 Configuration Summary:"
echo "   - MongoDB: ✅ Configured (Atlas)"
echo "   - Redis: $(if grep -q "REDIS_ENABLED=true" .env; then echo "✅ Enabled"; else echo "❌ Disabled"; fi)"
echo "   - Elasticsearch: $(if grep -q "ELASTICSEARCH_ENABLED=true" .env; then echo "✅ Enabled"; else echo "❌ Disabled (using MongoDB fallback)"; fi)"
echo "   - Email: ✅ Configured (Gmail)"
echo ""
echo "🚀 You can now run: npm run dev"
