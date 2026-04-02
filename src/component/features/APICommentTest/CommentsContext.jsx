import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";

const initialState = {
	comments: {
		loading: false,
		data: null,
		error: null,
	},
};

// 로딩중일 때 바뀔 상태 객체
const loadingState = {
	loading: true,
	data: null,
	error: null,
};

// 성공했을 때의 상태 만들어주는 함수
const success = (data) => ({
	loading: false,
	data,
	error: null,
});

// 실패했을 때의 상태 만들어주는 함수
const error = (error) => ({
	loading: false,
	data: null,
	error: error,
});

function commentsReducer(state, action) {
	switch (action.type) {
		case "GET_COMMENTS":
			return {
				...state,
				comments: loadingState,
			};
		case "GET_COMMENTS_SUCCESS":
			return {
				...state,
				comments: success(action.data),
			};
		case "GET_COMMENTS_ERROR":
			return {
				...state,
				comments: error(action.error),
			};
		default:
			throw new Error(`Unhanded action type: ${action.type}`);
	}
}

const CommentsStateContext = createContext(null);
const CommentsDispatchContext = createContext(null);

export function CommentsProvider({ children }) {
	const [state, dispatch] = useReducer(commentsReducer, initialState);
	return (
		<CommentsStateContext.Provider value={state}>
			<CommentsDispatchContext.Provider value={dispatch}>{children}</CommentsDispatchContext.Provider>
		</CommentsStateContext.Provider>
	);
}

export function useCommentsState() {
	const state = useContext(CommentsStateContext);
	if (!state) {
		throw new Error("Cannot find CommentsProvider");
	}
	return state;
}

export function useCommentsDispatch() {
	const dispatch = useContext(CommentsDispatchContext);
	if (!dispatch) {
		throw new Error("Cannot find CommentsProvider");
	}
	return dispatch;
}

export async function getComments(dispatch) {
	dispatch({ type: "GET_COMMENTS" });
	try {
		const response = await axios.get("https://jsonplaceholder.typicode.com/comments");
		dispatch({ type: "GET_COMMENTS_SUCCESS", data: response.data });
	} catch (e) {
		dispatch({ type: "GET_COMMENTS_ERROR", error: e });
	}
}
