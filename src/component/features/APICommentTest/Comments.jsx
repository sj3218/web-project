import React from "react";
import axios from "axios";
import APIAsync from "./APIAsync";
import useAsync from "../APITest/useAsync";

async function getComments() {
	const response = await axios.get("https://jsonplaceholder.typicode.com/comments");
	return response.data;
}

function Comments() {
	//const [state, refetch] = APIAsync(getComments, []);
	const [state, refetch] = useAsync(getComments, []);

	const { loading, data: comments, error } = state;

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
			<button onClick={refetch}>다시 불러오기 </button>
			{/*<button onClick={}>1 post</button>*/}
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
		</>
	);
}

export default Comments;
