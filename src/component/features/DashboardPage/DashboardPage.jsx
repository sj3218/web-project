import React, { useEffect, useReducer, useState } from "react";
import APIAsync from "../APICommentTest/APIAsync";
import axios from "axios";
import styled from "styled-components";
import StatCard from "../StatCard/StatCard";
import { BiSmile, BiSolidLayer, BiSolidLayerMinus } from "react-icons/bi";
import Table from "./DataTable";
import DataTable from "./DataTable";

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

const columns = [
	{ Header: "시간", accessor: "time" }, // 11:31
	{
		Header: "채널",
		accessor: "channel",
		Cell: ({ value }) => {
			// 채널 이름에 따라 색상을 다르게 리턴 (C++의 Switch문 느낌)
			const colors = {
				인터넷: "text-blue-600",
				API: "text-purple-600",
				전화: "text-green-600",
				카카오: "text-yellow-600",
			};
			return <span className={`font-bold ${colors[value] || "text-gray-700"}`}>{value}</span>;
		},
	},
	{ Header: "콜센터", accessor: "center" },
	{ Header: "도착지", accessor: "destination" },
	{
		Header: "지연시간",
		accessor: "delay",
		Cell: ({ value }) => (
			// 지연시간 강조 배지
			<div className="flex justify-end">
				<span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">{value}분 지연</span>
			</div>
		),
	},
];

const reducer = (state, action) => {
	switch (action.type) {
		case "LOADING":
			return {
				loading: true,
				data: null,
				grouped: null,
				error: null,
			};
		case "SUCCESS":
			return {
				loading: false,
				data: action.data,
				grouped: action.grouped,
				error: null,
			};
		case "ERROR":
			return {
				loading: false,
				data: null,
				grouped: null,
				error: action.error,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};

function GroupedByUserId(data) {
	const map = {};
	for (const item of data) {
		if (!map[item.userId]) {
			map[item.userId] = [];
		}
		map[item.userId].push(item);
	}
	return map;
}

function DashboardPage() {
	const [selectedUserId, setSelectedUserId] = useState(1);

	const [state, dispatch] = useReducer(reducer, {
		loading: false,
		data: null,
		error: null,
	});

	const fetchData = async () => {
		try {
			dispatch({ type: "LOADING" });
			const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
			dispatch({ type: "SUCCESS", data: response.data, grouped: GroupedByUserId(response.data) });
		} catch (e) {
			dispatch({ type: "ERROR", error: e });
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	const { loading, data, grouped, error } = state;

	if (loading) return <div>로딩중임용</div>;
	if (error) return <div>에에에에에러러러럴</div>;
	if (!data) return <div>두둥 데이터가 없따,,!</div>;

	// 선택된 유저의 리스트 (C++의 map[key] 접근)
	const filteredTodos = grouped ? grouped[selectedUserId] || [] : [];

	// 통계 계산
	const totalCount = filteredTodos.length;
	const completedCount = filteredTodos.filter((t) => t.completed).length;
	const userId = data ? [...new Set(data.map((item) => item.userId))] : [];

	return (
		<>
			<div>
				<div style={{ padding: "20px" }}>
					{/* 유저 선택 버튼 (1~10번) */}
					<div style={{ marginBottom: "20px" }}>
						{userId.map((id) => (
							<button key={id} onClick={() => setSelectedUserId(id)} style={{ fontWeight: selectedUserId === id ? "bold" : "normal", marginRight: "5px" }}>
								유저 {id}
							</button>
						))}
					</div>

					{/* 통계 카드 */}
					<StatCardsRow>
						<StatCard color="#6689c6" title="총 할 일" value={totalCount} icon={BiSolidLayer} />
						<StatCard color="#e85252" title="진행중인 일" value={totalCount - completedCount} icon={BiSolidLayerMinus} />
						<StatCard color="#69b3a2" title="완료된 일" value={completedCount} icon={BiSmile} />
					</StatCardsRow>
					<Table columns={columns} />

					{/* 필터링된 상세 리스트 */}
					<h3 className="text-xl font-bold mb-4">유저 {selectedUserId}의 작업 내역</h3>
					<DataTable table_data={filteredTodos} />
					{/* <h3>유저 {selectedUserId}의 상세 리스트</h3>
					<table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
						<thead>
							<tr>
								<th>ID</th>
								<th>제목</th>
								<th>완료여부</th>
							</tr>
						</thead>
						<tbody>
							{filteredTodos.map((todo) => (
								<li key={todo.id}>
									{todo.id} | {todo.title} | {todo.completed ? "✅" : "❌"}
								</li>
							))}
						</tbody>
					</table> */}
				</div>
			</div>
		</>
	);
}

export default DashboardPage;
