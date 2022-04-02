import * as React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import UserList from '@views/UserList';
import UserForm from "@views/UserDetail"
import 'react-toastify/dist/ReactToastify.css';
import "./index.scss"

const App=() => {
  return (
    <React.Fragment>
      <ToastContainer
        position='top-right'
        autoClose={ 3000 }
        hideProgressBar={ true }
        newestOnTop={ false }
        closeOnClick
        rtl={ false }
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <UserList /> } />
          <Route path='/users/:id' element={ <UserForm /> } />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
