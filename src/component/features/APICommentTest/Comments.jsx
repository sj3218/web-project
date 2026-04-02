import React, { useEffect, useState } from "react";
import { useCommentsDispatch, useCommentsState, getComments, getCommentsByPostId } from "./CommentsContext";

function Comments() {
	//const [state, refetch] = useAsync(getComments, []);
	const [show_comments, setShowComments] = useState(true);
	const state = useCommentsState();
	const dispatch = useCommentsDispatch();
	const { data: comments, loading, error } = state.comments;
	useEffect(() => {
		getComments(dispatch);
	}, [dispatch]);

	if (loading) {
		return <div>로딩중 ...</div>;
	}
	if (error) {
		return <div>에러가 발생했습니다.</div>;
	}
	if (!comments) {
		return null;
	}

	return (
		<>
			{/* <button class="bg-blue-500 text-white px-4 py-2 rounded">클릭</button> */}
			<button onClick={() => setShowComments((prev) => !prev)}>{show_comments ? "숨기기" : "보이기"}</button>
			<button onClick={() => getComments(dispatch)}>다시 불러오기 </button>
			<button onClick={() => getCommentsByPostId(dispatch, 1)}>1번</button>
			<button onClick={() => getCommentsByPostId(dispatch, 2)}>2번</button>
			<button onClick={() => getCommentsByPostId(dispatch, 3)}>3번</button>
			<button onClick={() => getCommentsByPostId(dispatch, 4)}>4번</button>
			<button onClick={() => getCommentsByPostId(dispatch, 5)}>5번</button>
			<button onClick={() => getCommentsByPostId(dispatch, 6)}>6번</button>
			<button onClick={() => getCommentsByPostId(dispatch, 7)}>7번</button>
			{show_comments && (
				<ul>
					{comments.map((comment) => (
						<li key={comment.id}>
							{comment.id}
							<br />
							name: {comment.name}
							<br />
							email: {comment.email}
							<br />
						</li>
					))}
				</ul>
			)}
		</>
	);
}

export default Comments;
