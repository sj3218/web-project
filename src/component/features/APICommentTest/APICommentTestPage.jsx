import React from "react";
import Comments from "./Comments";
import { CommentsProvider } from "./CommentsContext";
import DoughnutCard from "../Doughnut/DoughnutCard";

function APICommentTestPage() {
	return (
		<>
			<CommentsProvider>
				{/*<pagecontent>이런식으로 둬야 함,, */}
				<Comments />
			</CommentsProvider>
			<DoughnutCard />
		</>
	);
}

export default APICommentTestPage;
