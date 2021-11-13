import { Button } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  FileSearchOutlined,
  HighlightOutlined
} from '@ant-design/icons';

const style = { marginRight: 10 };
export const EditBtn = (props) => (
  <Button
    title="编辑"
    style={style}
    type="dashed"
    size="small"
    shape="circle"
    icon={<EditOutlined />}
    {...props}
  />
);

export const ViewBtn = (props) => (
  <Button
    title="查看详情"
    style={style}
    size="small"
    type="primary"
    shape="circle"
    icon={<FileSearchOutlined />}
    {...props}
  />
);

export const DelBtn = (props) => (
  <Button
    title="删除"
    style={style}
    size="small"
    shape="circle"
    icon={<DeleteOutlined />}
    {...props}
  />
);

export const AddBtn = (props) => (
  <Button
    title="添加"
    style={style}
    size="small"
    shape="circle"
    icon={<HighlightOutlined />}
    {...props}
  />
);
