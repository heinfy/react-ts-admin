import React, { useState, useEffect } from 'react';
import {
  List,
  Typography,
  Card,
  Col,
  Row,
  Avatar,
  Skeleton,
  Divider
} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

const DailyRecommendation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    loadMoreData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo'
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
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
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={(item: any) => (
              <List.Item
                key={item.id}
                actions={[<a href="#1">edit</a>, <a href="#2">more</a>]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={item.picture.large} />}
                    title={<a href="https://ant.design">{item.name.last}</a>}
                    description={
                      <>
                        <Typography.Text mark>[ITEM]</Typography.Text>{' '}
                        {item.email}
                      </>
                    }
                  />
                  <div>Content</div>
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
