import Layout from '@/components/layout/layout';
import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../_app';
import UserList from '@/components/userlist/userList';
import Head from 'next/head';


const UsersList = () => {

    const {user, setUsers, setSearch ,userpage , usercurrent, setUserCurrent ,   setReload,
        reload} = useContext(MyContext)



    return (
        <Layout>
                              <Head>
        <title>Users List </title>
      </Head>
    
            <UserList user={user} setUsers={setUsers}  setSearch={setSearch} userpage={userpage}  usercurrent={usercurrent} setUserCurrent={setUserCurrent} reload={reload} setReload={setReload} />
        </Layout>
    );
};

export default UsersList;