import * as React from 'react';
import { Input } from '@progress/kendo-react-inputs';

import { Button } from '@progress/kendo-react-buttons';
import { useForm } from 'react-hook-form';

const FormInput = ({ type, placeholder, label, className, onChange }: any) => (
  <div className={`user-details-input ${className}`}>
    <Input
      className={className}
      type={type}
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
      label={label}
    />
  </div>
);
const SearchField = ({ handleInputChange, toggleDialog }: any) => {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <>
      <FormInput
        className='searchInput'
        inputType='text'
        placeholder='Search'
        register={register('searchField')}
        onChange={(e: any) => handleInputChange(e.target.value)}
      />
      <Button
        themeColor={'primary'}
        className='searchBtn'
        onClick={toggleDialog}
      >
        New User
      </Button>
    </>
  );
};

export default SearchField;
