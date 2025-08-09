'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "bd110f33f372be0fb2e14e4d4beb2e85",
"assets/AssetManifest.bin.json": "35c04dab1725ab04d3ab5b614bca8768",
"assets/AssetManifest.json": "dc0fdf9d358625c2443de3631f62f402",
"assets/FontManifest.json": "42d6357c3805ee52b0ee468833c84595",
"assets/fonts/MaterialIcons-Regular.otf": "de6100f10039008b161f889ccfc9b7ef",
"assets/images/abandon.jpg": "11fa589e2ba8344300b9afd8b2066653",
"assets/images/abandon.mp3": "9c33a04c04163144baf18dc96be1eec9",
"assets/images/ability.jpg": "f1fd8c1afb2123dda05765f4a23c99a5",
"assets/images/ability.mp3": "5c1a09f2201dcf67882f0a254b0e3932",
"assets/images/able.jpg": "a8a8c533ea1ffed1370726141b823339",
"assets/images/able.mp3": "280f77cf7e1c759ac70d2610f2aaa2e7",
"assets/images/aboard.jpg": "80246750094a96c7efe19f8a35e06d13",
"assets/images/aboard.mp3": "f54c9919329a6ebacded89fd2f42a8b6",
"assets/images/abounding.jpg": "01be9b6178fc5875a7f6547edbc8a6d2",
"assets/images/abounding.mp3": "6dd8c7d692b1a79a99b7c40af01c10a9",
"assets/images/about.jpg": "4f0176d59ff64069abb97e6a0a85f090",
"assets/images/about.mp3": "c777ed9fe653cae1b93a2df084fe14bd",
"assets/images/above.jpg": "5a3b0540dcab2f92f4cf01db478944b9",
"assets/images/above.mp3": "a41f37d67bc3d9a37e59af3edbd328d9",
"assets/images/abroad.jpg": "6323441e3e1fd5431ec290376ee30242",
"assets/images/abroad.mp3": "74a1e1f1ebd65fee9c5d49ba01f4d5a6",
"assets/images/absent.jpg": "0e3eba46f861c2bb92ed13f46d95e119",
"assets/images/absent.mp3": "90b37c11b343f7fb46af646b9b029407",
"assets/images/absorb.jpg": "15a5909ef0f600d486cc72864e4a6922",
"assets/images/absorb.mp3": "ea822877c0efa62884d71cdd816edf0d",
"assets/images/Courgette-Regular.ttf": "cbd252f5c26cd61243888be1891f9921",
"assets/images/nextpage.png": "14ce69fb3193187d058f6c049691fac2",
"assets/images/person%2520holding%2520a%2520book.png": "f6e04680bbd0a107baf82121bb106b8d",
"assets/images/person%2520holding%2520an%2520orange%2520book.png": "fe60d378ea549be3202c400b9eee87f8",
"assets/images/personalresult.jpg": "e8d6fcb46b987888bc3539e5171c1d61",
"assets/images/personalresult.png": "da3afe10cde5924c8e155394458b5998",
"assets/NOTICES": "d3d149a18bd77bbb5881b445c9c6e4f4",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "642d81b6f9c2ef7530dc51255ada1170",
"assets/packages/material/lib/fonts/material.ttf": "73fa4408f8f7e62643f494229f4998c7",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"flutter_bootstrap.js": "ffd8e565e73fdd255a441abc1b3aae70",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "231d0881ec9d96d2ab682cd18dfff97a",
"/": "231d0881ec9d96d2ab682cd18dfff97a",
"main.dart.js": "0d4b63ee065441cdd2bb9aa3bfa78202",
"manifest.json": "65f3388f9b6b3a4c829083c8d4adb919",
"version.json": "239f128f7445100b337f9b2098740f64"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
