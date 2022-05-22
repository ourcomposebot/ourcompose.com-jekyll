const version = '20220501012920';
const cacheName = `static::${version}`;

const buildContentBlob = () => {
  return ["/jekyll/episodes/2022/episode-45-shelving-ourcompose/","/jekyll/episodes/2022/episode-44-more-interface/","/jekyll/episodes/2022/episode-43-not-enough-information-yet/","/jekyll/episodes/2022/episode-42-fireflying-into-a-new-service/","/jekyll/episodes/2022/episode-41-rounding-out-rundeck/","/jekyll/episodes/2022/episode-40-crud-an-api/","/jekyll/episodes/2021/episode-39-whose-job-is-it-anyway/","/jekyll/episodes/2021/episode-38-every-dev-has-their-day/","/jekyll/episodes/2021/episode-37-dolibarr-for-this-dolibarr-for-that/","/jekyll/episodes/2021/episode-36-what-a-suitecrm/","/jekyll/contact/","/jekyll/donate/","/jekyll/feed.xml","/jekyll/episodes/","/jekyll/","/jekyll/manifest.json","/jekyll/offline/","/jekyll/search.json","/jekyll/search/","/jekyll/services/","/jekyll/assets/styles.css","/jekyll/thanks/","/jekyll/redirects.json","/jekyll/sitemap.xml","/jekyll/robots.txt","/jekyll/assets/logos/LogoWithNameTransparent.png", "/jekyll/assets/default-offline-image.png", "/jekyll/assets/scripts/fetch.js"
  ]
}

const updateStaticCache = () => {
  return caches.open(cacheName).then(cache => {
    return cache.addAll(buildContentBlob());
  });
};

const clearOldCache = () => {
  return caches.keys().then(keys => {
    // Remove caches whose name is no longer valid.
    return Promise.all(
      keys
        .filter(key => {
          return key !== cacheName;
        })
        .map(key => {
          console.log(`Service Worker: removing cache ${key}`);
          return caches.delete(key);
        })
    );
  });
};

self.addEventListener("install", event => {
  event.waitUntil(
    updateStaticCache().then(() => {
      console.log(`Service Worker: cache updated to version: ${cacheName}`);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(clearOldCache());
});

self.addEventListener("fetch", event => {
  let request = event.request;
  let url = new URL(request.url);

  // Only deal with requests from the same domain.
  if (url.origin !== location.origin) {
    return;
  }

  // Always fetch non-GET requests from the network.
  if (request.method !== "GET") {
    event.respondWith(fetch(request));
    return;
  }

  // Default url returned if page isn't cached
  let offlineAsset = "/offline/";

  if (request.url.match(/\.(jpe?g|png|gif|svg)$/)) {
    // If url requested is an image and isn't cached, return default offline image
    offlineAsset = "/assets/default-offline-image.png";
  }

  // For all urls request image from network, then fallback to cache, then fallback to offline page
  event.respondWith(
    fetch(request).catch(async () => {
      return (await caches.match(request)) || caches.match(offlineAsset);
    })
  );
  return;
});
