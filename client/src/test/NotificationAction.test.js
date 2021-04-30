import configureMockStore from 'redux-mock-store';
import * as actions from '../actions/notification';
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

describe('notification async actions', () => {

  it('loads user', () => {

    axios.post.mockImplementationOnce(() => Promise.resolve(mockedData));

    const expectedAction = [];
    const store = mockStore({});

    return store.dispatch(actions.subscribeNotification({})).then(() => {
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
    axios.post.mockImplementationOnce(() => Promise.reject(error));

    const expected = [];

    const store = mockStore({});
    return store.dispatch(actions.subscribeNotification({})).then(() => {
      expect(store.getActions()).to.deep.equal(expected)
    });
  });
})