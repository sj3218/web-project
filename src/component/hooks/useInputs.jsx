import { useState, useCallback, useReducer } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                [action.name]: action.value,
            };
        case 'RESET':
            return Object.keys(state).reduce((acc, current) => {
                acc[current] = '';
                return acc;
            }, {});
        default:
            return state;
    }
}
//폼관리도구
function useInputs(initialForm) {
    //form = 현재 상태값, setForm = 상태를 바꾸는 함수
    //const [form, setForm] = useState(initialForm);
    const [form, dispatch] = useReducer(reducer, initialForm);

    //onChange = {(e)=> ...}
    // const onChange = useCallback((e) => {
    //     const { name, value } = e.target;
    //     setForm((form) => ({ ...form, [name]: value }));
    // }, []); //함수가 한번만 생성이됨, 호출은 이벤트 발생할 때마다 됨

    const onChange = useCallback((e) => {
        const { name, value } = e.target;
        dispatch({ type: 'CHANGE', name, value });
    }, []);

    //const reset = useCallback(() => setForm(initialForm), [initialForm]);
    const reset = useCallback(() => dispatch({ type: 'RESET' }), []);
    return [form, onChange, reset];
}

export default useInputs;
