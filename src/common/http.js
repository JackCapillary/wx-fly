import axios from 'axios';
import Qs from 'qs';
// /* eslint-disable */
// setCookie('token', '8c49c44e048d47701cca9b31a153fc67'); // 公测token打包时要注释掉
// const baseURL = 'http://localhost:3000/'; // 本地环境
const baseURL = 'http://tantanwin.com:3000/'; // 生产环境
const http = {
  post(repo, param) {
    const requestData = {
      ...param,
      // token: getCookie('token'),
    };
    return new Promise((resolve) => {
      // setCookie('token', getCookie('token'), 20);
      axios.post(baseURL + repo, Qs.stringify(requestData), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            const data = response.data;
            let result;
            if (data.returnCode === 1) {
              result = data;
            } else if (data.returnCode === 2) {
              result = data;
            } else if (data.returnCode === 0) {
              result = data;
            }
            resolve(result);
          } else {
            // reject(response);
            resolve(response);
          }
        })
        .catch((error) => {
          resolve(error);
        });
    });
  },
};

export default http;
