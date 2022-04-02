import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FormProvider,
  Controller,
  useForm,
} from 'react-hook-form';

import { useUserStore } from '@src/ContextProvider/userContext';
import { Checkbox } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from '../../utils'
import FormInput from '../FormInput'
import './_userForm.scss';


interface IFormInputs {
  firstName: string;
  lastName: string;
  username: string;
  isEnabled: boolean;
}

const UserForm=() => {
  const [ user, setUser ]=useState()
  const userStore=useUserStore();
  const { id }=useParams();

  const validationOpt={
    resolver: yupResolver(formSchema),
  };

  const methods=useForm<IFormInputs>(validationOpt);

  const {
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  }=methods

  const onSubmit: any=(data: IFormInputs) => {
    const { firstName, lastName }=data;
    const { fullName, lastLogin }: any=user

    if ((firstName+' '+lastName).length>40) {
      toast.error('Only 40 characters are allowed for full name');
      return false;
    }

    const payload={
      ...data,
      fullName,
      lastLogin
    }

    userStore.updateUser(id, payload)
      .then(() => toast.success('Updated Successfully'))
      .catch(() => toast.error('Something went wrong'))
  };


  useEffect(() => {
    setTimeout(() => {
      userStore?.getUser(id).then(({ data }: any) => {
        const { firstName, lastName, username, isEnabled }=data;

        setValue("isEnabled", isEnabled)
        setValue("firstName", firstName)
        setValue("lastName", lastName)
        setValue("username", username)

        setUser(data)
      })
        .catch((e: any) => toast.error('Something Went Wrong'));
    }, 3000);
  }, []);



  return (
    <React.Fragment>
      <div className='form-bg'>
        {
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

              <Controller
                name='isEnabled'
                control={ control }
                defaultValue={ false }
                render={ ({ field }: any) => (
                  <Checkbox
                    label={ field?.value? 'Enabled':'Disabled' }
                    { ...field }
                    checked={ field?.value }
                  />
                ) }
              />
              <br />
              <br />
              <Button type='submit' themeColor={ 'primary' }>
                { 'Edit' }
              </Button>
            </form>
          </FormProvider>
        }
      </div>
    </React.Fragment>
  );
};

export default UserForm;
