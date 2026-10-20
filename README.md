# shardrop.com

Shardrop's website, served from S3 behind CloudFront.

| Path | What |
|---|---|
| `/` | Home page |
| `/d/?n=<daily>&s=<score>` | Daily challenge page that shared results link to |
| `/privacy/` | Privacy policy (React app in `privacy/`) |
| `/.well-known/apple-app-site-association` | Lets challenge links open the app (team `Z2H89V93X7`, `com.lokesh.shardrop`); served as JSON |
| `/app-ads.txt` | Authorizes Google AdMob (publisher `pub-2408635475422098`) |

## Deploy

```sh
scripts/deploy.sh   # builds the privacy app, uploads to S3, invalidates CloudFront
```

Needs the AWS CLI signed in to account 222629888198.

## Infrastructure

All tagged `Project=Shardrop`, in us-east-1:

- S3 bucket `shardrop-web-222629888198` (private; CloudFront reads it through origin access control `E3S32D2HYPINRC`, see `infra/bucket-policy.json`)
- CloudFront distribution `E2ZQDFO3Y2GDX7` (`infra/distribution.json`) for `shardrop.com` and `www.shardrop.com`
- CloudFront function `shardrop-web-router` (`infra/router.js`): `www` redirects to the apex, folders serve `index.html`, query strings survive redirects
- ACM certificate for both names (`infra/.certificate-arn`), validated through Route 53
- Route 53 hosted zone `Z0764776MGXNX30WFDYL`; GoDaddy (the registrar) points its nameservers here

To change the router: edit `infra/router.js`, then `aws cloudfront update-function` and `publish-function`.
