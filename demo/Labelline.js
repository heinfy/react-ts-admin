import React from 'react';
import {
  Chart,
  Interval,
  Tooltip,
  Legend,
  View,
  Axis,
  Coordinate
} from 'bizcharts';
import DataSet from '@antv/data-set';

const { DataSet } = DataView;

function Labelline() {
  const data = [
    { value: 251, name: '子事例一' },
    { value: 610, name: '子事例三' },
    { value: 335, name: '子事例五' }
  ];
  // 通过 DataSet 计算百分比
  const dv = new DataView();
  dv.source(data).transform({
    type: 'percent',
    field: 'value',
    dimension: 'type',
    as: 'percent'
  });

  const dv1 = new DataView();
  dv1.source(data).transform({
    type: 'percent',
    field: 'value',
    dimension: 'name',
    as: 'percent'
  });

  return (
    <Chart
      height={400}
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
      <Coordinate type="theta" radius={0.5} />
      <Axis visible={false} />
      <Legend visible={false} />
      <Tooltip showTitle={false} />
      <View data={dv1.rows}>
        <Coordinate type="theta" radius={0.75} innerRadius={0.5 / 0.75} />
        <Interval
          position="percent"
          adjust="stack"
          color={[
            'name',
            ['#BAE7FF', '#7FC9FE', '#71E3E3', '#ABF5F5', '#8EE0A1', '#BAF5C4']
          ]}
          element-highlight
          style={{
            lineWidth: 1,
            stroke: '#fff'
          }}
          label="name"
        />
      </View>
    </Chart>
  );
}

export default Labelline;
