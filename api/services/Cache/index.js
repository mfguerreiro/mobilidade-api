import { setCache, getCache, delCache, clearCache } from '../Log/RedisService';
import NodeCache from 'node-cache';
import moment from 'moment';

const defaultRedisPeriod = 1800; //seconds
const defaultRedisPeriodRefresh = 900; //seconds
const defaultCachePeriod = 900; //seconds
const service = 'mu1';

const localCache = new NodeCache({
  stdTTL: defaultCachePeriod,
  checkperiod: 300,
});

/**
 * Cache Service
 */
class CacheService {
  /**
   * Save in Cache
   * @param {string} key Cache unique key
   * @param {object} value Object data to save
   * @param {object} options Function Options
   * @returns
   */
  static async set(key, value, options = {}) {
    try {
      const defaultOptions = {
        useRedis: true,
        useMem: true,
        redisPeriod: defaultRedisPeriod,
        redisPeriodRefresh: defaultRedisPeriodRefresh,
        cachePeriod: defaultCachePeriod,
      };

      const useRedis = this.valDefault(
        options.useRedis,
        defaultOptions.useRedis
      );
      const useMem = this.valDefault(options.useMem, defaultOptions.useMem);
      const redisPeriod = parseInt(
        this.valDefault(options.redisPeriod, defaultOptions.redisPeriod)
      );
      const redisPeriodRefresh = parseInt(
        this.valDefault(
          options.redisPeriodRefresh,
          defaultOptions.redisPeriodRefresh
        )
      );
      const cachePeriod = parseInt(
        this.valDefault(options.cachePeriod, defaultOptions.cachePeriod)
      );

      if (typeof key !== 'string' || key == '') {
        console.error('Cache - Key define name error');
        return null;
      }
      if (typeof value !== 'object' || key == null) {
        console.error('Cache - Value define Obj error');
        return null;
      }

      if (isNaN(redisPeriod) || isNaN(cachePeriod)) {
        console.error('Cache - Time Error');
        return null;
      }
      const keySrv = service + key;

      let localset = false;
      if (useMem) {
        localset = localCache.set(keySrv, value, cachePeriod);
      }
      let redisset = false;
      if (useRedis) {
        const redis = await setCache(keySrv, {
          data: value,
          expire: moment().add(redisPeriod, 'seconds').format(),
          refresh: moment().add(redisPeriodRefresh, 'seconds').format(),
        });
        if (redis === 'OK') {
          redisset = true;
        }
      }

      return (
        ((!useRedis || (useRedis && redisset)) &&
          (!useMem || (useMem && localset))) ||
        false
      );
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  /**
   * Get Cache
   * @param {string} key Cache unique key
   * @param {object} options Function Options
   * @param {function} refreshFunction Callback if expire
   * @returns
   */
  static async get(key, options = {}, refreshFunction) {
    try {
      const defaultOptions = {
        useRedis: true,
        useMem: true,
        cachePeriod: defaultCachePeriod,
      };

      const useRedis = this.valDefault(
        options.useRedis,
        defaultOptions.useRedis
      );
      const useMem = this.valDefault(options.useMem, defaultOptions.useMem);
      const cachePeriod = parseInt(
        this.valDefault(options.cachePeriod, defaultOptions.cachePeriod)
      );

      if (typeof key !== 'string' || key == '') {
        console.error('Cache - Key define name error');
        return null;
      }
      const keySrv = service + key;

      let localset = false;
      if (useMem) {
        const getMem = localCache.get(keySrv);
        if (typeof getMem == 'object' && getMem != null) {
          localset = true;
          return getMem;
        }
      }
      let redisset = false;
      if (!localset && useRedis) {
        const redis = await getCache(keySrv);
        if (
          typeof redis == 'object' &&
          redis != null &&
          typeof redis.data == 'object' &&
          typeof redis.expire == 'string'
        ) {
          let expire = false;
          let refresh = false;
          const nowTime = moment();
          const expireTime = moment(redis.expire);

          if (!expireTime.isAfter(nowTime)) {
            expire = true;
            refresh = true;
            this.del(keySrv.replace(service, ''), { useRedis, useMem });
          }

          if (typeof redis.refresh == 'string') {
            const refreshTime = moment(redis.refresh);
            if (!refreshTime.isAfter(nowTime)) {
              refresh = true;
            }
          }

          if (refresh && typeof refreshFunction == 'function') {
            refreshFunction();
          }

          if (expire === false) {
            if (useMem) {
              localCache.set(keySrv, redis.data, cachePeriod);
            }

            redisset = true;
            return redis.data;
          }
        }
      }

      return null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  /**
   * Dele Cache Key
   * @param {string} key Cache unique key
   * @param {object} options Function Options
   * @param {function} refreshFunction Callback on deleted
   * @returns
   */
  static async del(key, options = {}, refreshFunction) {
    try {
      const defaultOptions = {
        useRedis: true,
        useMem: true,
      };

      const useRedis = this.valDefault(
        options.useRedis,
        defaultOptions.useRedis
      );
      const useMem = this.valDefault(options.useMem, defaultOptions.useMem);

      if (typeof key !== 'string' || key == '') {
        console.error('Cache - Key define name error');
        return null;
      }
      const keySrv = service + key;

      let localset = false;
      if (useMem) {
        const getMem = localCache.del(keySrv);
        if (getMem >= 1) {
          localset = true;
        }
      }
      let redisset = false;
      if (useRedis) {
        const redis = await delCache(keySrv);
        if (redis >= 1) {
          redisset = true;
        }
      }

      if (typeof refreshFunction == 'function') {
        refreshFunction();
      }

      return (
        ((!useRedis || (useRedis && redisset)) &&
          (!useMem || (useMem && localset))) ||
        false
      );
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  /**
   * Clear All Cache
   * @param {object} options
   * @returns
   */
  static async clearAll(options = {}) {
    try {
      const defaultOptions = {
        useRedis: true,
        useMem: true,
      };

      const useRedis = this.valDefault(
        options.useRedis,
        defaultOptions.useRedis
      );
      const useMem = this.valDefault(options.useMem, defaultOptions.useMem);

      let localset = false;
      if (useMem) {
        localCache.flushAll();
        localset = true;
      }
      let redisset = false;
      if (useRedis) {
        const redis = await clearCache();
        if (redis === 'OK') {
          redisset = true;
        }
      }

      return (
        ((!useRedis || (useRedis && redisset)) &&
          (!useMem || (useMem && localset))) ||
        false
      );
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static valDefault(act, save) {
    if (act === 'undefined' || typeof act == 'undefined') {
      return save;
    }
    return act;
  }
}

//debugCache
localCache.on('set', function (key, value) {
  console.log('NodeCache set', key);
});
localCache.on('del', function (key, value) {
  console.log('NodeCache delete', key);
});
localCache.on('expired', function (key, value) {
  console.log('NodeCache expired', key);
});
localCache.on('flush', function () {
  console.log('NodeCache flush');
});
//debugcache

export default CacheService;
