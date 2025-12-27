const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз'
};

const load = async (routePath, errorMessage, methodType = Method.GET, body = null) => {
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

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export { getData, sendData };
