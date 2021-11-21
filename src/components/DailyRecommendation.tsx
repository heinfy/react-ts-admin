import React, { useState, useEffect } from 'react';
import {
  List,
  Typography,
  Card,
  Avatar,
  Skeleton,
  Divider,
  message,
  Popover,
  Button
} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

//接口
import { daily } from '../api/home';

const DailyRecommendation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    loadMoreData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const res = await daily({ page: 1, size: 5 });
    setLoading(false);
    if (res) {
      setData([...data, ...res.result]);
    } else {
      message.error(res.message);
    }
  };
  return (
    <Card title="每日推荐">
      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: 'auto',
          padding: '0 20px'
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 50}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>没有更多了！🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={(item: any) => (
              <List.Item key={item.id} actions={[<a href="#2">更多...</a>]}>
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={item.picture.large} />}
                    title={
                      <Popover
                        content={
                          <>
                            <div>
                              {item.name.title}.{item.name.first}{' '}
                              {item.name.last}
                            </div>
                            <div>{item.nat}</div>
                          </>
                        }
                        title={item.email}
                      >
                        <Button type="link">{item.name.last}</Button>
                      </Popover>
                    }
                    description={
                      <>
                        <Typography.Text mark>[{item.nat}]</Typography.Text>{' '}
                        {item.email}
                      </>
                    }
                  />
                  <div>君不见黄河之水天上来，奔流到海不复回...</div>
                </Skeleton>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </Card>
  );
};

export default DailyRecommendation;
