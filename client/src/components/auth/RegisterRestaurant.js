import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { registerRestaurant } from '../../actions/restaurant';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Input, Label, Card, CardTitle, Button, Container} from 'reactstrap';
// import '../../styles/Form.scss';
import {
  ROUTE_LOGIN,
  ROUTE_REGISTER_RESTAURANT,
	ROUTE_DASHBOARD_USER,
	ROUTE_DASHBOARD_RESTAURANT
} from '../../constants/routes';

const RegisterRestaurant = ({ registerRestaurant, auth: { isAuthenticated, user } }) => {

	// Set restaurant data
	const [restaurant, setRestaurant] = useState({
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
	});

	const [userObj, setUser] = useState({
		first_name: '',
		last_name: '',
		username: '',
		password: '',
		confirmed_password: '',
		email: '',
		phone_number: '',
	});

	// Destructuring.
	const { first_name, last_name, username, password, confirmed_password, email, phone_number } = userObj;
	const { restaurant_name, address, website_url, restaurant_email, restaurant_phone_number, cuisine, employee_capacity, customer_capacity,
		number_tables, customer_per_table, tables_distance, square_footage, policy_notes,
		dine_in, dine_outside, pickup, curbside_pickup, delivery } = restaurant;

	// Event listener for change in input fields in user field.
	const onUserChange = (e) => setUser({ ...userObj, [e.target.name]: e.target.value });

	// Event listener for change in input fields.
	const onRestaurantChange = (e) => setRestaurant({ ...restaurant, [e.target.name]: e.target.value });

	// Event listener for change to checkboxes
	const onCheckboxChange = (e) => setRestaurant({ ...restaurant, [e.target.name]: 1 - e.target.value })

	const onSubmit = (e) => {
		e.preventDefault();
		registerRestaurant(userObj, restaurant);
	};

	// Redirect if registered.
	if (isAuthenticated) {
		if (user && (user.is_admin || user.is_staff)) {
			return <Redirect to={ROUTE_DASHBOARD_RESTAURANT} />;
		} else {
			return <Redirect to={ROUTE_DASHBOARD_USER} />;
		}
	}

	return (
		<Container className='my-4'>
			<h3 className='text-left text-info mb-4'>Register Your Restaurant!</h3>
			<Form onSubmit={onSubmit}>
				<Row>
					<Col sm={{ size: 4 }}>
						<Card body>
							<CardTitle tag='h4'>Account Information</CardTitle>
							<Row>
								<Col>
									<FormGroup>
										<Label>First Name</Label>
										<Input
											type='text'
											name='first_name'
											value={first_name}
											onChange={onUserChange}
										// required
										/>
									</FormGroup>
									<FormGroup>
										<Label>Last Name</Label>
										<Input
											type='text'
											name='last_name'
											value={last_name}
											onChange={onUserChange}
										// required
										/>
									</FormGroup>
									<FormGroup>
										<Label>Restaurant Username</Label>
										<Input
											type='text'
											name='username'
											value={username}
											onChange={onUserChange}
										// required
										/>
									</FormGroup>
									<FormGroup>
										<Label>Restaurant Password</Label>
										<Input
											type='password'
											name='password'
											value={password}
											onChange={onUserChange}
										// required
										/>
									</FormGroup>
									<FormGroup>
										<Label>Confirm Password</Label>
										<Input
											type='password'
											name='confirmed_password'
											value={confirmed_password}
											onChange={onUserChange}
										// required
										/>
									</FormGroup>
									<FormGroup>
										<Label>Email</Label>
										<Input
											type='email'
											name='email'
											value={email}
											onChange={onUserChange}
										// required
										/>
									</FormGroup>
									<FormGroup>
										<Label>Phone Number</Label>
										<Input
											type='tel'
											pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
											name='phone_number'
											value={phone_number}
											placeholder='xxx-xxx-xxxx'
											onChange={onUserChange}
										// required
										/>
									</FormGroup>
								</Col>
							</Row>
						</Card>
					</Col>
					<Col sm={{ size: 8, offset: 0.5 }}>
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
									<FormGroup>
										<Label>Restaurant Cuisine</Label>
										<Input type='select' name='cuisine' onChange={onRestaurantChange}>
											<option disabled selected> Select a Cuisine</option>
											<option>Italian</option>
											<option>Indian</option>
											<option>Chinese</option>
											<option>American</option>
											<option>Mexican</option>
										</Input>
									</FormGroup>
								</Col>
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
							</Row>
							<Row>
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
							</Row>
							<Row>
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
										<Input type='textarea' name='policy_notes' value={policy_notes} onChange={onRestaurantChange} />
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col>
									<FormGroup check>
										<Label check>
											<Input type='checkbox' name='dine_in' value={dine_in} onChange={onCheckboxChange} />{' '}
											Dine-In?
										</Label>
									</FormGroup>
								</Col>
								<Col>
									<FormGroup check>
										<Label check>
											<Input type='checkbox' name='dine_outside' value={dine_outside} onChange={onCheckboxChange} />{' '}
											Dine-Out?
										</Label>
									</FormGroup>
								</Col>
								<Col>
									<FormGroup check>
										<Label check>
											<Input type='checkbox' name='pickup' value={pickup} onChange={onCheckboxChange} />{' '}
											Pickup?
										</Label>
									</FormGroup>
								</Col>
								<Col>
									<FormGroup check>
										<Label check>
											<Input type='checkbox' name='curbside_pickup' value={curbside_pickup} onChange={onCheckboxChange} />{' '}
											Curbside?
										</Label>
									</FormGroup>
								</Col>
								<Col>
									<FormGroup check>
										<Label check>
											<Input type='checkbox' name='delivery' value={delivery} onChange={onCheckboxChange} />{' '}
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
						<Button
							color='primary'
							className='float-right'
							type='submit'
							value='Register'
						>
							Register
					</Button>
					</Col>
				</Row>
			</Form>
		</Container>
	);
};

RegisterRestaurant.propTypes = {
	registerRestaurant: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

const mapFunctionsToProps = {
	registerRestaurant,
};

export default connect(mapStateToProps, mapFunctionsToProps)(RegisterRestaurant);