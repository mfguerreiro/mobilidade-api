import { delAsync, getAsync, setAsync, flushCache } from '../../config/redis';

/* 
    Key examples:
    Providers: 'version_providers_cityId' -> Data: { providers: [], createdAt: timestamp }
*/

export async function setCache(key, data) {
  try {
    // resultData = 'OK'
    const resultData = await setAsync(`${key}`, JSON.stringify(data));
    return resultData;
  } catch (err) {
    console.log('Erro no set cache: ', err);
    throw err;
  }
}

export async function getCache(key) {
  try {
    const cachedData = await getAsync(`${key}`);

    return JSON.parse(cachedData);
  } catch (err) {
    console.log('Erro no get cache: ', err);
    throw err;
  }
}
export async function delCache(key) {
  try {
    const cachedData = await delAsync(`${key}`);

    return cachedData;
  } catch (err) {
    console.log('Erro no get cache: ', err);
    throw err;
  }
}

export async function clearCache() {
  try {
    
    flushCache();
    
    return 'OK';
  } catch (err) {
    console.log('Erro ao limpar cache: ', err);
    throw err;
  }
}