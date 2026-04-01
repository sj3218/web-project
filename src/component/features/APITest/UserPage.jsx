import React from 'react';
import { UsersProvider } from './UsersContext';
import Users from './Users';

function UserPage() {
    return (
        <UsersProvider>
            <Users />
        </UsersProvider>
    );
}

export default UserPage;
