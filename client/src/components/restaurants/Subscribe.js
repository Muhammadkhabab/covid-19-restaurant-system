import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import { Row, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import TimePicker from 'react-time-picker';
import { toast } from 'react-toastify';

const Subscribe = () => {
  const [data, setData] = useState({
    is_contact_email: true,
    contact: 'khoa1652000@gmail.com',
    start_time: '22:00',
    end_time: '23:00',
    interval: 15,
    min_table_distance: 0,
    percent_capacity: 50,
    max_customers: 10,
    min_tables: 0,
    dine_in: false,
    dine_outside: false,
    pickup: true,
    curbside_pickup: false,
    delivery: false,
  });

  const {
    is_contact_email,
    contact,
    start_time,
    end_time,
    interval,
    min_table_distance,
    percent_capacity,
    max_customers,
    min_tables,
    dine_in,
    dine_outside,
    pickup,
    curbside_pickup,
    delivery,
  } = data;

  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const onChangeBoolean = (e) =>
    setData({ ...data, [e.target.name]: e.target.value === 'true' });

  const onCheckboxChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value === 'false' });

  const onChangeSlide = (e, fieldName) =>
    setData({ ...data, [fieldName]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const dataObj = {
      is_contact_email,
      contact,
      interval,
      dine_in,
      dine_outside,
      pickup,
      curbside_pickup,
      delivery,
    };

    const startTimeObj = new Date();
    const startTimeArr = start_time.split(':');
    startTimeObj.setHours(...startTimeArr);

    const endTimeObj = new Date();
    const endTimeArr = end_time.split(':');
    endTimeObj.setHours(...endTimeArr);

    dataObj['start_time'] = startTimeObj.toISOString();
    dataObj['end_time'] = endTimeObj.toISOString();

    if (startTimeObj <= new Date()) {
      toast.error('Start time cannot be in the past!');
      return;
    }
    if (startTimeObj >= endTimeObj) {
      toast.error('End time must be later than start time!');
      return;
    }

    if (!dine_in && !dine_outside && !pickup && !curbside_pickup && !delivery) {
      toast.error('Enter at least one option for dining experience!');
      return;
    }

    if (min_table_distance > 0)
      dataObj['min_table_distance'] = min_table_distance;
    if (percent_capacity > 0)
      dataObj['percent_capacity'] = percent_capacity / 100;
    if (max_customers > 0) dataObj['max_customers'] = max_customers;
    if (min_tables > 0) dataObj['min_tables'] = min_tables;

    console.log(dataObj);
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Row>
          <Col md='4'>
            <p className='m-0'>Distance between tables</p>
            <RangeSlider
              value={min_table_distance}
              max={20}
              onChange={(e) => onChangeSlide(e, 'min_table_distance')}
            />
            <p class='m-0'>Capacity (%)</p>
            <RangeSlider
              value={percent_capacity}
              max={100}
              onChange={(e) => onChangeSlide(e, 'percent_capacity')}
            />
            <p class='m-0'>Total customers</p>
            <RangeSlider
              value={max_customers}
              max={50}
              onChange={(e) => onChangeSlide(e, 'max_customers')}
            />
            <p class='m-0'>Free tables</p>
            <RangeSlider
              value={min_tables}
              max={10}
              onChange={(e) => onChangeSlide(e, 'min_tables')}
            />
          </Col>
          <Col md='8'>
            <Row>
              <Col md='4'>
                <FormGroup>
                  <Label>Subscribe method</Label>
                  <Input
                    type='select'
                    name='is_contact_email'
                    onChange={onChangeBoolean}
                    defaultValue={true}
                    required
                  >
                    <option disabled>Select contact method</option>
                    <option value={true}>Email</option>
                    <option value={false}>Phone number</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md='8'>
                <FormGroup>
                  <Label>
                    {is_contact_email ? 'Email' : 'Phone number | xxx-xxx-xxxx'}
                  </Label>
                  {is_contact_email ? (
                    <Input
                      type='email'
                      name='contact'
                      value={contact}
                      onChange={onChange}
                      placeholder='Enter your email'
                      // required
                    />
                  ) : (
                    <Input
                      type='tel'
                      pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                      name='contact'
                      value={contact}
                      onChange={onChange}
                      placeholder='Enter your phone number'
                      // required
                    />
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>Start time</Label>
                  <TimePicker
                    name='start_time'
                    onChange={(time) => setData({ ...data, start_time: time })}
                    value={start_time}
                    required
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>End time</Label>
                  <TimePicker
                    name='end_time'
                    onChange={(time) => setData({ ...data, end_time: time })}
                    value={end_time}
                    required
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Interval (in minutes)</Label>
                  <Input
                    type='text'
                    name='interval'
                    value={interval}
                    onChange={onChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input
                      type='checkbox'
                      name='dine_in'
                      value={dine_in}
                      onChange={onCheckboxChange}
                    />{' '}
                    Dine-In?
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input
                      type='checkbox'
                      name='dine_outside'
                      value={dine_outside}
                      onChange={onCheckboxChange}
                    />{' '}
                    Dine-Out?
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input
                      type='checkbox'
                      name='pickup'
                      value={pickup}
                      onChange={onCheckboxChange}
                    />{' '}
                    Pickup?
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input
                      type='checkbox'
                      name='curbside_pickup'
                      value={curbside_pickup}
                      onChange={onCheckboxChange}
                    />{' '}
                    Curbside?
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input
                      type='checkbox'
                      name='delivery'
                      value={delivery}
                      onChange={onCheckboxChange}
                    />{' '}
                    Delivery?
                  </Label>
                </FormGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        <Input
          type='submit'
          value='Subscribe'
          className='btn-info btn-block mt-4'
        />
      </Form>
    </div>
  );
};

export default Subscribe;
