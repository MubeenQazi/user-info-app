import * as React from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog } from '@progress/kendo-react-dialogs';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Observer } from 'mobx-react';

import { useUserStore } from '@src/ContextProvider/userContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from '../../utils'
import FormInput from '../FormInput';
import './AddUserModal.scss';


interface IFormInputs {
  firstName: string;
  lastName: string;
  username: string;
  isEnabled: boolean;
}


const AddUserModal=({ visible, toggleDialog }: any) => {

  const userStore=useUserStore();

  const validationOpt={
    resolver: yupResolver(formSchema),
  };
  const methods=useForm<IFormInputs>(validationOpt);
  const {
    handleSubmit,
    formState: { errors },
  }=methods

  const onSubmit=(data: any) => {

    let userObj={
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: data.firstName+data.lastName,
      isEnabled: false,
      lastLogin: '11/15/2020',
    };

    userStore?.addUser(userObj)
      .then(() => {
        toast.success('Added Successfully')
        userStore.getUsers();
      })
      .catch(() => toast.error('Something went wrong'))

    toggleDialog();
  };

  return (
    <Observer>
      { () => {
        return (
          <div className='modal-container'>
            { visible&&(
              <Dialog
                width={ 500 }
                title={ 'Add User' }
                onClose={ toggleDialog }
                className="modal-container_dialog"
              >
                <FormProvider { ...methods } >
                  <form onSubmit={ handleSubmit(onSubmit) } className={ 'user-details' }>
                    <h2 className='text-primary'>User Details</h2>

                    <FormInput name="firstName" label='First name' />
                    { errors?.firstName&&(
                      <span>
                        <small>{ errors.firstName.message }</small>
                      </span>
                    ) }

                    <FormInput
                      label='Last name'
                      inputType='text'
                      name='lastName'
                    />
                    { errors?.lastName&&(
                      <span>
                        <small>{ errors.lastName.message }</small>
                      </span>
                    ) }

                    <FormInput
                      name="username"
                      label="User Name"
                    />
                    { errors?.username&&(
                      <span>
                        <small>{ errors.username.message }</small>
                      </span>
                    ) }


                    <br />
                    <br />
                    <Button className='modal-btn' type='submit' themeColor={ 'primary' }>
                      { 'Add' }
                    </Button>
                  </form>
                </FormProvider>
              </Dialog>
            ) }
          </div>
        );
      } }
    </Observer>
  );
};

export default AddUserModal;
