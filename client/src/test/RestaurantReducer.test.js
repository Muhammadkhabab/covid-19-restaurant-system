import reducer from '../reducers/restaurant'
import * as types from '../constants/actions'

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
        {
            restaurants: null,
            restaurant: null,
            dashboardRestaurant: null,
            loadingRestaurant: true,
            chartData: null,
        }
        )
    })

    it('should handle EDIT_RESTAURANT', () => {
        expect(
        reducer([], {
        type: types.EDIT_RESTAURANT,
        })
    ).toEqual(
        {
        dashboardRestaurant: undefined,
        loadingRestaurant: false,
        }
    )
    })

    it('should handle SET_DASHBOARD_RESTAURANT', () => {
    expect(
        reducer([], {
        type: types.SET_DASHBOARD_RESTAURANT,
        })
    ).toEqual(
        {
        dashboardRestaurant: undefined,
        loadingRestaurant: false,
        }
    )
    })

    it('should handle SET_RESTAURANT', () => {
        expect(
            reducer([], {
            type: types.SET_RESTAURANT,
            })
        ).toEqual(
            {
            restaurant:undefined,
            loadingRestaurant:false,
            }
        )
        })

    it('should handle GET_RESTAURANT_DATA', () => {
        expect(
            reducer([], {
            type: types.GET_RESTAURANT_DATA,
            })
        ).toEqual(
            {
                chartData: undefined, 
                loadingRestaurant: false
            }
        )
        })
    
    it('should handle GET_ALL_RESTAURANTS', () => {
        expect(
            reducer([], {
            type: types.GET_ALL_RESTAURANTS,
            })
        ).toEqual(
            {
                restaurants: undefined, 
                loadingRestaurant: false 
            }
        )
        })
    
    it('should handle FILTER_RESTAURANTS', () => {
        expect(
            reducer([], {
            type: types.FILTER_RESTAURANT,
            })
        ).toEqual(
            {
                restaurants: undefined, 
                loadingRestaurant: false
            }
        )
        })

  })