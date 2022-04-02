import React, { useState } from 'react';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { useNavigate } from 'react-router-dom';
import { UserData } from '@src/types';
import {
  GridSortChangeEvent,
  GridRowProps,
  GridColumn,
  Grid,
} from '@progress/kendo-react-grid';

const initialSort: Array<SortDescriptor>=[
  { field: 'username', dir: 'desc' },
];

const UserListItem=({ data, setData }: any) => {

  const navigate=useNavigate()

  const [ allowUnsort, setAllowUnsort ]=useState<boolean>(true);
  const [ multiple, setMultiple ]=useState<boolean>(false);
  const [ sort, setSort ]=useState(initialSort);

  const sortChange=(event: GridSortChangeEvent) => {
    setData(getProducts(event.sort));
    setSort(event.sort);
  };

  const getProducts=(sort: SortDescriptor[]): UserData[] => {
    return orderBy(data, sort);
  };

  const rowRender=(
    trElement: React.ReactElement<HTMLTableRowElement>,
    props: GridRowProps
  ) => {
    const { dataItem }=props

    const noBg={ backgroundColor: "" };
    const red={ backgroundColor: "rgb(243, 23, 0, 0.32)" };
    const trProps: any={ style: dataItem.isEnabled? noBg:red };

    return React.cloneElement(
      trElement,
      { ...trProps },
      trElement.props.children
    );
  };

  return (
    <Grid
      className='user-grid'
      data={ data }
      sortable={ {
        allowUnsort: allowUnsort,
        mode: multiple? 'multiple':'single',
      } }
      rowRender={ rowRender }
      onSortChange={ sortChange }
      sort={ sort }
      onRowClick={ ({ dataItem }) => navigate(`/users/${dataItem?.id}`) }
    >
      <GridColumn field='username' title='User Name' />
      <GridColumn field='fullName' title='Full Name' />
      <GridColumn field='lastLogin' title='Last Login' />
      <GridColumn field='isEnabled' title='User Enabled' />
    </Grid>
  );
};

export default UserListItem;
