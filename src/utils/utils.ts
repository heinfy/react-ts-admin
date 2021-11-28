import React from 'react';
import moment from 'moment';
import * as Icon from '@ant-design/icons';

import { IAuths, IRoutes } from '../redux/interface';

/**
 * 路由权限列表转换为树形结构
 * @param {Object[]} auths - 权限项
 * @param {string} auths[].title - 权限名称
 * @param {string} auths[].key - 权限键值
 * @param {string} auths[].icon - 权限图标
 * @param {number} auths[].id - 权限id
 * @param {number} auths[].pid - 权限父id
 * @returns {Array} 树形结构
 */
export const formateDataTree: (data: IAuths[]) => IRoutes[] = (
  data: IAuths[]
) => {
  const _data = JSON.parse(JSON.stringify(data));
  return _data.filter((p) => {
    const _arr = _data.filter((c) => c.pid === p.authid);
    _arr.length && (p.children = _arr);
    return p.pid === '1';
  });
};

/**
 * 路由权限列表转换为树形结构
 * @param {Object[]} auths - 权限项
 * @param {string} auths[].authName - 权限名称
 * @param {number} auths[].authid - 权限id
 * @param {number} auths[].pid - 权限父id
 * @param {number} auths[].type - 权限类型
 * @returns {Array} 树形结构
 */
export const formateData2Tree = (data) => {
  const _data = JSON.parse(JSON.stringify(data));
  return _data.filter((p) => {
    const _arr = _data.filter((c) => c.pid === p.key);
    _arr.length && (p.children = _arr);
    return p.pid === 'null';
  });
};

/**
 * 获取指定元素的所有父级对象的索引
 * @param {array} treeData - 要匹配的树
 * @param {string} $selectKey - 要匹配的元素
 * github: https://github.com/chenyin151/GetParentForTree
 */
export const getParentForTree = (treeData, $selectKey) => {
  for (let i = 0; i < treeData.length; i++) {
    const layer = 0;
    const posIndx = [];
    const item = treeData[i];
    if (item.route === $selectKey) {
      return [{ route: item.route, routeName: item.routeName }];
    } else {
      const res = scanTree(item, $selectKey, layer, posIndx);
      if (res) return res;
    }
  }
};

/**
 * 扫描树下面的孩子对象
 * @param {object} $item - 要递归遍历的对象
 * @param {string} $route - 要匹配的元素
 * @param {number} $layer - 遍历到哪一级孩子对象
 * @param {array} $posIndx - 用来存储匹配到的元素的所有父级
 * @returns {array} - 匹配到的元素的所有父级
 */
const scanTree = ($item, $route, $layer, $posIndx) => {
  if (!$item.children) {
    $layer -= 1;
    return false;
  }
  $posIndx[$layer] = { route: $item.route, routeName: $item.routeName };
  for (let i = 0; i < $item.children.length; i++) {
    const item = $item.children[i];
    if (item.route === $route) {
      // console.log('找到节点,节点位置是：', i);
      $posIndx.push({ route: item.route, routeName: item.routeName });
      return $posIndx;
    } else {
      // console.log('深入到子节点');
      const layer = $layer + 1;
      const node = scanTree(item, $route, layer, $posIndx);
      if (!node && $posIndx.length > 0) {
        $posIndx.length -= 1;
        $posIndx[$layer] = { route: $item.route, routeName: $item.routeName };
      }
      if (node) return node;
    }
  }
};

/**
 * 根据 Icon名称 获取 Icon 标签
 * @param {string} iconname - Icon名称
 * @returns {Element}} - Icon 标签
 */
export const getIcon = (iconname: string) =>
  React.createElement(Icon[iconname]);

/**
 * 根据 Icon名称 获取 Icon 标签
 * @param {Date| string} time - 标准时间
 * @param {string} formatType - 时间格式
 * @returns {string}} - 时间
 */
export const formatTime = (time: Date | string, formatType?: string) => {
  formatType = formatType || 'YYYY-MM-DD HH:mm:ss';
  return moment(time).format(formatType);
};

export const urlToObj = (str: string) => {
  const obj = {};
  const arr1 = str.split('?');
  const arr2 = arr1[1].split('&');
  for (let i = 0; i < arr2.length; i++) {
    const res = arr2[i].split('=');
    obj[res[0]] = res[1];
  }
  return obj;
};
