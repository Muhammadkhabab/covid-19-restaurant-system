import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFilteredRestaurant } from '../../actions/restaurant';
import { Container, Row, Col, Button, Input } from 'reactstrap';
import SvgCupcake from '../svg/SvgCupcake';
import '../../styles/AdvancedSearch.scss';
// https://github.com/jaywilz/react-bootstrap-range-slider
import RangeSlider from 'react-bootstrap-range-slider';

const AdvancedSearch = ({ restaurants, getFilteredRestaurant }) => {
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState({});
  const [checkbox, setCheckbox] = useState([]);
  const [moreFilters, setMoreFilters] = useState(false);
  const [tableDistance, setTableDistance] = useState(0);
  const [percentCapacity, setPercentCapacity] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [currentFreeTable, setCurrentFreeTable] = useState(0);

  const onChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
    setFilters({ ...filters, search: e.target.value });
  };

  /* After a user clicks the Search button, send a GET request to get filtered 
  restaurant */
  const onSearch = () => {
    var indFilters = {};

    indFilters = { ...indFilters, search: searchText };
    if (checkbox.includes(1)) indFilters = { ...indFilters, dine_in: 1 };
    if (checkbox.includes(2)) indFilters = { ...indFilters, dine_outside: 1 };
    if (checkbox.includes(3)) indFilters = { ...indFilters, pickup: 1 };
    if (checkbox.includes(4))
      indFilters = { ...indFilters, curbside_pickup: 1 };
    if (checkbox.includes(5)) indFilters = { ...indFilters, delivery: 1 };
    if (tableDistance > 0)
      indFilters = { ...indFilters, tables_distance: tableDistance };
    if (percentCapacity > 0) {
      const percent = percentCapacity / 100;
      indFilters = { ...indFilters, current_percent_capacity: percent };
    }
    if (totalCustomer > 0)
      indFilters = { ...indFilters, total_customers: totalCustomer };
    if (currentFreeTable > 0)
      indFilters = { ...indFilters, current_free_tables: currentFreeTable };

    //Pass params to the getFilteredRestaurant GET request
    getFilteredRestaurant(indFilters);
  };

  //Checkbox for the filters
  const onCheckboxBtnClick = (selected) => {
    const index = checkbox.indexOf(selected);
    if (index < 0) {
      checkbox.push(selected);
    } else {
      checkbox.splice(index, 1);
    }
    setCheckbox([...checkbox]);
  };

  // More filters section renders after a user clicks More Filters button
  const moreFiltersSection = () => {
    if (moreFilters === true) {
      return (
        <Row>
          <Col>
            <RangeSlider
              value={tableDistance}
              max={20}
              onChange={(changeEvent) =>
                setTableDistance(changeEvent.target.value)
              }
            />
            <p class='text-center'>Distance between tables</p>
          </Col>
          <Col>
            <RangeSlider
              value={percentCapacity}
              max={100}
              onChange={(changeEvent) =>
                setPercentCapacity(changeEvent.target.value)
              }
            />
            <p class='text-center'>Current Capacity (%)</p>
          </Col>
          <Col>
            <RangeSlider
              value={totalCustomer}
              max={50}
              onChange={(changeEvent) =>
                setTotalCustomer(changeEvent.target.value)
              }
            />
            <p class='text-center'>Current Total Customer</p>
          </Col>
          <Col>
            <RangeSlider
              value={currentFreeTable}
              max={10}
              onChange={(changeEvent) =>
                setCurrentFreeTable(changeEvent.target.value)
              }
            />
            <p class='text-center'>Current Free Tables</p>
          </Col>
        </Row>
      );
    }
  };
  return (
    <div id='filter-section'>
      <Container className='mb-4'>
        <Row className='d-flex justify-content-center' lg={3}>
          <SvgCupcake class='w-75 h-75' />
        </Row>
        <Row className='mt-2 d-flex justify-content-center'>
          <Col xs={8} md={5}>
            <Input
              type='text'
              placeholder='Search for restaurant'
              onChange={(e) => onChange(e)}
              value={searchText}
              className='py-3'
            />
          </Col>
          <Col xs={2} md={2}>
            <button
              type='button'
              class='btn btn-outline-primary'
              xs={4}
              md={2}
              onClick={onSearch}
            >
              Search
            </button>
          </Col>
        </Row>
        <Row className='mt-4 d-flex justify-content-center'>
          <Button
            color='primary'
            className='mr-2 mt-1'
            size='sm'
            onClick={() => onCheckboxBtnClick(1)}
            active={checkbox.includes(1)}
          >
            Dine Inside
          </Button>
          <Button
            color='primary'
            className='mr-2 mt-1'
            size='sm'
            onClick={() => onCheckboxBtnClick(2)}
            active={checkbox.includes(2)}
          >
            Dine Outside
          </Button>
          <Button
            color='primary'
            className='mr-2 mt-1'
            size='sm'
            onClick={() => onCheckboxBtnClick(3)}
            active={checkbox.includes(3)}
          >
            Pickup
          </Button>
          <Button
            color='primary'
            className='mr-2 mt-1'
            size='sm'
            onClick={() => onCheckboxBtnClick(4)}
            active={checkbox.includes(4)}
          >
            Curbside Pickup
          </Button>
          <Button
            color='primary'
            className='mr-2 mt-1'
            size='sm'
            onClick={() => onCheckboxBtnClick(5)}
            active={checkbox.includes(5)}
          >
            Delivery
          </Button>
          <Button
            color='secondary'
            className='ml-1 mt-1 font-weight-bold'
            size='sm'
            onClick={() => setMoreFilters(!moreFilters)}
          >
            More Filters
          </Button>
        </Row>
        {moreFiltersSection()}
      </Container>
    </div>
  );
};

AdvancedSearch.propTypes = {
  getFilteredRestaurant: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  restaurants: state.restaurants,
});

const mapFunctionsToProps = {
  getFilteredRestaurant,
};

export default connect(mapStateToProps, mapFunctionsToProps)(AdvancedSearch);
