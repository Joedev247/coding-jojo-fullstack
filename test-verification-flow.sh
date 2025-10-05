#!/bin/bash

# Test Instructor Verification Flow with curl
echo "🧪 === TESTING INSTRUCTOR VERIFICATION FLOW ==="
echo

BASE_URL="http://localhost:5000/api"

# Test credentials
EMAIL="test.instructor@example.com"
PASSWORD="TestPass123!"
PHONE="+237123456789"

echo "1️⃣ Testing server health..."
curl -s "$BASE_URL/health" | grep -q '"success":true' && echo "✅ Server is healthy" || echo "❌ Server health check failed"
echo

echo "2️⃣ Creating/logging in test instructor..."

# Try to register first
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "'$EMAIL'",
    "password": "'$PASSWORD'",
    "firstName": "Test",
    "lastName": "Instructor",
    "phoneNumber": "'$PHONE'",
    "role": "instructor"
  }')

echo "Register response: $REGISTER_RESPONSE"

# Try to login
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "'$EMAIL'",
    "password": "'$PASSWORD'"
  }')

echo "Login response: $LOGIN_RESPONSE"

# Extract token
TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Failed to get authentication token"
  echo "Full login response: $LOGIN_RESPONSE"
  exit 1
fi

echo "✅ Got authentication token: ${TOKEN:0:20}..."
echo

echo "3️⃣ Initializing verification..."
INIT_RESPONSE=$(curl -s -X POST "$BASE_URL/teacher/verification/initialize" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "phoneNumber": "'$PHONE'",
    "countryCode": "+237"
  }')

echo "Initialize response: $INIT_RESPONSE"
echo

echo "4️⃣ Testing ID document upload endpoint availability..."
# Test the endpoint without files first
UPLOAD_TEST=$(curl -s -X POST "$BASE_URL/teacher/verification/id-documents" \
  -H "Authorization: Bearer $TOKEN" \
  -F "documentType=national_id")

echo "Upload test response: $UPLOAD_TEST"

# Check if we get a proper error (not 500)
if echo "$UPLOAD_TEST" | grep -q '"success":false'; then
  echo "✅ Upload endpoint is responding (error expected without files)"
else
  echo "❌ Upload endpoint may have issues"
fi

echo
echo "🎯 SUMMARY:"
echo "- Server: $(curl -s $BASE_URL/health | grep -q success && echo "✅ Running" || echo "❌ Down")"
echo "- Auth: $([ -n "$TOKEN" ] && echo "✅ Working" || echo "❌ Failed")"
echo "- Verification Init: $(echo "$INIT_RESPONSE" | grep -q success && echo "✅ Working" || echo "⚠️ Check response")"
echo "- Upload Endpoint: $(echo "$UPLOAD_TEST" | grep -q '"success":false' && echo "✅ Responding" || echo "❌ Issues")"
echo
echo "=== END TEST ==="
