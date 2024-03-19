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

// Ф-я для получения/отправки данных с API
export const AJAX = async function (url, recipeData = undefined) {
  try {
    const fetchData = recipeData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recipeData),
        })
      : fetch(url);

    const response = await Promise.race([fetchData, timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message}(${response.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};
