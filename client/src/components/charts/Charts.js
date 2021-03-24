import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getRestaurantData } from '../../actions/restaurant';

const Charts = ({ rid, getRestaurantData, restaurantObj: { chartData } }) => {
  useEffect(() => {
    if (rid) {
      getRestaurantData(rid);
    }

    // eslint-disable-next-line
  }, [rid]);

  const [resData, setResData] = useState(chartData ? chartData : []);

  const dataObj1 = {
    datasets: [
      {
        label: 'Number of customers',
        data: resData && resData.map((e) => e.num_customers),
        borderColor: 'red',
        backgroundColor: '#ff000022',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#000',
        pointHoverBackgroundColor: '#ff000088',
      },
      {
        label: 'Number of employees',
        data: resData && resData.map((e) => e.num_employees),
        borderColor: 'blue',
        backgroundColor: '#0000ff33',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#000',
        pointHoverBackgroundColor: '#0000ff88',
      },
    ],
    labels: resData && resData.map((e) => `${e.month}/${e.day}`),
  };
  const dataObj2 = {
    datasets: [
      {
        label: 'Number of free tables',
        data: resData && resData.map((e) => e.num_tables),
        borderColor: 'green',
        backgroundColor: '#00ff0022',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#000',
        pointHoverBackgroundColor: '#00ff0088',
      },
    ],
    labels: resData && resData.map((e) => `${e.month}/${e.day}`),
  };

  useEffect(() => {
    setResData(chartData);

    // eslint-disable-next-line
  }, [chartData]);

  const options = {
    scales: {
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 7,
          },
        },
      ],
    },
  };

  return !rid || !chartData ? (
    <Spinner />
  ) : (
    <div id='charts-area'>
      <h5 className='text-center'>
        Number of customers & employees over the past 7 days
      </h5>
      <Line data={dataObj1} options={options} />
      <h5 className='text-center'>Number of free table over the past 7 days</h5>
      <Line data={dataObj2} options={options} />
    </div>
  );
};

Charts.propTypes = {
  restaurantObj: PropTypes.object.isRequired,
  getRestaurantData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  restaurantObj: state.restaurant,
});

const mapFunctionsToProps = {
  getRestaurantData,
};

export default connect(mapStateToProps, mapFunctionsToProps)(Charts);
