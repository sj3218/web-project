import { useReducer, useEffect } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null,
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error,
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

//callback: API 요청을 시작하는 함수, deps
function useAsync(callback, deps = [], skip = false) {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: false,
    });

    const fetchData = async () => {
        dispatch({ type: 'LOADING' });
        try {
            const data = await callback();
            dispatch({ type: 'SUCCESS', data });
        } catch (e) {
            dispatch({ type: 'ERROR', error: e });
        }
    };
    // const fetchUsers = async () => {
    //     dispatch({ type: 'LOADING' });
    //     try {
    //         const response = await axios.get(
    //             'https://jsonplaceholder.typicode.com/users'
    //             //'https://jsonplaceholder.typicode.com/users/showmeerror' //error
    //         );

    //         dispatch({ type: 'SUCCESS', data: response.data });
    //     } catch (e) {
    //         dispatch({ type: 'ERROR', error: e });
    //     }
    // };

    //users 컴포넌트가 렌더링 처음 될때 한번 불리고, 이후에는 실행안함.
    //주로 api, 초기 데이터 세팅, 이벤트 등록 때 사용
    // useEffect(() => {
    //     fetchUsers();
    // }, []);

    useEffect(() => {
        if (skip) return;
        fetchData();
    }, deps);

    return [state, fetchData];
}

export default useAsync;
