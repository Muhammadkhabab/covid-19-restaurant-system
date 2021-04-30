import { render, screen,fireEvent, getByDisplayValue } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { filter } from 'async';
// import { expect } from 'chai';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getFilteredRestaurant } from '../actions/restaurant';
import AdvancedSearch from '../components/restaurants/AdvancedSearch';

const mockStore = configureStore([thunk]);

const searchStore = mockStore({
    restaurants: { 
        restaurant: {
          address: "1234 State St.",
          avatar: "https://cdn3.vectorstock.com/i/1000x1000/73/07/cooking-and-restaurant-logo-design-vector-29707307.jpg",
          cuisine: "American",
          curbside_pickup: false,
          current_customers: 12,
          current_employees: 6,
          current_free_tables: 7,
          current_percent_capacity: 0.45,
          customer_capacity: 30,
          customer_per_table: 2,
          delivery: true,
          dine_in: true,
          dine_outside: false,
          employee_capacity: 10,
          number_tables: 15,
          pickup: true,
          policy_notes: "Food Planet aims to bring a safe and eco-friendly experience to the customers. To protect yourself and others, please wear mask when coming into the store ,and   ordering food. Limit touching unnecessary surface to avoid exposure to potential COVID-19 virus. Keep decent distance from other customers. We hope you have a ,wonderful  experiene here at Food Planet.",
          restaurant_email: "food.planet@gmail.com",
          restaurant_name: "Food Planet",
          restaurant_phone_number: "908-187-2626",
          reviewed: false,
          square_footage: 450,
          tables_distance: 5,
          website_url: "https://foodandplanet.org/",
          __v: 0,
          _id: "608633a674e2d24b57226f36",
        }},
    getFilteredRestaurant,
    
})

const searchBar = () => {
    const utils = render(<BrowserRouter>
        <Provider store={searchStore}>
          <AdvancedSearch></AdvancedSearch>
        </Provider></BrowserRouter>);
    const input = utils.getByPlaceholderText('Search for restaurant')
    return{input,...utils}
}

const filterButtons = () => {
    const utils = render(<BrowserRouter>
        <Provider store={searchStore}>
          <AdvancedSearch></AdvancedSearch>
        </Provider></BrowserRouter>);
    
    return utils
}

describe('Restaurant Component', () => {
    it('should be redered without crashing', () => {
      render(
          <BrowserRouter>
        <Provider store={searchStore}>
          <AdvancedSearch></AdvancedSearch>
        </Provider></BrowserRouter>
      );
    });

    it('search for restaurant',() => {
        const {input} = searchBar()
        fireEvent.change(input, { target: { value: 'At' } })
        expect(input.value).toBe('At')
    })

    it('click the dine inside button', () =>{
        render(<BrowserRouter>
            <Provider store={searchStore}>
              <AdvancedSearch></AdvancedSearch>
            </Provider></BrowserRouter>);
        
        const input = screen.getByTestId('dine-inside')
        userEvent.click(input)
    })
    it('click the dine outside button', () =>{
        render(<BrowserRouter>
            <Provider store={searchStore}>
              <AdvancedSearch></AdvancedSearch>
            </Provider></BrowserRouter>);
        
        const input = screen.getByTestId('dine-outside')
        userEvent.click(input)
    })
    it('click the pickup button', () =>{
        render(<BrowserRouter>
            <Provider store={searchStore}>
              <AdvancedSearch></AdvancedSearch>
            </Provider></BrowserRouter>);
        
        const input = screen.getByTestId('pickup')
        userEvent.click(input)
    })
    it('click the curbside pickup button', () =>{
        render(<BrowserRouter>
            <Provider store={searchStore}>
              <AdvancedSearch></AdvancedSearch>
            </Provider></BrowserRouter>);
        
        const input = screen.getByTestId('curbside-pickup')
        userEvent.click(input)
    })
    it('click the delivery button', () =>{
        render(<BrowserRouter>
            <Provider store={searchStore}>
              <AdvancedSearch></AdvancedSearch>
            </Provider></BrowserRouter>);
        
        const input = screen.getByTestId('delivery')
        userEvent.click(input)
    })


    it('click the search button', () =>{
        const util = render(<BrowserRouter>
            <Provider store={searchStore}>
              <AdvancedSearch></AdvancedSearch>
            </Provider></BrowserRouter>);
        
        
        const input = util.getByTestId('search-button')
        userEvent.click(input)
        

    })
  
    it('click advanced filter',() => {
        const util = render(<BrowserRouter>
        <Provider store={searchStore}>
            <AdvancedSearch></AdvancedSearch>
        </Provider></BrowserRouter>)
        const input = util.getByTestId('more-filters')
        userEvent.click(input)
        

        expect(screen.getByTestId('advanced-filter')).toBeInTheDocument()
    })

    it('change percent capacity values',() => {
        const util = render(<BrowserRouter>
        <Provider store={searchStore}>
            <AdvancedSearch></AdvancedSearch>
        </Provider></BrowserRouter>)
        userEvent.click(util.getByTestId('more-filters'))
        const compare = util.getAllByRole('slider')

        expect(screen.getAllByRole('slider')).toEqual(compare)
    })
  });
