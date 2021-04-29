import reducer from '../reducers/auth'
import * as types from '../constants/actions'

describe('auth reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(
        {
            token: localStorage.getItem('token'),
            isAuthenticated: null,
            user: null,
            loading: true,

        }
      )
    })
  
    it('should handle USER_LOADED', () => {
      expect(
        reducer([], {
          type: types.USER_LOADED,
        })
      ).toEqual(
        {
            isAuthenticated:true,
            loading:false,
            user:undefined,

        }
      )
    })

    it('should handle REGISTER_SUCCESS', () => {
        expect(
          reducer([], {
            type: types.REGISTER_SUCCESS,
          })
        ).toEqual(
          {
              isAuthenticated:true,
              loading:true,
  
          }
        )
      })

      it('should handle LOGIN_SUCCESS', () => {
        expect(
          reducer([], {
            type: types.LOGIN_SUCCESS,
          })
        ).toEqual(
          {
              isAuthenticated:true,
              loading:true,
  
          }
        )
      })

      it('should handle UPDATE_SUCCESS', () => {
        expect(
          reducer([], {
            type: types.UPDATE_SUCCESS,
          })
        ).toEqual(
          {
              user: undefined,
          }
        )
      })

      it('should handle UPDATE_FAIL', () => {
        expect(
          reducer([], {
            type: types.UPDATE_FAIL,
          })
        ).toEqual(
          {
              loading:false,
          }
        )
      })

      it('should handle REGISTER_FAIL', () => {
        expect(
          reducer([], {
            type: types.REGISTER_FAIL,
          })
        ).toEqual(
          {
              token:null,
              isAuthenticated:false,
              loading:false,
              user:null,
          }
        )
      })
  })