import { GITHUB_API } from '../utils/constant';

const promise = (path, method, body = {}) => {
  return new Promise(function (resolve, reject) {
    fetch(path, {
      method,
      ...body
    })
      .then((res) => res.json())
      .then((body) => {
        resolve(body);
      })
      .catch((err) => {
        reject('' + err);
      });
  });
};
// 获取项目的语言占比
const languagesPath = `${GITHUB_API}/repos/houfeii/react-ts-admin/languages?owner=houfeii&repo=react-ts-admin`;
export const languages = () => promise(languagesPath, 'get');
