import React, { useEffect } from 'react';
import { getUser, useUsersDispatch, useUsersState } from './UsersContext';

function User({ id }) {
    const state = useUsersState();
    const dispatch = useUsersDispatch();

    //특정 id 화면에 표시할 때 id 바뀌면 자동으로 fetch되도록, 자동실행
    useEffect(() => {
        getUser(dispatch, id);
    }, [dispatch, id]);

    const { data: user, loading, error } = state.user;

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!user) return null;

    return (
        <div>
            <h2>{user.username}</h2>
            <p>
                <b>Email:</b> {user.email}
            </p>
        </div>
    );
}

export default User;
