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
  const _data = JSON.parse(JSON.stringify(data)).filter(
    (item: IAuths) => item.isMenu === 1
  );
  return _data.filter((p) => {
    const _arr = _data.filter((c) => c.pid === p.id);
    _arr.length && (p.children = _arr);
    return p.pid === 0;
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
    if (item.key === $selectKey) {
      return [{ key: item.key, title: item.title }];
    } else {
      const res = scanTree(item, $selectKey, layer, posIndx);
      if (res) return res;
    }
  }
};

/**
 * 扫描树下面的孩子对象
 * @param {object} $item - 要递归遍历的对象
 * @param {string} $key - 要匹配的元素
 * @param {number} $layer - 遍历到哪一级孩子对象
 * @param {array} $posIndx - 用来存储匹配到的元素的所有父级
 * @returns {array} - 匹配到的元素的所有父级
 */
const scanTree = ($item, $key, $layer, $posIndx) => {
  // console.log('layer', $item, $key, $layer, $posIndx);
  if (!$item.children) {
    $layer -= 1;
    return false;
  }
  $posIndx[$layer] = { key: $item.key, title: $item.title };
  for (let i = 0; i < $item.children.length; i++) {
    const item = $item.children[i];
    if (item.key === $key) {
      // console.log('找到节点,节点位置是：', i);
      $posIndx.push({ key: item.key, title: item.title });
      return $posIndx;
    } else {
      // console.log('深入到子节点');
      const layer = $layer + 1;
      const node = scanTree(item, $key, layer, $posIndx);
      if (!node && $posIndx.length > 0) {
        $posIndx.length -= 1;
        $posIndx[$layer] = { key: $item.key, title: $item.title };
      }
      if (node) return node;
    }
  }
};
