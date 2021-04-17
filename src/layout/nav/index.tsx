import React, { useState, useEffect } from 'react';
import { Layout, Menu, SubMenuProps, MenuItemProps } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import * as Icon from '@ant-design/icons';
import './index.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;

interface IRoutes {
  title: string;
  key: string;
  icon: string;
  id: number;
  pid: number;
  childen?: IRoutes;
}

type IProps = {
  collapsed: boolean;
  openKey: string[];
  routes: IRoutes[];
} & RouteComponentProps;

const Nav = (props: IProps) => {
  const [openKey, setOpenKey] = useState<string[]>([]);
  const [menuNodes, setMenuNodes] = useState<
    (SubMenuProps & MenuItemProps) | null
  >(null);

  useEffect(() => {
    setMenuNodes(getMenuNodes(props.routes));
  }, [props.routes]);

  const getIcon = (iconname: string) => React.createElement(Icon[iconname]);

  const getMenuNodes = (menuList) => {
    const path = props.location.pathname;
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key} icon={getIcon(item.icon)}>
            <Link to={item.key}>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        // 查找一个与当前请求路径匹配的子Item
        const cItem = item.children.find((cItem) => {
          return path.indexOf(cItem.key) === 0;
        });
        // 如果存在, 说明当前item的子列表需要打开 TODO bug
        if (cItem) {
          setOpenKey(item.key);
        }
        pre.push(
          <SubMenu key={item.key} icon={getIcon(item.icon)} title={item.title}>
            {getMenuNodes(item.children)}
          </SubMenu>
        );
      }

      return pre;
    }, []);
  };

  const { collapsed } = props;
  let path = props.location.pathname;
  // 如果访问 /products'，想要自动跳转到默认子路由
  if (path.indexOf('/products') === 0) {
    path = '/product';
  }

  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0
      }}
      breakpoint="lg"
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className="logo" />
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[path]}
        defaultOpenKeys={openKey}
      >
        {menuNodes}
      </Menu>
    </Sider>
  );
};

export default withRouter(Nav);
