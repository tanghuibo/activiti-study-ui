import { message } from 'antd';
export default function myFetch(...param) {
  return fetch(...param)
    .then((response) => {
      if (!response.ok) {
        console.error(response);
        throw response.statusText;
      }
      return response.text();
    })
    .then((text) => JSON.parse(text))
    .catch((e) => {
      console.error(e);
      message.error(e + "");
    });
}
