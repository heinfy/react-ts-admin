import React, { useState } from 'react';
import { Table, Button, Checkbox, Popover, List } from 'antd';

const PopoverColumn = ({ configColumns, columns }) => {
  const [selected, setSelected] = useState<string[]>(
    columns.map((col) => col.key)
  );
  const baseCol = configColumns.map((col) => ({
    key: col.key,
    title: col.title
  }));
  const content = (
    <Table
      style={{ width: 160 }}
      rowKey={(row) => row.key}
      size="small"
      columns={[
        {
          title: '列',
          dataIndex: 'title',
          key: 'title'
        }
      ]}
      rowSelection={{
        type: 'checkbox',
        selectedRowKeys: selected,
        onChange: (selectedRowKeys, selectedRows) => {
          setSelected(selectedRowKeys as string[]);
        }
      }}
      pagination={false}
      dataSource={baseCol}
      scroll={{ x: 'max-content', y: 200 }}
    />
  );
  return (
    <Popover content={content} placement="bottom">
      <Button type="primary" size="small">
        显示项
      </Button>
    </Popover>
  );
};

export default PopoverColumn;
