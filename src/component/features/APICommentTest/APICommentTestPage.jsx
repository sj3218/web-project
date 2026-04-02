import React from "react";
import Comments from "./Comments";
import { CommentsProvider } from "./CommentsContext";

function APICommentTestPage() {
	return (
		<CommentsProvider>
			<Comments />
		</CommentsProvider>
	);
}

export default APICommentTestPage;
