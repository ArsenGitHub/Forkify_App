// Время ожидания промиса
import { TIMEOUT_SEC } from './config';

// Функция для защиты от бесконечно длящегося промиса
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// Функция-хелпер fetch
export const getData = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message}(${response.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};
