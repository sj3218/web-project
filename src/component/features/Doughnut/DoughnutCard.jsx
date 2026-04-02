import React from "react";
import styled from "styled-components";
import DoughnutChart from "../../ui/DoughnutChart";
import { Chart } from "chart.js";
import CustomDoughnutChart from "./CustomDoughnutChart";

const Card = styled.div`
	background: white;
	border-radius: 20px;
	padding: 24px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

	width: 400px;
	max-width: 500px;
	aspect-ratio: 1;

	display: flex;
	flex-direction: column;
`;
const Title = styled.div`
	font-size: 20px;
	font-weight: bold;
`;

// const ChartArea = styled.div`
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;

// 	/* grid-row 1fr에 맞게 차트 크기 지정 */
// 	width: 100%;
// 	height: 100%;
// `;

const ChartArea = styled.div`
	flex: 1; /* 남은 공간 전부 차지 */
	display: flex;
	justify-content: center;
	align-items: center;
`;

const NameCardArea = styled.div`
	flex: 0 0 25%; /* 카드 높이의 25% 고정 */
	display: flex;
	flex-direction: column;
	gap: 8px;
	overflow-y: auto;
`;
// const NameCardArea = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	gap: 10px;

// 	height: 120px; /* NameCardArea 고정 */
// 	overflow-y: auto; /* 내용 많으면 스크롤 */
// 	padding: 10px;
// `;

const Row = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px 12px;
	border-radius: 10px;
	background: #f5f5f5;
`;

const Label = styled.span`
	font-weight: 500;
`;

const Value = styled.span`
	font-weight: bold;
`;

const data = [
	{ name: "카카오", value: 28 },
	{ name: "전화", value: 12 },
	{ name: "인터넷", value: 34 },
	{ name: "API", value: 26 },
];
function DoughnutCard() {
	return (
		<Card>
			<Title>안뇽 안뇽 아침이야 ~</Title>
			{/* <DoughnutChart /> */}
			<ChartArea>
				{/* <DoughnutChart /> */}
				<div style={{ width: "95%", height: "95%" }}>
					<CustomDoughnutChart data={data} size={250} />
				</div>
			</ChartArea>
			<NameCardArea>
				{data.map((item, i) => (
					<Row key={i}>
						<Label>{item.name}</Label>
						<Value>{item.value}%</Value>
					</Row>
				))}
			</NameCardArea>
		</Card>
	);
}

export default DoughnutCard;
