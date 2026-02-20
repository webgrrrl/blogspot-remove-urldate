# Blogspot Remove URL Date

A JavaScript utility for Blogger blogs that removes date prefixes from post and page URLs, improving URL structure and user experience.

## Overview

This project provides a dual-layer approach to removing date prefixes from Blogger blog URLs:

**Client-side**: A JavaScript utility that transforms URLs in the browser using `history.replaceState()`

**Server-side**: A Cloudflare Worker script (or similar proxy service with worker functionality) that handles URL redirects at the edge

Working together, these components provide:
- Detecting date-prefixed URLs (e.g., `/2026/02/post-title.html`)
- Redirecting to cleaner, date-free versions (e.g., `/post-title`)
- Seamless user experience with proper redirect handling

## Features

- **Date Prefix Removal**: Automatically removes date-formatted URL structure from Blogger posts and pages
- **Client-side Transformation**: Clean, simple JavaScript-based URL rewriting
- **Posts Support**: Transforms `/YYYY/MM/post-name.html` → `/post-name`
- **Pages Support**: Transforms `/p/page-name.html` → `/page-name`
- **Root Path Handling**: Ensures homepage URL remains clean

## How It Works

### Integration
These components work in tandem: the client-side script handles the display layer while the server-side worker ensures proper redirects and feeds are correctly resolved. Proxy services like **Cloudflare Workers**, **Netlify Edge Functions**, or other serverless workers with similar functionality can host the `worker.js` script.

### Client-side (remove-urldate.js)
1. **URL Detection**: Analyzes current page URL using regex patterns for date-prefixed structure
2. **URL Transformation**: Uses `history.replaceState()` to silently update browser URL without page reload
3. **Error Handling**: Wrapped in try-catch to prevent script failures

### Server-side (worker.js with Cloudflare Worker or equivalent)
1. **Incoming Request Handling**: Intercepts requests to clean URLs
2. **404 Detection**: If a clean URL doesn't exist, uses Blogger's feed API to find the actual date-prefixed URL
3. **Redirect**: Returns a 301 permanent redirect to the correct date-prefixed URL on Blogger

## Installation

### STEP 1: Modify your Blogger theme
1. In Blogger, select **Theme** > **Edit HTML**.
1. Copy-paste `remove-urldate.js` into your Blogger template, just above the `</body>` (closing BODY tag) section.
1. Save your Blogger template.

IMPORTANT: You may stop here if you're not using a custom domain. However, redirection will only work one way, which is from `YYYY/MM/post-name.html` to `post-name`. Doing the reverse will result in a Page Not Found error (404). 

### STEP 2: Create a Server-Side Redirect on Your 
Let's assume you're using Cloudflare, and that you're using a custom domain. This works on both free and paid CF tiers. Instructions may vary depending on your proxy service provider.
1. In to your Cloudflare Dashboard, select **Compute** > **Workers & Pages** > **Create application**.
1. Select "Start with Hello World!" and click **Deploy**.
1. On the next screen, click Edit Code.
1. Delete everything in the code editor.
1. Copy-paste the `worker.js` script.
1. Replace `YOUR_CUSTOM_BLOG_URL` to your custom domain URL.
1. Click **Deploy**.

### STEP 3: Link the Worker to your Domain
1. Go back to the Worker's main page in the dashboard.
1. Select the Settings.
1. Under **Domains & Routes**, select **Add** > **Route**.
1. For Zone, select your domain.
1. For Route, type `*.YOUR_CUSTOM_BLOG_URL/*` (replace `YOUR_CUSTOM_BLOG_URL` to your custom domain URL). For example: `*.webgrrrl.net/*`. 
1. For Failure Mode, select **Fail open (proceed)**.
1. Save your routing settings.

-- end

## Notes

This tool is designed for Blogger blogs and requires the blog's feed to be publicly accessible for the default feed method to work.
