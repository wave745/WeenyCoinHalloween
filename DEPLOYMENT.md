# WeenyCoin Halloween - Deployment Guide

## Vercel Deployment

This project is configured for deployment on Vercel with the following setup:

### Required Environment Variables

Set these in your Vercel dashboard under Project Settings > Environment Variables:

- `OPENAI_API_KEY` - Your OpenAI API key for image processing
- `NODE_ENV` - Set to `production` for Vercel deployment

### Build Configuration

The project uses:
- **Frontend**: Vite build system for React client
- **Backend**: Express.js server with TypeScript
- **Image Processing**: Sharp library for image manipulation
- **AI Integration**: OpenAI API for haunted image generation

### File Structure

```
├── client/          # React frontend
├── server/          # Express.js backend
├── vercel.json      # Vercel configuration
├── .vercelignore    # Files to exclude from deployment
└── package.json     # Dependencies and scripts
```

### Deployment Steps

1. Connect your GitHub repository to Vercel
2. Set the environment variables in Vercel dashboard
3. Deploy automatically on git push

### API Endpoints

- `POST /api/hauntify` - Process images with haunted effects
- All other routes serve the React frontend

### Notes

- The `/tmp` directory is used for temporary file processing
- Image uploads are processed in memory and cleaned up automatically
- Maximum function timeout is set to 30 seconds for image processing
