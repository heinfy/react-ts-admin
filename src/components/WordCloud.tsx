import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Card, message } from 'antd';
import {
  Chart,
  Geom,
  Tooltip,
  Coordinate,
  Legend,
  Axis,
  Interaction,
  G2,
  registerShape
} from 'bizcharts';

import DataSet from '@antv/data-set';

// 接口
import { wordCloud } from '../api/chart';

// 给point注册一个词云的shape
function getTextAttrs(cfg) {
  return _.assign({}, cfg.style, {
    fontSize: cfg.data.size,
    text: cfg.data.text,
    textAlign: 'center',
    fontFamily: cfg.data.font,
    fill: cfg.color,
    textBaseline: 'Alphabetic'
  });
}
registerShape('point', 'cloud', {
  draw(cfg: any, container: any) {
    // console.log('cloud cfg', cfg);
    const attrs = getTextAttrs(cfg);
    const textShape = container.addShape('text', {
      attrs: _.assign(attrs, {
        x: cfg.x,
        y: cfg.y
      })
    });
    if (cfg.data.rotate) {
      G2.Util.rotate(textShape, (cfg.data.rotate * Math.PI) / 180);
    }
    return textShape;
  }
});

const Wordcloud = () => {
  const [word, setWord] = useState([
    {
      x: 'China',
      value: 1383220000,
      category: '亚洲'
    }
  ]);
  useEffect(() => {
    getWordCloud();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getWordCloud = async () => {
    const res = await wordCloud();
    if (res.code === 1) {
      setWord(res.result);
    } else {
      message.error(res.message);
    }
  };
  const dv = new DataSet.View().source(word);
  const range = dv.range('value');
  const min = range[0];
  const max = range[1];
  dv.transform({
    type: 'tag-cloud',
    fields: ['x', 'value'],
    size: [600, 500],
    font: 'Verdana',
    padding: 0,
    timeInterval: 5000, // max execute time
    rotate() {
      let random = ~~(Math.random() * 4) % 4;
      if (random === 2) {
        random = 0;
      }
      return random * 270; // 0, 90, 270
    },
    fontSize(d) {
      if (d.value) {
        return ((d.value - min) / (max - min)) * (40 - 12) + 14;
      }
      return 0;
    }
  });
  const scale = {
    x: {
      nice: false
    },
    y: {
      nice: false
    }
  };
  return (
    <Card
      title="词云图"
      extra={
        <a
          href="https://www.bizcharts.net/product/BizCharts4/demo/465"
          target="_blank"
          rel="noreferrer"
        >
          词云(BizCharts@4.x)
        </a>
      }
    >
      <Chart
        width={800}
        height={400}
        data={dv.rows}
        scale={scale}
        padding={0}
        autoFit={false}
        onPointClick={console.log}
      >
        <Tooltip showTitle={false} />
        <Coordinate reflect="y" />
        <Axis name="x" visible={false} />
        <Axis name="y" visible={false} />
        <Legend visible={false} />
        <Geom
          type="point"
          position="x*y"
          color="category"
          shape="cloud"
          tooltip="value*category"
        />
        <Interaction type="element-active" />
      </Chart>
    </Card>
  );
};

export default Wordcloud;
