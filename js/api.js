const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';
const route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const method = {
  GET: 'GET',
  POST: 'POST'
};

const errorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз'
};

const load = async (routePath, errorMessage, methodType = method.GET, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${routePath}`, {
      method: methodType,
      body
    });

    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (error){
    throw new Error(errorMessage);
  }
};

const getData = () => load(route.GET_DATA, errorText.GET_DATA);

const sendData = (body) => load(route.SEND_DATA, errorText.SEND_DATA, method.POST, body);
export { getData, sendData };
