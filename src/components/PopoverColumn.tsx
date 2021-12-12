import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Table, Button, Popover, message } from 'antd';

import { getColumns, operateColumns } from '../api/common';

const PopoverColumn = ({
  columns,
  selected,
  setSelected,
  setCurrentColumns
}) => {
  const location = useLocation();
  useEffect(() => {
    getCustomColumns();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const dataSource = columns.map((col) => ({
    key: col.key,
    title: col.title
  }));
  // 更新首选项
  const saveColumns = async () => {
    if (selected.length === 0) {
      return message.error('至少展示一列');
    }
    const res = await operateColumns({
      path: location.pathname,
      columns: selected
    });
    if (res.code === 1) {
      const result: any = [];
      columns.forEach((row) => {
        selected.forEach((select) => {
          if (row.key === select) {
            result.push(row);
          }
        });
      });
      setCurrentColumns(result);
    } else {
      message.error(res.message);
    }
  };
  // 获取该用户自定义的首选项展示
  const getCustomColumns = async () => {
    const res = await getColumns(location.pathname);
    if (res.code === 1) {
      const selected = res.result;
      if (selected) {
        setSelected(selected);
        const current: any = [];
        columns.forEach((row) => {
          selected.forEach((select) => {
            if (row.key === select) {
              current.push(row);
            }
          });
        });
        setCurrentColumns(current);
      } else {
        setCurrentColumns(columns);
      }
    } else {
      setCurrentColumns(columns);
      message.error(res.message);
    }
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
        dataSource={dataSource}
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
