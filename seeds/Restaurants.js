const faker = require("faker")
const Restaurant = require('../models/Restaurant')

const generateBoolean = () =>{
	return Math.random() < 0.5;
}

const generateNumber = () =>{
	return Math.floor((Math.random() * 100) + 1);
}

const generateSquareFt = () =>{
	return Math.floor((Math.random() * 2000) + 100); 
}

const generateCustPerTable = () =>{
	return Math.floor((Math.random() * 5) + 1); 
}

const generateTablesDistance= () =>{
	return Math.floor((Math.random() * 20) + 1); 
}

const createRestaurant = async ()=>{
	console.log("Creating Restaurants ...");

	const restaurant= new Restaurant({
		restaurant_name: faker.company.companyName(),
		address: faker.address.streetAddress(),
		restaurant_email: faker.internet.email(),
		restaurant_phone_number: faker.phone.phoneNumber(),
		website_url:faker.internet.url(),
		dine_in: generateBoolean(),
		dine_outside:generateBoolean(),
		pickup:generateBoolean(),
		curbside_pickup:generateBoolean(),
		delivery:generateBoolean(),
		policy_notes: faker.lorem.sentence(),
		employee_capacity: generateNumber(),
		customer_capacity: generateNumber(),
		number_tables:generateNumber(),
		square_footage: generateSquareFt(),
		customer_per_table: generateCustPerTable(),
		tables_distance:generateTablesDistance(),
	});

	await restaurant.save();
	console.log("Created a restaurant");
}


module.exports={
	createRestaurants: async(num)=>{
		for(let i=0;i<num;i++){
			await createRestaurant();
		}
	}
}



