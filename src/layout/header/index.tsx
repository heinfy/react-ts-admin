import React from 'react';
import { Layout, Badge, Row, Col } from 'antd';
import BreadcrumbMap from '../../components/BreadcrumbMap';
import screenfull from 'screenfull';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MessageOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons';
import MyCenter from '../../components/MyCenter';
import './index.scss';

interface IProps {
  collapsed: boolean;
  toggle: () => void;
}

interface IState {
  isFullscreen: boolean;
}

class Header extends React.Component<IProps, IState> {
  state = {
    isFullscreen: false,
    style: {
      fontSize: 20,
      marginRight: '20px'
    }
  };
  handleScreenfull = () => {
    if (screenfull.isEnabled) {
      const { isFullscreen } = this.state;
      this.setState({
        isFullscreen: !isFullscreen
      });
      screenfull.toggle();
    }
  };
  render() {
    const { collapsed, toggle } = this.props;
    const { isFullscreen, style } = this.state;
    return (
      <Layout.Header
        style={{
          backgroundColor: 'white',
          height: '66px',
          padding: '0',
          paddingRight: 150,
          overflow: 'auto',
          width: '100%',
          boxSizing: 'border-box'
        }}
        className="site-layout-header"
      >
        <Row justify="space-around" align="middle">
          <Col flex="none">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: toggle
              }
            )}
          </Col>
          <Col flex="none">
            <BreadcrumbMap></BreadcrumbMap>
          </Col>
        </Row>
        <Row>
          <Col flex="none" onClick={this.handleScreenfull}>
            {isFullscreen ? (
              <FullscreenExitOutlined title="取消全屏" style={style} />
            ) : (
              <FullscreenOutlined title="全屏" style={style} />
            )}
          </Col>
          <Col flex="none">
            <Badge style={style} dot>
              <MessageOutlined style={style} />
            </Badge>
          </Col>
          <Col flex="none">
            <MyCenter></MyCenter>
          </Col>
        </Row>
      </Layout.Header>
    );
  }
}

export default Header;
