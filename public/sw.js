const CACHE_PREFIX = `cinemaddict-cache`;
const CACHE_VER = `v1`;
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;

const getFilteredKeysPromises = (keys) => {
  return keys.map((key) => {
    if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
      return caches.delete(key);
    }

    return null;
  })
    .filter((key) => key !== null);
};

self.addEventListener(`install`, (event) => {
  const openCache = caches.open(CACHE_NAME)
    .then((cache) => {
      // Add static resources to cache
      return cache.addAll([
        `/`,
        `/index.html`,
        `/bundle.js`,
        `/css/main.css`,
        `/css/normalize.css`,
        `/images/background.png`,
        `/images/bitmap@2x.png`,
        `/images/emoji/angry.png`,
        `/images/emoji/puke.png`,
        `/images/emoji/sleeping.png`,
        `/images/emoji/smile.png`,
        `/images/icons/icon-favorite-active.svg`,
        `/images/icons/icon-favorite.svg`,
        `/images/icons/icon-watched-active.svg`,
        `/images/icons/icon-watched.svg`,
        `/images/icons/icon-watchlist-active.svg`,
        `/images/icons/icon-watchlist.svg`,
      ]);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });

  event.waitUntil(openCache);
});

self.addEventListener(`activate`, (event) => {
  const cashedKeys = caches.keys()
    .then((keys) => {
      // Delete caches of older versions
      return Promise.all(getFilteredKeysPromises(keys));
    });

  event.waitUntil(cashedKeys);
});

self.addEventListener(`fetch`, (event) => {
  const {request} = event;

  const resource = caches.match(request)
    .then((cacheResponse) => {
      if (cacheResponse) {
        return cacheResponse;
      }
      // If request was not cashed yet,
      // make fetch & save response to cache
      return fetch(request);
    })
    .then((response) => {
      if (!response || !response.ok || response.type !== `basic`) {
        return response;
      }

      // Clone response to save working method returning content
      const clonedResponse = response.clone();

      caches.open(CACHE_NAME)
        .then((cache) => cache.put(request, clonedResponse));

      return response;
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });

  event.respondWith(resource);
});
