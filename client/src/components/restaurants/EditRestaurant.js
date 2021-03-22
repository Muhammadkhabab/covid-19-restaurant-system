import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { editRestaurant, getMyRestaurant } from '../../actions/restaurant';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Card,
  CardTitle,
  Button,
  Container,
} from 'reactstrap';
import PropTypes from 'prop-types';
import {
  ROUTE_RESTAURANTS,
  ROUTE_DASHBOARD_RESTAURANT,
} from '../../constants/routes';

const EditRestaurant = ({
  auth: { user, loading, isAuthenticated },
  editRestaurant,
  getMyRestaurant,
  restaurantState: { loadingRestaurant, restaurant },
}) => {
  useEffect(() => {
    // Get restaurant data when admin or staff logs in
    if (!restaurant && !loading && user && user.is_admin) {
      getMyRestaurant();
    }

    // eslint-disable-next-line
  }, [user]);

  const INITIAL_DATA = {
    restaurant_name: '',
    address: '',
    website_url: '',
    restaurant_email: '',
    restaurant_phone_number: '',
    cuisine: '',
    employee_capacity: '',
    customer_capacity: '',
    number_tables: '',
    customer_per_table: '',
    tables_distance: '',
    square_footage: '',
    policy_notes: '',
    dine_in: 0,
    dine_outside: 0,
    pickup: 0,
    curbside_pickup: 0,
    delivery: 0,
  };

  // Set restaurant data
  const [restaurantObj, setRestaurant] = useState(INITIAL_DATA);

  useEffect(() => {
    if (!loadingRestaurant && restaurant) {
      console.log(restaurant);
      setRestaurant({
        restaurant_name: restaurant.restaurant_name,
        address: restaurant.address,
        website_url: restaurant.website_url,
        restaurant_email: restaurant.restaurant_email,
        restaurant_phone_number: restaurant.restaurant_phone_number,
        cuisine: restaurant.cuisine,
        employee_capacity: restaurant.employee_capacity,
        customer_capacity: restaurant.customer_capacity,
        number_tables: restaurant.number_tables,
        customer_per_table: restaurant.customer_per_table,
        tables_distance: restaurant.tables_distance,
        square_footage: restaurant.square_footage,
        policy_notes: restaurant.policy_notes,
        dine_in: restaurant.dine_in ? 1 : 0,
        dine_outside: restaurant.dine_outside ? 1 : 0,
        pickup: restaurant.pickup ? 1 : 0,
        curbside_pickup: restaurant.curbside_pickup ? 1 : 0,
        delivery: restaurant.delivery ? 1 : 0,
      });
    }

    // eslint-disable-next-line
  }, [restaurant]);

  const {
    restaurant_name,
    address,
    website_url,
    restaurant_email,
    restaurant_phone_number,
    cuisine,
    employee_capacity,
    customer_capacity,
    number_tables,
    customer_per_table,
    tables_distance,
    square_footage,
    policy_notes,
    dine_in,
    dine_outside,
    pickup,
    curbside_pickup,
    delivery,
  } = restaurantObj;

  // Event listener for change in input fields.
  const onRestaurantChange = (e) =>
    setRestaurant({ ...restaurantObj, [e.target.name]: e.target.value });

  // Event listener for change to checkboxes
  const onCheckboxChange = (e) =>
    setRestaurant({ ...restaurantObj, [e.target.name]: 1 - e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(restaurantObj);
    editRestaurant(restaurantObj);
  };

  if (isAuthenticated && user && !loading) {
    // Check if user is not a resaurant admin
    if (!user.is_admin) {
      return <Redirect to={ROUTE_RESTAURANTS} />;
    }
  }

  return (
    <Container className='my-4'>
      <Link className='go-back-link' to={ROUTE_DASHBOARD_RESTAURANT}>
        <i className='fas fa-long-arrow-alt-left mr-3' />
        Return to restaurant dashboard
      </Link>
      <h3 className='text-center text-info mb-4'>
        Edit restaurant information!
      </h3>
      <Form onSubmit={onSubmit}>
        <Row>
          <Col sm='12'>
            <Card body>
              <CardTitle tag='h4'>Restaurant Information</CardTitle>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>Restaurant Name</Label>
                    <Input
                      type='text'
                      name='restaurant_name'
                      value={restaurant_name}
                      onChange={onRestaurantChange}
                      // required
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Restaurant Address</Label>
                    <Input
                      type='text'
                      name='address'
                      value={address}
                      onChange={onRestaurantChange}
                      // required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>Website URL</Label>
                    <Input
                      type='url'
                      name='website_url'
                      value={website_url}
                      onChange={onRestaurantChange}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Restaurant Email</Label>
                    <Input
                      type='email'
                      name='restaurant_email'
                      value={restaurant_email}
                      onChange={onRestaurantChange}
                      // required
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Restaurant Phone Number</Label>
                    <Input
                      type='tel'
                      pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                      name='restaurant_phone_number'
                      value={restaurant_phone_number}
                      placeholder='xxx-xxx-xxxx'
                      onChange={onRestaurantChange}
                      // required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  {/* <FormGroup>
                    <Label>Restaurant Cuisine</Label>
                    <Input
                      type='select'
                      name='cuisine'
                      onChange={onRestaurantChange}
                    >
                      <option disabled selected>
                        {' '}
                        Select a Cuisine
                      </option>
                      <option>Italian</option>
                      <option>Indian</option>
                      <option>Chinese</option>
                      <option>American</option>
                      <option>Mexican</option>
                    </Input>
                  </FormGroup> */}
                  <FormGroup>
                    <Label>Restaurant Cuisine</Label>
                    <Input
                      type='text'
                      name='cuisine'
                      value={cuisine}
                      onChange={onRestaurantChange}
                      // required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>Max Employees</Label>
                    <Input
                      type='text'
                      name='employee_capacity'
                      value={employee_capacity}
                      onChange={onRestaurantChange}
                      // required
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Max Customers</Label>
                    <Input
                      type='text'
                      name='customer_capacity'
                      value={customer_capacity}
                      onChange={onRestaurantChange}
                      // required
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label># of Tables</Label>
                    <Input
                      type='text'
                      name='number_tables'
                      value={number_tables}
                      onChange={onRestaurantChange}
                      // required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>Customers per Tables</Label>
                    <Input
                      type='text'
                      name='customer_per_table'
                      value={customer_per_table}
                      onChange={onRestaurantChange}
                      // required
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Distance Between Tables (ft)</Label>
                    <Input
                      type='text'
                      name='tables_distance'
                      value={tables_distance}
                      onChange={onRestaurantChange}
                      // required
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Common Room Square Footage</Label>
                    <Input
                      type='text'
                      name='square_footage'
                      value={square_footage}
                      onChange={onRestaurantChange}
                      // required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>Restaurant Policies</Label>
                    <Input
                      type='textarea'
                      name='policy_notes'
                      value={policy_notes}
                      onChange={onRestaurantChange}
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
                        checked={dine_in === 1}
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
                        checked={dine_outside === 1}
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
                        checked={pickup === 1}
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
                        checked={curbside_pickup === 1}
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
                        checked={delivery === 1}
                        onChange={onCheckboxChange}
                      />{' '}
                      Delivery?
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button color='danger' block className='my-4' type='submit'>
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

EditRestaurant.propTypes = {
  auth: PropTypes.object.isRequired,
  getMyRestaurant: PropTypes.func.isRequired,
  editRestaurant: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  restaurantState: state.restaurant,
});

const mapFunctionsToProps = {
  getMyRestaurant,
  editRestaurant,
};

export default connect(mapStateToProps, mapFunctionsToProps)(EditRestaurant);
