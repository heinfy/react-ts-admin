import Mock from 'mockjs';
import { param2Obj } from './utils';

import user from './user';
import table from './table';
import upload from './upload';

const mocks = [...user, ...table, ...upload];

function XHR2ExpressReqWrap(respond) {
  return function (options) {
    let result = null;
    if (respond instanceof Function) {
      const { body, type, url } = options;
      result = respond({
        method: type,
        body: body,
        query: param2Obj(url)
      });
    } else {
      result = respond;
    }
    return Mock.mock(result);
  };
}

for (const i of mocks) {
  Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response));
}
