import React, { useState } from 'react';
import axios from 'axios';
import useAsync from './useAsync';
import User from './User';
import { getUsers, useUsersDispatch, useUsersState } from './UsersContext';

function Users() {
    const [userId, setUserId] = useState(null);
    const state = useUsersState();
    const dispatch = useUsersDispatch();
    const { data: users, loading, error } = state.users;

    //버튼 클릭 시 수동으로 실행되도록,
    const fetchData = () => {
        getUsers(dispatch);
    };

    //const { loading, data: users, error } = state; //state.data를 users 키워드로 조회

    // const [state, dispatch] = useReducer(reducer, {
    //     loading: false,
    //     data: null,
    //     error: null,
    // });
    // const [users, setUsers] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);

    /*
    const fetchUsers = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            setUsers(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/users'
                //'https://jsonplaceholder.typicode.com/users/showmeerror' //error
            );
            setUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };*/

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!users) return <button onClick={fetchData}>불러오기</button>;
    return (
        <>
            <ul>
                {/*렌더링을 위해서 새로운 배열을 만들어 화면에 뿌리는것*/}
                {users.map((user) => (
                    <li
                        key={user.id}
                        onClick={() => setUserId(user.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={fetchData}>다시 불러오기</button>
            {/*true && "hello" -> hello
                false && "hello" -> false
                false면 화면에 아무것도 안나옴 안그려서*/}
            {userId && <User id={userId} />}
        </>
    );
}

export default Users;
