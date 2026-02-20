<script type='text/javascript'>
//<![CDATA[
/**
 * https://github.com/webgrrrl/blogspot-remove-urldate
 * Copyright (c) 2025 by WebGrrrl, licensed under MIT
 * This script removes the date structure from Blogger post URLs, making them cleaner and more user-friendly.
 */
(function() {
    'use strict';

    function getPath() {
        return window.location.pathname;
    }

    function urlMod() {
        var path = getPath();
        // console.log("Processing path ->", path);
        
        try {
            // Logic for Posts: /YYYY/MM/post-name.html -> /post-name
            if (path.length > 11 && !path.startsWith("/p/")) {
                // Regex matches /4-digits/2-digits/ and removes .html
                var cleanPath = path.replace(/^\/\d{4}\/\d{2}\//, "/").replace(".html", "");
                
                if (cleanPath !== path) {
                    history.replaceState(null, null, cleanPath);
                    // console.log("URL updated to ->", cleanPath);
                }
            } 
            // Logic for Pages: /p/page-name.html -> /page-name
            else if (path.startsWith("/p/")) {
                var cleanPage = path.replace("/p/", "/").replace(".html", "");
                if (cleanPage !== path) {
                    history.replaceState(null, null, cleanPage);
                    // console.log("Page URL updated to ->", cleanPage);
                }
            }
        } catch (err) {
            console.error("Error during replacement:", err);
        }
    }

    // Main Execution Logic
    var currentPath = getPath();
    
    // Only run if we are on a post or page (.html)
    if (currentPath.includes(".html")) {
        urlMod();
    } else if (currentPath === "/") {
        // Keeps the root clean
        history.replaceState(null, null, "/");
    }
})();
//]]>
</script>