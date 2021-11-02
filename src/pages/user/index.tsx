import React from 'react';

interface ITable {
  id: string;
  name: string;
  age: number;
  gender: string;
  addr: string;
  phone: string;
  jd: string;
  'status|1': string[];
  hobby: string[];
  income: number;
  describe: string;
  travelList?: travel[];
  display_time: string;
  cereate_time: string;
}

interface travel {
  days: string;
  date: string;
  address: string;
  amount: string;
  feel: string;
  evaluate: string;
}

const User = () => {
  return <div>user 页面</div>;
};

export default User;
