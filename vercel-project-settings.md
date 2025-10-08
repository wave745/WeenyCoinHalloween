# Vercel Project Settings

## Framework Preset
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

## Build & Output Settings

### Build Configuration
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

### Function Configuration
- **Runtime**: Node.js
- **Memory**: 1024 MB (for image processing)
- **Max Duration**: 30 seconds
- **Region**: US East (iad1)

### Environment Variables
Required in Vercel Dashboard:
- `OPENAI_API_KEY` - Your OpenAI API key
- `NODE_ENV` - Set to `production`

### Routes Configuration
- `/api/*` → Serverless functions
- `/*` → Static files from `dist/public`

### Performance Optimizations
- **Caching**: Static assets cached for 1 year
- **Compression**: Gzip/Brotli enabled
- **CDN**: Global edge network
- **Image Optimization**: Automatic WebP conversion

### Security Settings
- **HTTPS**: Enforced
- **Security Headers**: Automatic
- **CORS**: Configured for API routes
- **Rate Limiting**: Built-in protection

## Deployment Checklist
- [ ] Set OPENAI_API_KEY in Vercel dashboard
- [ ] Verify build command works locally
- [ ] Test API endpoints after deployment
- [ ] Check image processing functionality
- [ ] Verify static file serving
