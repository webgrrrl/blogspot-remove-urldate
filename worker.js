export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;

        // 1. Ignore the homepage, assets, and existing date-based URLs
        if (path === "/" || path.includes("/20") || path.includes(".")) {
            return fetch(request);
        }

        // 2. Define your logic: Since Blogger requires /YYYY/MM/
        // We try to fetch the content from Blogger. 
        // If the clean path hits a 404, we redirect to the original.

        const response = await fetch(request);

        // 3. If the clean URL 404s, we try to find the match based on your RSS feed.
        if (response.status === 404) {
            const rssUrl = `https://YOUR_CUSTOM_BLOG_URL/feeds/posts/default?alt=json&q=${path.replace(/\//g, "")}`;
            const feedResponse = await fetch(rssUrl);
            const data = await feedResponse.json();

            if (data.feed.entry && data.feed.entry.length > 0) {
                const originalUrl = data.feed.entry[0].link.find(l => l.rel === 'alternate').href;
                return Response.redirect(originalUrl, 301);
            }
        }

        return response;
    },
};