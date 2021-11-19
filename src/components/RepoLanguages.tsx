import React, { useState, useEffect } from 'react';
import {
  Chart,
  Interval,
  Tooltip,
  Legend,
  Axis,
  getTheme,
  Coordinate
} from 'bizcharts';
import DataSet from '@antv/data-set';
import { message } from 'antd';

// 接口
import { languages } from '../api/github.api';

const { DataView } = DataSet;

const RepoLanguages = () => {
  let data: any = {};
  const dv: any = new DataView();

  useEffect(() => {
    getLanguages();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getLanguages = async () => {
    const res = await languages();
    if (typeof res === 'object') {
      data = res;
      dv.source(res).transform({
        type: 'percent',
        field: 'value',
        dimension: 'type',
        as: 'percent'
      });
    } else {
      message.error('gethub api 异常');
    }
  };

  const colors = data.reduce((pre, cur: any, idx) => {
    pre[cur.item] = getTheme().colors10[idx];
    return pre;
  }, {});

  return (
    <Chart
      height={220}
      data={dv.rows}
      autoFit
      scale={{
        percent: {
          formatter: (val) => {
            val = (val * 100).toFixed(2) + '%';
            return val;
          }
        }
      }}
    >
      <Coordinate type="theta" radius={0.6} innerRadius={0.8} />
      <Axis visible={false} />
      <Legend visible={false} />
      <Tooltip showTitle={false} />
      <Interval
        adjust="stack"
        position="percent"
        shape="sliceShape"
        color="type"
        element-highlight
        style={{
          lineWidth: 0.5,
          stroke: '#fff'
        }}
        label={[
          'type',
          (item) => {
            return {
              offset: 20,
              content: (data) => {
                return data.type;
              },
              style: {
                fill: colors[item]
              }
            };
          }
        ]}
      />
    </Chart>
  );
};

export default RepoLanguages;
