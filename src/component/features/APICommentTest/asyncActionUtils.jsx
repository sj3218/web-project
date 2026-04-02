export default function createAsyncDispatcher(type, promiseFn) {
    const SUCCESS = `${type}_SUCCESS`;
    const ERROR = `${type}_ERROR`;

    async function actionHandler(dispatch, ...rest) {
        dispatch({ type });
    }
}

const loadingState = {
    loading: true,
    data: null,
    error: null,
};
const success = (data) => ({
    loading: false,
    data: data,
    error: null,
});
const error = (error) => ({
    loading: false,
    data: null,
    error: error,
});
