import {createContext} from 'react';

export const initialState = {
  isLoggedIn: false,
  token: undefined,
  user: {
    isSubscribedBuy: false,
    isSubscribedRent: false,
    savedflipbook: [],
    role: undefined,
    isActive: false,
    isSelect: false,
    _id: undefined,
    firstname: undefined,
    lastname: undefined,
    email: undefined,
  },
};

export const UserContext = createContext({
  payload: initialState,
  setPayload: (payload) => {},
  logout: () => {},
});
