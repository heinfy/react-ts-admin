import React from 'react';
import { Layout, Menu, SubMenuProps, MenuItemProps } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import * as Icon from '@ant-design/icons';
import './index.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;

type IProps = {
  collapsed: boolean;
} & RouteComponentProps;

type IState = {
  openKey: string;
  menuNodes: (SubMenuProps & MenuItemProps) | null;
};

interface IMenuList {
  title: string;
  key: string;
  icon: string;
  isPublic?: boolean;
  children?: IMenuList[];
}

const menuList: IMenuList[] = [
  {
    title: '首页',
    key: '/dashboard',
    icon: 'VideoCameraOutlined',
    isPublic: true
  },
  {
    title: '商品',
    key: '/products',
    icon: 'UploadOutlined',
    children: [
      {
        title: '品类管理',
        key: '/category',
        icon: 'DesktopOutlined'
      },
      {
        title: '商品管理',
        key: '/product',
        icon: 'PieChartOutlined'
      }
    ]
  },

  {
    title: '用户管理',
    key: '/user',
    icon: 'FileOutlined'
  },
  {
    title: '角色管理',
    key: '/role',
    icon: 'TeamOutlined'
  },

  {
    title: '图形图表',
    key: '/charts',
    icon: 'UserOutlined',
    children: [
      {
        title: '柱形图',
        key: '/charts/bar',
        icon: 'UploadOutlined'
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: 'DesktopOutlined'
      },
      {
        title: '饼图',
        key: '/charts/pie',
        icon: 'PieChartOutlined'
      }
    ]
  },
  {
    title: '状态管理',
    key: '/store',
    icon: 'FileOutlined'
  }
];

class Nav extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      openKey: '/app/dashboard',
      menuNodes: null
    };
  }
  getIcon = (iconname: string) => React.createElement(Icon[iconname]);

  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname;
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        const key = `/app${item.key}`;
        pre.push(
          <Menu.Item key={key} icon={this.getIcon(item.icon)}>
            <Link to={key}>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        // 查找一个与当前请求路径匹配的子Item
        const cItem = item.children.find((cItem) => {
          return path.indexOf(`/app${cItem.key}`) === 0;
        });
        // 如果存在, 说明当前item的子列表需要打开
        if (cItem) {
          const key = `/app${item.key}`;
          this.setState({
            openKey: key
          });
        }
        const key = `/app${item.key}`;
        pre.push(
          <SubMenu key={key} icon={this.getIcon(item.icon)} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }

      return pre;
    }, []);
  };

  /*
  在第一次render()之前执行一次
  为第一个render()准备数据(必须同步的)
   */
  componentWillMount() {
    this.setState({
      menuNodes: this.getMenuNodes(menuList)
    });
  }

  render() {
    const { collapsed } = this.props;
    const { openKey, menuNodes } = this.state;
    const path = this.props.location.pathname;
    // 如果访问 /app/products'，想要自动跳转到默认子路由
    // if (path.indexOf('/app/products') === 0) {
    //   path = '/app/product';
    // }

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
          defaultOpenKeys={[openKey]}
        >
          {menuNodes}
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(Nav);
