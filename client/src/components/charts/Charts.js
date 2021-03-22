import React from 'react';
import data from './FakeData';
import { Line } from 'react-chartjs-2';

const Charts = () => {
  const options = {
    scales: {
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 7,
            // callback: function (label) {
            //   const hour = label.split(' ')[1];
            //   if (hour === 12) {
            //     // return label.split(' ')[0];
            //     return label;
            //   } else {
            //     return '';
            //   }
            // },
          },
        },
      ],
    },
  };
  const dataObj1 = {
    datasets: [
      {
        label: 'Number of customers',
        data: data.map((e) => e.num_customers),
        borderColor: 'red',
        backgroundColor: '#ff000022',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#000',
        pointHoverBackgroundColor: '#ff000088',
      },
      {
        label: 'Number of employees',
        data: data.map((e) => e.num_employees),
        borderColor: 'blue',
        backgroundColor: '#0000ff33',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#000',
        pointHoverBackgroundColor: '#0000ff88',
      },
    ],
    labels: data.map((e) => `${e.month}/${e.day}`),
  };
  const dataObj2 = {
    datasets: [
      {
        label: 'Number of free tables',
        data: data.map((e) => e.num_tables),
        borderColor: 'green',
        backgroundColor: '#00ff0022',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#000',
        pointHoverBackgroundColor: '#00ff0088',
      },
    ],
    labels: data.map((e) => `${e.month}/${e.day}`),
  };
  return (
    <div>
      <h1>Something</h1>
      <p>{data[0].year}</p>
      <Line data={dataObj1} options={options} />
      <Line data={dataObj2} options={options} />
    </div>
  );
};

export default Charts;
