import configureMockStore from 'redux-mock-store';
import * as actions from '../actions/auth';
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

describe('auth async actions', () => {

  it('loads user', () => {

    axios.get.mockImplementationOnce(() => Promise.resolve(mockedData));

    const expectedAction = [{ "payload": { "msg": "test" }, "type": "USER_LOADED" }];
    const store = mockStore({});

    return store.dispatch(actions.loadUser()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedAction);
    });
  });

  it('handles user loading errors', () => {
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

    const expected = [{ "type": "AUTH_ERROR" }];

    const store = mockStore({});
    return store.dispatch(actions.loadUser()).then(() => {
      expect(store.getActions()).to.deep.equal(expected)
    });
  });

  it('registers a user', () => {

    axios.post.mockImplementationOnce(() => Promise.resolve(mockedData));
    axios.get.mockImplementationOnce(() => Promise.resolve(mockedData));

    const expectedAction = [
      { "payload": undefined, "type": "REGISTER_SUCCESS" },
      { "payload": { "msg": "test" }, "type": "USER_LOADED" },
    ];
    const store = mockStore({});

    return store.dispatch(actions.register({ usr: "test" })).then(() => {
      expect(store.getActions()).to.deep.equal(expectedAction);
    });
  });

  it('handles registration errors', () => {
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
    return store.dispatch(actions.register({})).then(() => {
      expect(store.getActions()).to.deep.equal(expected)
    });
  });

  it('allows login', () => {
    axios.post.mockImplementationOnce(() => Promise.resolve(mockedData));
    axios.get.mockImplementationOnce(() => Promise.resolve(mockedData));

    const expectedAction = [
      { "payload": undefined, "type": "LOGIN_SUCCESS" },
      { "payload": { "msg": "test" }, "type": "USER_LOADED" },
    ];
    const store = mockStore({});

    return store.dispatch(actions.login({})).then(() => {
      expect(store.getActions()).to.deep.equal(expectedAction);
    });
  });

  it('handles login errors', () => {
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

    const expected = [{ "type": "LOGIN_FAIL" }];

    const store = mockStore({});
    return store.dispatch(actions.login({})).then(() => {
      expect(store.getActions()).to.deep.equal(expected)
    });
  });

  it('allows user updates', () => {
    axios.put.mockImplementationOnce(() => Promise.resolve(mockedData));

    const expectedAction = [
      { "payload": {"msg": "test"}, "type": "UPDATE_SUCCESS" },
    ];
    const store = mockStore({});

    return store.dispatch(actions.updateUser({})).then(() => {
      expect(store.getActions()).to.deep.equal(expectedAction);
    });
  });

  it('handles user update errors', () => {
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
    return store.dispatch(actions.updateUser({})).then(() => {
      expect(store.getActions()).to.deep.equal(expected)
    });
  });
})