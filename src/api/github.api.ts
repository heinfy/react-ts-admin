import { GITHUB_API } from '../utils/constant';

// 获取项目的语言占比
export const languages = () => {
  fetch(
    `${GITHUB_API}/repos/houfeii/react-ts-admin/languages?owner=houfeii&repo=react-ts-admin`,
    {
      method: 'get'
    }
  );
};
