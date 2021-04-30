import configureMockStore from 'redux-mock-store';
import * as actions from '../actions/auth';
import axios from 'axios';
import thunk from 'redux-thunk';
import { expect } from 'chai';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const API = 'api/v1';

jest.mock('axios');

const mockedData = {
  data: {
    msg: 'test',
  }
}

describe('auth async actions', () => {

  it('loads user', () => {

    axios.get.mockImplementationOnce(() => Promise.resolve(mockedData));

    const expectedAction = [{"payload": {"msg": "test"}, "type": "USER_LOADED"}];
    const store = mockStore({});

    return store.dispatch(actions.loadUser()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedAction);
    });
  });

  it('fails to load a user', () => {
    const error = {
        response: {
          data: {
            errors: [
              {param: "test", msg: "test"}
            ]
          }
        }
    }
    axios.get.mockImplementationOnce(() => Promise.reject(error));

    const expected = [{"type": "AUTH_ERROR"}];

    const store = mockStore({});
    return store.dispatch(actions.loadUser()).then(() => {
      expect(store.getActions()).to.deep.equal(expected)
    })
  })

  it('registers a user', () => {

    axios.post.mockImplementationOnce(() => Promise.resolve(mockedData));
    axios.get.mockImplementationOnce(() => Promise.resolve(mockedData));

    const expectedAction = [
      {"payload": undefined, "type": "REGISTER_SUCCESS"},
      {"payload": {"msg": "test"}, "type": "USER_LOADED"},
    ];
    const store = mockStore({});

    return store.dispatch(actions.register({usr: "test"})).then(() => {
      expect(store.getActions()).to.deep.equal(expectedAction);
    });
  });
})