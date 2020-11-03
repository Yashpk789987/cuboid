import {createContext} from 'react';

export const initialState = {
  isLoggedIn: false,
  token: undefined,
  user: {
    __v: 0,
    _id: '',
    createdAt: '',
    email: '',
    firstname: '',
    isActive: true,
    isSelect: false,
    isSubscribedBuy: false,
    isSubscribedRent: false,
    lastname: '',
    role: '',
    savedflipbook: [],
    imagepath: undefined,
    mobilenumber: undefined,
  },
};

export const UserContext = createContext({
  payload: initialState,
  setPayload: (payload) => {},
  logout: () => {},
});
