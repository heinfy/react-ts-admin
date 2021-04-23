import { responseData } from './utils';

const upload = [
  // upload
  {
    url: '/upload',
    type: 'post',
    response: (_) => {
      return responseData('20000', 'success', {
        imgUrl: '//game.gtimg.cn/images/lol/act/img/champion/Yasuo.png'
      });
    }
  }
];

export default upload;
