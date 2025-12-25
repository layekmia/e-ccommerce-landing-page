# Sanity Seed Scripts

## Seed Product Data

This script imports your existing product data into Sanity CMS.

### Prerequisites

1. **Install dependencies** (if not already installed):
   ```bash
   npm install @sanity/client
   ```

2. **Get your Sanity API Token**:
   - Go to https://www.sanity.io/manage
   - Select your project
   - Go to API → Tokens
   - Create a new token with **Editor** permissions
   - Copy the token

3. **Set environment variables**:
   
   Copy the example file and fill in your values:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Then edit `.env.local` and add your actual values:
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_write_token_here
   ```
   
   **Note:** The `.env.local` file is gitignored and won't be committed to your repository.

### Usage

Run the seed script:
```bash
npm run seed:product
```

Or directly with Node:
```bash
node scripts/seed-product.js
```

### What it does

1. ✅ Connects to your Sanity project using environment variables
2. ✅ Transforms TypeScript product data to Sanity document format
3. ✅ Handles all nested objects and arrays
4. ✅ Creates or updates the product document (with fixed ID: `product`)
5. ✅ Preserves all image URLs (keeps Unsplash URLs as-is)

### Notes

- The script uses a fixed document ID (`product`) so running it multiple times will update the existing document
- Image URLs are kept as-is (Unsplash URLs). If you want to upload images to Sanity, uncomment the image upload code in the script
- All data types are properly transformed to match your Sanity schema

### Troubleshooting

**Error: Missing environment variable**
- Make sure `.env.local` exists and has all required variables
- Or export them in your terminal before running the script

**Error: Unauthorized**
- Check that your `SANITY_API_TOKEN` has Editor permissions
- Verify your project ID and dataset are correct

**Error: Document not found**
- This is normal on first run - the script will create the document
- On subsequent runs, it will update the existing document

