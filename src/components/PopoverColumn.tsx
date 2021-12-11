import React, { useState } from 'react';
import { Table, Button, Popover, message } from 'antd';

const PopoverColumn = ({ configColumns, columns, update }) => {
  const [selected, setSelected] = useState<string[]>(
    columns.map((col) => col.key)
  );
  const baseCol = configColumns.map((col) => ({
    key: col.key,
    title: col.title
  }));
  const saveColumns = () => {
    if (selected.length === 0) {
      return message.error('至少展示一列');
    }
    const result: any = [];
    configColumns.forEach((row) => {
      selected.forEach((select) => {
        if (row.key === select) {
          result.push(row);
        }
      });
    });
    update(result);
  };
  const content = (
    <>
      <Table
        style={{ width: 200 }}
        rowKey={(row) => row.key}
        size="small"
        columns={[
          {
            title: '显示列',
            dataIndex: 'title',
            key: 'title'
          }
        ]}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selected,
          onChange: (selectedRowKeys) => {
            setSelected(selectedRowKeys as string[]);
          }
        }}
        pagination={false}
        dataSource={baseCol}
        scroll={{ x: 'max-content', y: 200 }}
      />
      <Button
        type="primary"
        size="small"
        style={{ display: 'block', margin: '10px auto 0' }}
        onClick={saveColumns}
      >
        保存
      </Button>
    </>
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
