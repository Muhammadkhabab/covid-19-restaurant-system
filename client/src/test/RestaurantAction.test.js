import configureMockStore from 'redux-mock-store';
import * as actions from '../actions/restaurant';
import axios from 'axios';
import thunk from 'redux-thunk';
import { expect } from 'chai';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('axios');

const mockedData = {
  data: {
    msg: 'test',
  }
}

describe('restaurant async actions', () => {

  it('registers a restaurant', () => {

    axios.post.mockImplementationOnce(() => Promise.resolve(mockedData));
    axios.get.mockImplementationOnce(() => Promise.resolve(mockedData));

    const expectedAction = [
      {"payload": undefined, "type": "REGISTER_SUCCESS"}, 
      {"payload": undefined, "type": "REGISTER_RESTAURANT"}, 
      {"payload": {"msg": "test"}, "type": "USER_LOADED"}
    ];
    const store = mockStore({});

    return store.dispatch(actions.registerRestaurant()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedAction);
    });
  });

  it('handles restaurant registration errors', () => {
    const error = {
      response: {
        data: {
          errors: [
            { param: "test", msg: "test" }
          ]
        }
      }
    }
    axios.post.mockImplementationOnce(() => Promise.reject(error));

    const expected = [{ "type": "REGISTER_FAIL" }];

    const store = mockStore({});
    return store.dispatch(actions.registerRestaurant()).then(() => {
      expect(store.getActions()).to.deep.equal(expected)
    });
  });

  it('edits a restaurant', () => {

    axios.put.mockImplementationOnce(() => Promise.resolve(mockedData));

    const expectedAction = [
      {"payload": {"msg": "test"}, "type": "EDIT_RESTAURANT"}
    ];
    const store = mockStore({});

    return store.dispatch(actions.editRestaurant()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedAction);
    });
  });

  it('handles restaurant edit errors', () => {
    const error = {
      response: {
        data: {
          errors: [
            { param: "test", msg: "test" }
          ]
        }
      }
    }
    axios.put.mockImplementationOnce(() => Promise.reject(error));

    const expected = [];

    const store = mockStore({});
    return store.dispatch(actions.editRestaurant()).then(() => {
      expect(store.getActions()).to.deep.equal(expected)
    });
  });

  it('updates a restaurant\'s stats', () => {

    axios.put.mockImplementationOnce(() => Promise.resolve(mockedData));

    const expectedAction = [
      {"payload": {"msg": "test"}, "type": "EDIT_RESTAURANT"}
    ];
    const store = mockStore({});

    return store.dispatch(actions.updateStatsRestaurant()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedAction);
    });
  });

  it('handles stat update errors', () => {
    const error = {
      response: {
        data: {
          errors: [
            { param: "test", msg: "test" }
          ]
        }
      }
    }
    axios.put.mockImplementationOnce(() => Promise.reject(error));

    const expected = [];

    const store = mockStore({});
    return store.dispatch(actions.updateStatsRestaurant()).then(() => {
      expect(store.getActions()).to.deep.equal(expected)
    });
  });

  it('gets a restaurant by id', () => {

    axios.get.mockImplementationOnce(() => Promise.resolve(mockedData));

    const expectedAction = [
      {"payload": {"msg": "test"}, "type": "SET_RESTAURANT"}
    ];
    const store = mockStore({});

    return store.dispatch(actions.getRestaurantById()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedAction);
    });
  });

  it('handles errors when getting restaurant data', () => {
    const error = {
      response: {
        data: {
          errors: [
            { param: "test", msg: "test" }
          ]
        }
      }
    }
    axios.get.mockImplementationOnce(() => Promise.reject(error));

    const expected = [];

    const store = mockStore({});
    return store.dispatch(actions.getRestaurantById()).then(() => {
      expect(store.getActions()).to.deep.equal(expected)
    });
  });

  it('gets all restaurants', () => {

    axios.get.mockImplementationOnce(() => Promise.resolve(mockedData));

    const expectedAction = [
      {"payload": undefined, "type": "GET_ALL_RESTAURANTS"}
    ];
    const store = mockStore({});

    return store.dispatch(actions.getAllRestaurants()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedAction);
    });
  });

  it('handles errors when getting restaurant data', () => {
    const error = {
      response: {
        data: {
          errors: [
            { param: "test", msg: "test" }
          ]
        }
      }
    }
    axios.get.mockImplementationOnce(() => Promise.reject(error));

    const expected = [];

    const store = mockStore({});
    return store.dispatch(actions.getAllRestaurants()).then(() => {
      expect(store.getActions()).to.deep.equal(expected)
    });
  });

  it('gets user\'s restaurant', () => {

    axios.get.mockImplementationOnce(() => Promise.resolve(mockedData));

    const expectedAction = [
      {"payload": {"msg": "test"}, "type": "SET_DASHBOARD_RESTAURANT"}
    ];
    const store = mockStore({});

    return store.dispatch(actions.getMyRestaurant()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedAction);
    });
  });

  it('handles errors when getting user\'s restaurant', () => {
    const error = {
      response: {
        data: {
          errors: [
            { param: "test", msg: "test" }
          ]
        }
      }
    }
    axios.get.mockImplementationOnce(() => Promise.reject(error));

    const expected = [];

    const store = mockStore({});
    return store.dispatch(actions.getMyRestaurant()).then(() => {
      expect(store.getActions()).to.deep.equal(expected)
    });
  });

  it('gets chart info', () => {

    axios.get.mockImplementationOnce(() => Promise.resolve(mockedData));

    const expectedAction = [
      {"payload": {"msg": "test"}, "type": "GET_RESTAURANT_DATA"}
    ];
    const store = mockStore({});

    return store.dispatch(actions.getRestaurantData()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedAction);
    });
  });

  it('handles errors when getting chart info', () => {
    const error = {
      response: {
        data: {
          errors: [
            { param: "test", msg: "test" }
          ]
        }
      }
    }
    axios.get.mockImplementationOnce(() => Promise.reject(error));

    const expected = [];

    const store = mockStore({});
    return store.dispatch(actions.getRestaurantData()).then(() => {
      expect(store.getActions()).to.deep.equal(expected)
    });
  });
});