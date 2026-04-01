import React, { createContext, useReducer, useContext } from 'react';
import createAsyncDispatcher, {
    createAsyncHandler,
    initialAsyncState,
} from './asyncActionUtils';
import * as api from './api';

const initialState = {
    users: initialAsyncState,
    user: initialAsyncState,
};

// //로딩 중일 때 바뀔 상태
// const loadingState = {
//     loading: true,
//     data: null,
//     error: null,
// };

// //성공시 만들어 줄 상태
// const success = (data) => ({
//     loading: false,
//     data,
//     error: null,
// });

// //실패 시 만들어 줄 상태
// const error = (error) => ({
//     loading: false,
//     data: null,
//     error: error,
// });

// //위에서 만든 객체/ 유틸 함수들을 사용하여 reducer 작성
// function usersReducer(state, action) {
//     switch (action.type) {
//         case 'GET_USERS':
//             return {
//                 ...state,
//                 users: loadingState,
//             };
//         case 'GET_USERS_SUCCESS':
//             return {
//                 ...state,
//                 users: success(action.data),
//             };
//         case 'GET_USERS_ERROR':
//             return {
//                 ...state,
//                 users: error(action.error),
//             };
//         case 'GET_USER':
//             return {
//                 ...state,
//                 user: loadingState,
//             };
//         case 'GET_USER_SUCCESS':
//             return {
//                 ...state,
//                 user: success(action.data),
//             };
//         case 'GET_USER_ERROR':
//             return {
//                 ...state,
//                 users: error(action.error),
//             };
//         default:
//             throw new Error(`Unhanded action type: ${action.type}`);
//     }
// }

const usersHandler = createAsyncHandler('GET_USERS', 'users');
const userHandler = createAsyncHandler('GET_USER', 'user');
function usersReducer(state, action) {
    switch (action.type) {
        case 'GET_USERS':
        case 'GET_USERS_SUCCESS':
        case 'GET_USERS_ERROR':
            return usersHandler(state, action);
        case 'GET_USER':
        case 'GET_USER_SUCCESS':
        case 'GET_USER_ERROR':
            return userHandler(state, action);
        default:
            throw new Error(`Unhanded action type: ${action.type}`);
    }
}

//context는 전역변수처럼 공유되는 데이터
//불필요한 렌더링 방지용
//state: 현재 상태 객체, 상태를 구독한 모든 컴포넌트 리렌더링
//dispatch: 상태를 바꾸는 함수, 항상 같응 함수 객체, dispatch자체가 바뀌지 않아 리렌더링 안시킴
const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

export function UsersProvider({ children }) {
    const [state, dispatch] = useReducer(usersReducer, initialState);
    return (
        <UsersStateContext.Provider value={state}>
            <UsersDispatchContext.Provider value={dispatch}>
                {children}
            </UsersDispatchContext.Provider>
        </UsersStateContext.Provider>
    );
}

export function useUsersState() {
    const state = useContext(UsersStateContext);
    if (!state) {
        throw new Error('Cannot find UsersProvider');
    }
    return state;
}

export function useUsersDispatch() {
    const dispatch = useContext(UsersDispatchContext);
    if (!dispatch) {
        throw new Error('Cannot find UsersProvider');
    }
    return dispatch;
}

// export async function getUsers(dispatch) {
//     dispatch({ type: 'GET_USERS' });
//     try {
//         const response = await axios.get(
//             'https://jsonplaceholder.typicode.com/users'
//         );
//         dispatch({ type: 'GET_USERS_SUCCESS', data: response.data });
//     } catch (e) {
//         dispatch({ type: 'GET_USERS_ERROR', error: e });
//     }
// }

// export async function getUser(dispatch, id) {
//     dispatch({ type: 'GET_USER' });
//     try {
//         const response = await axios.get(
//             `https://jsonplaceholder.typicode.com/users/${id}`
//         );
//         dispatch({ type: 'GET_USER_SUCCESS', data: response.data });
//     } catch (e) {
//         dispatch({ type: 'GET_USER_ERROR', error: e });
//     }
// }
export const getUsers = createAsyncDispatcher('GET_USERS', api.getUsers);
export const getUser = createAsyncDispatcher('GET_USER', api.getUser);
