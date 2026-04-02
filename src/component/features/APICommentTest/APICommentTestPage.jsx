import React from "react";
import Comments from "./Comments";
import { CommentsProvider } from "./CommentsContext";
import DoughnutCard from "../Doughnut/DoughnutCard";
import StackedBarCard from "../StackedBar/StackedBarCard";
import styled from "styled-components";

const Row = styled.div`
	display: flex;
	gap: 20px; /* 카드 사이 간격 */
	// align-items: flex-start;
	@media (max-width: 768px) {
		flex-direction: column;
		justify-content: center;
	}
`;

function APICommentTestPage() {
	return (
		<>
			<CommentsProvider>
				{/*<pagecontent>이런식으로 둬야 함,, */}
				<Comments />
			</CommentsProvider>
			<Row>
				<DoughnutCard />
				<StackedBarCard />
			</Row>
		</>
	);
}

export default APICommentTestPage;
