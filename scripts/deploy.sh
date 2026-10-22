#!/bin/sh
# Builds shardrop.com and publishes it to S3 behind CloudFront.
#   site/     static pages: home, /d/ challenge page, app links file, app-ads.txt
#   privacy/  the React privacy policy and terms of use, built into /privacy/ and /terms/
# Hashed assets are cached for a year; everything else for five minutes, so a deploy shows quickly.
set -e
cd "$(dirname "$0")/.."
BUCKET=shardrop-web-222629888198
DISTRIBUTION=$(cat infra/.distribution-id)

rm -rf build
cp -R site build
(cd privacy && npm ci --silent && npx vite build --outDir ../build/privacy --emptyOutDir)
# The terms page is the app's second entry; its assets stay under /privacy/assets.
mv build/privacy/terms build/terms

aws s3 sync build/privacy/assets "s3://$BUCKET/privacy/assets" --delete \
  --cache-control "public, max-age=31536000, immutable"
aws s3 sync build "s3://$BUCKET" --delete --exclude "privacy/assets/*" --exclude ".well-known/*" \
  --cache-control "public, max-age=300"
# iOS reads this to open challenge links in the app; Apple wants it served as JSON.
aws s3 cp build/.well-known/apple-app-site-association "s3://$BUCKET/.well-known/apple-app-site-association" \
  --content-type "application/json" --cache-control "public, max-age=3600"
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION" --paths "/*" \
  --query 'Invalidation.Id' --output text
echo "Deployed to s3://$BUCKET (CloudFront $DISTRIBUTION)"
