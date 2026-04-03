import React from "react";
import Comments from "./Comments";
import { CommentsProvider } from "./CommentsContext";
import DoughnutCard from "../Doughnut/DoughnutCard";
import StackedBarCard from "../StackedBar/StackedBarCard";
import styled from "styled-components";
import { BiSolidLayer } from "react-icons/bi";
import { BiSolidLayerMinus } from "react-icons/bi";
import { BiSolidLayerPlus } from "react-icons/bi";
import { BiSmile } from "react-icons/bi";
import StatCard from "../StatCard/StatCard";

const StatCardsRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	padding: 20px;
	width: 90%;
	height: 100%;
	align-items: stretch;
	justify-items: center;
	@media (max-width: 600px) {
		grid-template-columns: 1fr 1fr;
	}
	@media (max-width: 1200px) {
		grid-template-columns: 1fr;
	}
`;

const ChartRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	padding: 20px;
	gap: 20px;
	width: 90%;
	height: 100%;
	align-items: stretch;
	justify-items: center;
	@media (max-width: 1200px) {
		grid-template-columns: 1fr;
	}
`;

function APICommentTestPage() {
	return (
		<>
			<CommentsProvider>
				{/*<pagecontent>이런식으로 둬야 함,, */}
				<Comments />
			</CommentsProvider>
			<br />
			<br />
			<br />
			<StatCardsRow>
				<StatCard color="black" title="전체 건수" value="300" icon={BiSolidLayer} />
				<StatCard color="#6689c6" title="접수 건수" value="300" icon={BiSolidLayerPlus} />
				<StatCard color="#e85252" title="취소 건수" value="300" icon={BiSolidLayerMinus} />
				<StatCard color="#69b3a2" title="완료 건수" value="300" icon={BiSmile} />
			</StatCardsRow>

			<br />
			<ChartRow>
				<DoughnutCard />
				<StackedBarCard />
			</ChartRow>
		</>
	);
}

export default APICommentTestPage;
