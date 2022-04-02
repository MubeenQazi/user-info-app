

import React from 'react';
import {
    useFormContext,
    Controller,
} from 'react-hook-form';

import { Input } from '@progress/kendo-react-inputs';
import "./index.scss"

const ConnectForm=({ children }: any) => {
    const methods=useFormContext();
    return children({ ...methods });
};

const FormInput=({ name, label }: any) => (
    <ConnectForm>
        {
            ({ control }: any) => <Controller
                control={ control }
                name={ name }
                render={ ({ field: { onChange, value } }) => (
                    <div className='input-container'>
                        <Input value={ value } className="k-input" onChange={ onChange } label={ label } />
                    </div>
                ) }
            /> }
    </ConnectForm>
);

export default FormInput