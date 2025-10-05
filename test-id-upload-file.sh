#!/bin/bash

# Test ID Document Upload with actual file
echo "🧪 === TESTING ID DOCUMENT UPLOAD WITH FILE ==="
echo

BASE_URL="http://localhost:5000/api"
EMAIL="test.instructor@example.com"
PASSWORD="TestPass123!"

# Login to get token
echo "1️⃣ Getting authentication token..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "'$EMAIL'",
    "password": "'$PASSWORD'"
  }')

TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Failed to get token"
  exit 1
fi

echo "✅ Got token: ${TOKEN:0:20}..."
echo

# Create a simple test image (1x1 pixel PNG)
echo "2️⃣ Creating test image file..."
TEST_IMAGE="test-id-document.png"

# Create minimal PNG file using python
python3 -c "
import struct
import binascii

# PNG signature
png_signature = b'\x89PNG\r\n\x1a\n'

# IHDR chunk for 1x1 pixel
ihdr_data = struct.pack('>2I5B', 1, 1, 8, 2, 0, 0, 0)
ihdr_crc = binascii.crc32(b'IHDR' + ihdr_data) & 0xffffffff
ihdr_chunk = struct.pack('>I', len(ihdr_data)) + b'IHDR' + ihdr_data + struct.pack('>I', ihdr_crc)

# IDAT chunk with minimal data
idat_data = b'\x78\xda\x62\xf8\x00\x00\x00\x01\x00\x01'
idat_crc = binascii.crc32(b'IDAT' + idat_data) & 0xffffffff
idat_chunk = struct.pack('>I', len(idat_data)) + b'IDAT' + idat_data + struct.pack('>I', idat_crc)

# IEND chunk
iend_crc = binascii.crc32(b'IEND') & 0xffffffff
iend_chunk = struct.pack('>I', 0) + b'IEND' + struct.pack('>I', iend_crc)

# Write PNG file
with open('$TEST_IMAGE', 'wb') as f:
    f.write(png_signature + ihdr_chunk + idat_chunk + iend_chunk)

print('✅ Created test PNG file')
"

if [ ! -f "$TEST_IMAGE" ]; then
  echo "❌ Failed to create test image"
  exit 1
fi

echo "✅ Test image created: $TEST_IMAGE"
echo

echo "3️⃣ Uploading ID document..."
UPLOAD_RESPONSE=$(curl -s -X POST "$BASE_URL/teacher/verification/id-documents" \
  -H "Authorization: Bearer $TOKEN" \
  -F "documentType=national_id" \
  -F "frontImage=@$TEST_IMAGE;type=image/png")

echo "Upload response:"
echo "$UPLOAD_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$UPLOAD_RESPONSE"
echo

# Check if upload was successful
if echo "$UPLOAD_RESPONSE" | grep -q '"success":true'; then
  echo "🎉 ✅ ID DOCUMENT UPLOAD SUCCESSFUL!"
elif echo "$UPLOAD_RESPONSE" | grep -q '"success":false'; then
  echo "⚠️ Upload failed with error (check response above)"
  # Check for specific error types
  if echo "$UPLOAD_RESPONSE" | grep -q "500"; then
    echo "🔍 This is a 500 server error - check backend console logs"
  elif echo "$UPLOAD_RESPONSE" | grep -q "400"; then
    echo "🔍 This is a 400 client error - check request format"
  fi
else
  echo "❌ Unexpected response format"
fi

echo
echo "4️⃣ Cleanup..."
rm -f "$TEST_IMAGE"
echo "✅ Test file cleaned up"

echo
echo "=== END TEST ==="
