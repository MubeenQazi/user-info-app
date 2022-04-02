import * as Yup from 'yup';

export const formSchema=Yup.object().shape({
    firstName: Yup.string()
      .max(25, 'Please enter characters less then 25')
      .required('First Name is Required')
      .matches(/^[A-Za-z]+$/i, 'Only Alphabets are allowed'),
    lastName: Yup.string()
      .required('Last Name Is Required')
      .max(25, 'Please enter characters less then 25')
      .matches(/^[A-Za-z]+$/i, 'Only Alphabets are allowed'),
    username: Yup.string()
      .required('Username is Required')
      .max(15, 'User name cannot exceed 15 characters')
      .matches(/^[A-Za-z0-9]+$/i, 'Only Alphanumeric characters are allowed'),
  });