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
  const [data, setDate] = useState([]);
  const [dv, setDv] = useState(new DataView());
  useEffect(() => {
    getLanguages();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getLanguages = async () => {
    const res: any = await languages();
    if (!res.message) {
      const list: any = Object.entries(res).map((i) => {
        return { value: i[0], type: i[1] };
      });
      setDate(list);
      const dv_ = dv.source(list).transform({
        type: 'percent',
        field: 'value',
        dimension: 'type',
        as: 'percent'
      });
      setDv(dv_);
    } else {
      console.error(res.message);
      message.error('GITHUB API 403 ERROR');
    }
  };

  const colors = data.reduce((pre, cur: any, idx) => {
    pre[cur.item] = getTheme().colors10[idx];
    return pre;
  }, {});

  return data.length > 0 ? (
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
  ) : null;
};

export default RepoLanguages;
