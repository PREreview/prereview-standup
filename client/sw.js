/* eslint-env serviceworker */

var VERSION = require('./package.json').version
var URLS = process.env.FILE_LIST

const fetch = require('fetch-base64')

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  e.respondWith(self.caches.match(e.request).then(function (request) {
    if (request) return request

    const normalizedUrl = new URL(event.request.url)
    const urlParts = normalizedUrl.split('/remotepdf/')
    var remoteUrl

    if (urlParts.length === 2) {
      remoteUrl = urlParts[1]
    } else {
      return self.fetch(e.request)
    }
    
    return fetch.remote(decodeURI(remoteUrl)).catch(e => {
      console.error('error in service worker fetching remote resource as base64')
      throw e
    })
  }))
})

// Register worker
self.addEventListener('install', function (e) {
  e.waitUntil(self.caches.open(VERSION).then(function (cache) {
    return cache.addAll(URLS)
  }))
})

// Remove outdated resources
self.addEventListener('activate', function (e) {
  e.waitUntil(self.caches.keys().then(function (keyList) {
    return Promise.all(keyList.map(function (key, i) {
      if (keyList[i] !== VERSION) return self.caches.delete(keyList[i])
    }))
  }))
})
