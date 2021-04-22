import { responseData } from './utils';

const upload = [
  // upload
  {
    url: '/api/upload',
    type: 'post',
    response: (_) => {
      console.log('upload', _.body);
      return responseData('20000', 'success', {
        imgUrl: 'https://avatars.githubusercontent.com/u/39523094?s=400&v=4'
      });
    }
  }
];

export default upload;
