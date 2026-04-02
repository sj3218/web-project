import React from "react";
import styled from "styled-components";
import CustomStackedBarChart from "./CustomStackedBarCard";

const Card = styled.div`
	background: white;
	border-radius: 20px;
	padding: 24px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

	width: 800px;

	height: 500px;

	display: flex;
	flex-direction: column;
`;

const Title = styled.div`
	font-size: 20px;
	font-weight: bold;
`;

const ChartArea = styled.div`
	flex: 1; /* 남은 공간 전부 차지 */
	display: flex;
	justify-content: center;
	align-items: center;
`;

const labels = ["09시", "10시", "11시", "12시", "13시", "14시", "15시", "16시", "17시"];

const data = [
	{
		name: "카카오",
		values: [102, 60, 151, 53, 29, 109, 25, 22, 85],
	},
	{
		name: "인터넷",
		values: [21, 29, 102, 148, 98, 50, 68, 164, 150],
	},
	{
		name: "전화",
		values: [80, 70, 60, 30, 50, 10, 10, 50, 100],
	},
	{
		name: "API",
		values: [70, 60, 51, 73, 19, 89, 55, 62, 45],
	},
];
function StackedBarCard() {
	return (
		<Card>
			<Title>이건 스택 바 라는 거얌</Title>
			<ChartArea>
				<CustomStackedBarChart data={data} labels={labels} />
			</ChartArea>
		</Card>
	);
}
export default StackedBarCard;
