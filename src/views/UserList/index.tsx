import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { Observer } from 'mobx-react';

import AddUserModal from '@components/AddUserModal/AddUserModal';
import { useUserStore } from '@src/ContextProvider/userContext';
import SearchField from '@components/SearchField/SearchField';
import UserListItem from '@components/UserListItem';
import './userList.scss';

const UserList: React.FC=() => {
  const [ searchField, setSearchField ]=useState<string>('');
  const [ visible, setVisible ]=useState<boolean>(false);
  const [ filteredData, setFilteredData ]=useState([]);
  const [ data, setData ]=useState(null);

  const userStore=useUserStore();

  useEffect(() => {
    if (searchField==='') {
      setFilteredData([]);
    }
    if (data&&data.length>0&&searchField) {
      const filteredUsers=data?.filter((element: any) =>
        element.username?.includes(searchField),
      );
      setFilteredData(filteredUsers);
    }
  }, [ searchField ]);

  useEffect(() => {
    userStore
      ?.getUsers()
      .then((response: any) => {
        setData(response.data);
      })
      .catch((e: any) => toast.error('Something Went Wrong'));
  }, []);

  const handleInputChange=(value: string) => {
    setSearchField(value);
  };

  const toggleDialog=() => {
    setVisible(!visible);
  };

  return (
    <Observer>
      { () => {
        return (
          <>
            <div className='user-list-container'>
              <div className='search-field-container'>
                <SearchField
                  handleInputChange={ handleInputChange }
                  toggleDialog={ toggleDialog }
                />
              </div>
              <div>
                { data&&data?.length>0&&(
                  <UserListItem
                    data={ searchField? filteredData:data }
                    setData={ searchField? setFilteredData:setData }
                  />
                ) }
              </div>
            </div>
            { visible&&(
              <AddUserModal visible={ visible } toggleDialog={ toggleDialog } />
            ) }
          </>
        );
      } }
    </Observer>
  );
};

export default UserList;
