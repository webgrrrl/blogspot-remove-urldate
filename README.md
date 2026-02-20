# BloggerJS - Remove URL Date

A JavaScript utility for Blogger blogs that removes date prefixes from post and page URLs, improving URL structure and user experience.

## Overview

This script redirects Blogger blog URLs to cleaner, date-free versions by:
- Detecting date-prefixed URLs (e.g., `/2024/02/post-title.html`)
- Fetching the actual post/page URL from Blogger's feed
- Redirecting users to the canonical URL without the date prefix

## Modifications

The updated version includes critical security and reliability improvements to prevent runtime errors and potential vulnerabilities. Here are the key modifications:
1. Error handling and guard in `urlMod()` to prevent crashes if substring or indexOf operations return unexpected values; ensures valid indices before accessing substrings.
1. URL validation and security in `urlSearch()` prevents open redirect vulnerabilities.
1. Fetch-first with JSONP fallback for `getJSON()` by using fetch API (promises) instead of relying solely on JSONP script injection; better error handling, fallback mechanism, CORS support, and cross-browser compatibility.
1. Defensive null checking in `bloggerJSON()` prevents "Cannot read property of undefined" errors if API response is malformed or with unexpected structure.

## Features

- **Date Prefix Removal**: Automatically redirects date-formatted URLs to clean URLs
- **Multi-feed Support**: Searches both pages and posts feeds for matching content
- **API v3 Support**: Optional integration with Blogger API v3
- **Fallback Mechanism**: Uses JSONP as fallback if fetch fails
- **Link Validation**: Validates links before redirecting (only HTTP/HTTPS, same hostname)
- **Security-first**: Implements secure JSON fetching with proper error handling

## Installation

1. Copy `remove-urldate.js` into your Blogger template's `<head>` section
2. Configure any necessary parameters (see Configuration section)
3. Save your template

## Configuration

Optional variables you can set before the script runs:

- `accessOnly` (boolean): If `true`, only allows access to complete URLs without redirecting
- `useApiV3` (boolean): If `true`, uses Blogger API v3 instead of default feeds
- `apiKey` (string): Your Blogger API v3 key (required if `useApiV3` is true)
- `blogId` (string): Your blog ID (required if `useApiV3` is true)
- `postsDatePrefix` (boolean): Set to `true` if your posts use date prefixes

## How It Works

1. **URL Detection**: Analyzes current page URL structure
2. **Feed Retrieval**: Fetches posts/pages from Blogger's feed endpoint
3. **URL Matching**: Searches fetched URLs for a match to the current page
4. **Redirection**: Redirects to the matching URL if found

## Credits

- **Original Author**: Kenny Cruz (2017-2018)
- **Modified by**: webgrrrl (2026-02-20)
- **License**: MIT License

## Notes

This tool is designed for Blogger blogs and requires the blog's feed to be publicly accessible for the default feed method to work.
