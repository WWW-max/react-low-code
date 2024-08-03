import React, { FC } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { QuestionCheckboxStatPropsType } from './interface';

const StatComponent: FC<QuestionCheckboxStatPropsType> = ({ stat }) => {
  return (
    <div style={{ width: '400px', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={400}
          height={300}
          data={stat}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          {/* 网格线 */}
          <CartesianGrid strokeDasharray="3 3" />
          {/* x轴 */}
          <XAxis dataKey="name" />
          {/* y轴 */}
          <YAxis />
          {/* 条形图 */}
          <Bar dataKey="count" fill="#8884d8" />
          {/* 鼠标悬停提示 */}
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatComponent;
