#!/bin/bash

# Easy Image Add Script
# Usage: ./add-image.sh path/to/your/image.png

if [ -z "$1" ]; then
    echo "Usage: ./add-image.sh path/to/your/image.png"
    echo "Example: ./add-image.sh ~/Downloads/screenshot.png"
    exit 1
fi

SOURCE_IMAGE="$1"
FILENAME=$(basename "$SOURCE_IMAGE")
DEST_DIR="./public/static/images"

# Create directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Copy image
cp "$SOURCE_IMAGE" "$DEST_DIR/$FILENAME"

# Generate markdown
echo ""
echo "✅ Image added successfully!"
echo ""
echo "📋 Copy this to your blog post:"
echo ""
echo "![Image description](/static/images/$FILENAME)"
echo ""
echo "🎨 Or with styling:"
echo ""
echo "<img src=\"/static/images/$FILENAME\" alt=\"description\" className=\"rounded-lg shadow-lg\" />"
echo ""
