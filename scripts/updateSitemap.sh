#!/bin/bash

# Paths to sitemap and blogs JSON
SITEMAP_XML="$1"
BLOGS_JSON="$2"
BASE_URL="https://danieljancar.dev/blog/"

# Temporary file for sitemap
TEMP_SITEMAP_XML="${SITEMAP_XML}.tmp"

# Copy original sitemap to temp file
cp "$SITEMAP_XML" "$TEMP_SITEMAP_XML"

# Process each blog entry
while IFS= read -r line; do
    # Extract blog slug and edited date
    if [[ $line =~ \"slug\":\ \"([^\"]+)\", ]]; then
        slug=${BASH_REMATCH[1]}
    fi
    if [[ $line =~ \"edited\":\ \"([^\"]+)T ]]; then
        edited=${BASH_REMATCH[1]}
        # Construct sitemap entry
        entry="<url>\n\t\t<loc>${BASE_URL}${slug}</loc>\n\t\t<lastmod>${edited}</lastmod>\n\t</url>"
        # Use awk for insertion to handle newlines and indentation
        awk -v entry="$entry" '/<\/urlset>/ { print entry }1' "$TEMP_SITEMAP_XML" > "${TEMP_SITEMAP_XML}.new"
        mv "${TEMP_SITEMAP_XML}.new" "$TEMP_SITEMAP_XML"
    fi
done < "$BLOGS_JSON"

# Replace the original sitemap with the updated temp file
mv "$TEMP_SITEMAP_XML" "$SITEMAP_XML"

echo "Sitemap updated successfully."
