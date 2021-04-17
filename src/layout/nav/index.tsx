import React, { useState } from 'react';
import { Layout, Menu, SubMenuProps, MenuItemProps } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';

import { IStore } from '../../redux/interface';
import { formateDataTree } from '../../utils/utils';
import * as Icon from '@ant-design/icons';
import './index.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;

type IProps = {
  collapsed: boolean;
  openKey: string[];
} & RouteComponentProps;

const Nav = (props: IProps) => {
  const [openKey, setOpenKey] = useState<string[]>([]);

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
        // 如果存在, 说明当前item的子列表需要打开
        if (cItem && openKey.length === 0) {
          setOpenKey([item.key]);
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

  const { collapsed, auths } = props,
    { pathname } = props.location,
    menuNodes: (SubMenuProps[] & MenuItemProps[]) | [] = getMenuNodes(
      formateDataTree(auths)
    );

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
      {menuNodes.length > 0 && (
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[pathname]}
          defaultOpenKeys={openKey}
        >
          {menuNodes}
        </Menu>
      )}
    </Sider>
  );
};

export default withRouter(
  connect(
    (state: IStore) => ({
      auths: state.auths
    }),
    {}
  )(Nav)
);
