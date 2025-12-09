#!/bin/bash

# Clean up previous build
rm -rf netlify/functions

# Create directory
mkdir -p netlify/functions/_lib

# Copy supporting files to _lib (Netlify ignores directories starting with _)
rsync -av --exclude='*.d.ts' --exclude='*.map' --exclude='tsconfig.tsbuildinfo' --exclude='lambda.js' dist/ netlify/functions/_lib/

# Copy lambda.js to functions root and rewrite imports to point to _lib
cp dist/lambda.js netlify/functions/
sed -i "s|require(\"\./|require(\"./_lib/|g" netlify/functions/lambda.js
sed -i "s|from '\./|from './_lib/|g" netlify/functions/lambda.js

echo "Netlify functions build complete"
echo "✓ lambda.js -> Netlify function (imports rewritten)"
echo "✓ Supporting modules -> _lib/ (ignored by Netlify)"
