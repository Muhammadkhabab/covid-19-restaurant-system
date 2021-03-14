import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Input, Label, Card, CardTitle, Button, } from 'reactstrap';
import { toast } from 'react-toastify';
import '../../styles/Form.scss';

const Register =({ register, isAuthenticated }) => {

	// Set restaurant data
	const [restaurant, setRestaurant] = useState ({
		name: '',
		address: '',
		url: '',
		restaurant_email: '',
		restaurant_phone: '',
		cuisine: '',
		max_employees: '',
		max_customers: '',
		no_tables: '',
		customers_per_table: '',
		distance_tables: '',
		square_foot: '',
		policies: '',
		dine_in: false,
		dine_out: false,
		pickup: false,
		curbside: false,
		delivery: false,
	});

	const [user, setUser] = useState ({
		first_name: '',
		last_name: '',
		username: '',
		password: '',
		user_email: '',
		user_phone: '',
		manager: false,
		staff: false,
	});

	// Destructuring.
	const { first_name, last_name, username, password, user_email, user_phone, manager, staff } = user;

	const { name, address, url, restaurant_email, restaurant_phone, cuisine, max_employees, max_customers, 
			no_tables, customers_per_table, distance_tables, square_foot, policies,
			dine_in, dine_out, pickup, curbside, delivery } = restaurant;

	// Event listener for change in input fields in user field.
	const onUserChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

	// Event listener for change in input fields.
	const onRestaurantChange = (e) => setRestaurant({ ...restaurant, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		console.log("in here");
	};

    return (
		<>
			<h3 className='text-left text-info mb-4'>Register Your Restaurant!</h3>
            <Row>
                <Col sm={{size: 4}}>
                    <Card body>
						<CardTitle tag="h4">Account Information</CardTitle>
                        <Row>
                            <Col>
                                <Form onSubmit={onSubmit}>
                                    <FormGroup>
                                        <Label>First Name</Label>
                                        <Input
                                            type='text'
                                            name='first_name'
											value={first_name}
											onChange={onUserChange}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Last Name</Label>
                                        <Input
                                            type='text'
                                            name='last_name'
											value={last_name}
											onChange={onUserChange}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Restaurant Username</Label>
                                        <Input
                                            type='text'
                                            name='username'
											value={username}
											onChange={onUserChange}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Restaurant Password</Label>
                                        <Input
                                            type='text'
                                            name='password'
											value={password}
											onChange={onUserChange}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input
                                            type='text'
                                            name='user_email'
											value={user_email}
											onChange={onUserChange}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Phone Number</Label>
                                        <Input
                                            type='text'
                                            name='user_phone'
											value={user_phone}
											onChange={onUserChange}
                                            required
                                        />
                                    </FormGroup>
									<Row>
										<Col>
											<FormGroup check>
												<Label check>
													<Input type="checkbox" name='mananger' value={manager} onChange={onUserChange}/>{' '}
													Manager?
												</Label>
											</FormGroup>
										</Col>
										<Col>
											<FormGroup check>
												<Label check>
													<Input type="checkbox" name='staff' value={staff} onChange={onUserChange} />{' '}
													Staff?
												</Label>
											</FormGroup>
										</Col>		
									</Row>
                                </Form>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col sm={{size: 8, offset: 0.5}}>
                    <Card body>
						<CardTitle tag="h4">Restaurant Information</CardTitle>
                        <Row>
                            <Col>
                                <Form onSubmit={onSubmit}>
                                    <FormGroup>
                                        <Label>Restaurant Name</Label>
                                        <Input
                                            type='text'
                                            name='name'
											value={name}
											onChange={onRestaurantChange}
                                            required
                                        />
                                    </FormGroup>
								</Form>
							</Col>
							<Col>
								<Form onSubmit={onSubmit}>
									<FormGroup>
										<Label>Restaurant Address</Label>
										<Input
											type='text'
											name='address'
											value={address}
											onChange={onRestaurantChange}
											required
										/>
									</FormGroup>
								</Form>
							</Col>
                        </Row>
						<Row>
							<Col>
								<Form onSubmit={onSubmit}>
									<FormGroup>
										<Label>Website URL</Label>
                                        <Input
                                            type='text'
                                            name='url'
											value={url}
											onChange={onRestaurantChange}
                                        />
									</FormGroup>
								</Form>
							</Col>
							<Col>
								<Form onSubmit={onSubmit}>
									<FormGroup>
										<Label>Restaurant Email</Label>
                                        <Input
                                            type='text'
                                            name='restaurant_email'
											value={restaurant_email}
											onChange={onRestaurantChange}
                                            required
                                        />
									</FormGroup>
								</Form>
							</Col>
							<Col>
								<Form onSubmit={onSubmit}>
									<FormGroup>
										<Label>Restaurant Phone Number</Label>
                                        <Input
                                            type='text'
                                            name='restaurant_phone'
											value={restaurant_phone}
											onChange={onRestaurantChange}
                                            required
                                        />
									</FormGroup>
								</Form>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form onSubmit={onSubmit}>
									<FormGroup>
										<Label>Restaurant Cuisine</Label>
										<Input type="select" name='cuisine' value={cuisine} onChange={onRestaurantChange}>
											<option>Italian</option>
											<option>Indian</option>
											<option>Chinese</option>
											<option>American</option>
											<option>Mexican</option>
										</Input>
									</FormGroup>
								</Form>
							</Col>
							<Col>
								<Form onSubmit={onSubmit}>
									<FormGroup>
										<Label>Max Employees</Label>
										<Input
                                            type='text'
                                            name='max_employees'
											value={max_employees}
											onChange={onRestaurantChange}
                                            required
                                        />
									</FormGroup>
								</Form>
							</Col>
							<Col>
								<Form onSubmit={onSubmit}>
									<FormGroup>
										<Label>Max Customers</Label>
										<Input
                                            type='text'
                                            name='max_customers'
											value={max_customers}
											onChange={onRestaurantChange}
                                            required
                                        />
									</FormGroup>
								</Form>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form onSubmit={onSubmit}>
									<FormGroup>
										<Label># of Tables</Label>
										<Input
                                            type='text'
                                            name='no_tables'
											value={no_tables}
											onChange={onRestaurantChange}
                                            required
                                        />
									</FormGroup>
								</Form>
							</Col>
							<Col>
								<Form onSubmit={onSubmit}>
									<FormGroup>
										<Label>Customers per Tables</Label>
										<Input
                                            type='text'
                                            name='customers_per_table'
											value={customers_per_table}
											onChange={onRestaurantChange}
                                            required
                                        />
									</FormGroup>
								</Form>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form onSubmit={onSubmit}>
									<FormGroup>
										<Label>Distance Between Tables (ft)</Label>
										<Input
                                            type='text'
                                            name='distance_tables'
											value={distance_tables}
											onChange={onRestaurantChange}
                                            required
                                        />
									</FormGroup>
								</Form>
							</Col>
							<Col>
								<Form onSubmit={onSubmit}>
									<FormGroup>
										<Label>Common Room Square Footage</Label>
										<Input
                                            type='text'
                                            name='square_foot'
											value={square_foot}
											onChange={onRestaurantChange}
                                            required
                                        />
									</FormGroup>
								</Form>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form onSubmit={onSubmit}>
									<FormGroup>
										<Label for="exampleText">Restaurant Policies</Label>
										<Input type="textarea" name="policies" value={policies} onChange={onRestaurantChange}/>
									</FormGroup>
								</Form>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form onSubmit={onSubmit}>
									<FormGroup check>
										<Label check>
											<Input type="checkbox" name='dine_in' value={dine_in} onChange={onRestaurantChange}/>{' '}
											Dine-In?
										</Label>
									</FormGroup>
								</Form>
							</Col>
							<Col>
								<Form onSubmit={onSubmit}>
									<FormGroup check>
										<Label check>
											<Input type="checkbox" name='dine_out' value={dine_out} onChange={onRestaurantChange}/>{' '}
											Dine-Out?
										</Label>
									</FormGroup>
								</Form>
							</Col>
							<Col>
								<Form onSubmit={onSubmit}>
									<FormGroup check>
										<Label check>
											<Input type="checkbox" name='pickup' value={pickup} onChange={onRestaurantChange}/>{' '}
											Pickup?
										</Label>
									</FormGroup>
								</Form>
							</Col>
							<Col>
								<Form onSubmit={onSubmit}>
									<FormGroup check>
										<Label check>
											<Input type="checkbox" name='curbside' value={curbside} onChange={onRestaurantChange}/>{' '}
											Curbside?
										</Label>
									</FormGroup>
								</Form>
							</Col>
							<Col>
								<Form onSubmit={onSubmit}>
									<FormGroup check>
										<Label check>
											<Input type="checkbox" name='delivery' value={delivery} onChange={onRestaurantChange}/>{' '}
											Delivery?
										</Label>
									</FormGroup>
								</Form>
							</Col>
						</Row>
                    </Card>
                </Col>
            </Row>
			<Row>
				<Col>
					<Button 
						color="primary"
						className="float-right"
						type="submit" 
						value='Register'
					>
						Register
					</Button>
				</Col>
			</Row>
		</>
    );
};

Register.propTypes = {
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
  };
  
  const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
  });

export default connect(mapStateToProps, { register })(Register); 