const memoryCache = {};

export namespace CacheUtilService {

    export function setCache(cacheName: string, value: any) {
        try {
            memoryCache[cacheName] = value;
        } catch (e) {
            throw e;
        }

    }

    export function setCacheByKey(cacheName: string, key: string, value: any) {
        try {
            let cache = {};
            if (cacheName in memoryCache) {
                cache = memoryCache[cacheName];
            }
            cache[key] = value;
            memoryCache[cacheName] = cache;
        } catch (e) {
            throw e;
        }

    }

    export function getCacheByKey(cacheName: string, key: string) {
        const cache = memoryCache[cacheName];
        return cache && cache[key] ? cache[key] : undefined;
    }

    export function getCache(cacheName: string) {
        return memoryCache[cacheName];
    }

}