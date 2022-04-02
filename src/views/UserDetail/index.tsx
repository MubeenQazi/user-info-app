import * as React from 'react';

import UserForm from '@components/UserForm';
import './_user-details.scss';

const UserDetail=() => {
  return (
    <React.Fragment>
      <div className='container'>
        <UserForm />
      </div>
    </React.Fragment>
  );
};

export default UserDetail;
