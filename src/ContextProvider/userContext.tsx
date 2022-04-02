import { createContext, useContext } from 'react';
import { createUserStore } from '../Store/Store'; // import store\

import { useLocalObservable } from 'mobx-react';
import React from 'react';
// creating user Context
const UserContext=createContext(null);

// Providing store to app
export const UserProvider=({ children }: any) => {
  // create store

  const userStore=useLocalObservable(createUserStore);
  // Provider component that will pass down the data to all the children components.
  return (
    <UserContext.Provider value={ userStore }>{ children }</UserContext.Provider>
  );
};
// useUserStore  function is used to return the current value of the context created using createContext()
// This function will be used further for getting the current values of the store.
// consume state
export const useUserStore=() => useContext(UserContext);
