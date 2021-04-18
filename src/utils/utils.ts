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
