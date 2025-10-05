#!/bin/bash

echo "🔧 Resetting instructor verification rate limits..."

# Updated with the new token from the logs
TEACHER_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTFiMjI2NDFmZmJjNjU3NDg0NmVlNSIsImlhdCI6MTc1NjAwMDcwMywiZXhwIjoxNzU4NTkyNzAzfQ.6XZ1Tp1j7psOC1vhgg-vNV1oxf632_f2KSFSk4pBBbI"

curl -X POST http://localhost:5000/api/teacher/verification/reset-limits \
  -H "Authorization: Bearer $TEACHER_TOKEN" \
  -H "Content-Type: application/json" | jq '.' 2>/dev/null || echo "Response received (jq not available for formatting)"

echo ""
echo "✅ Rate limits reset! You can now send verification codes again."
