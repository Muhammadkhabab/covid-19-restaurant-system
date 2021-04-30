import configureMockStore from 'redux-mock-store';
import * as actions from '../actions/auth';
import axios from 'axios';
import thunk from 'redux-thunk';
import { expect } from 'chai';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const API = 'api/v1';

jest.mock('axios');

describe('auth async actions', () => {

  it('loads user', () => {
    const mockedData = {
      data: {
        msg: 'User not found!',
      }
    }
    axios.get.mockImplementationOnce(() => Promise.resolve(mockedData));

    const expectedAction = [{"payload": {"msg": "User not found!"}, "type": "USER_LOADED"}];
    const store = mockStore({});

    return store.dispatch(actions.loadUser()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedAction);
    });
  });
})