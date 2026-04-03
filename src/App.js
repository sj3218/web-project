import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";

import MainPage from "./component/page/MainPage";
import InputSamplePage from "./component/page/InputSamplePage";
import UserListPage from "./component/page/UserListPage";
import CounterPage from "./component/page/CounterPage";
import StudyPage from "./component/page/StudyPage";
import ButtonPage from "./component/page/ButtonPage";
import TodoListPage from "./component/features/TodoList/components/TodoListPage";
import Users from "./component/features/APITest/Users";
import UserPage from "./component/features/APITest/UserPage";
import APICommentTestPage from "./component/features/APICommentTest/APICommentTestPage";
import DashboardPage from "./component/features/DashboardPage/DashboardPage";

const MainTitleText = styled.p`
	font-size: 24px;
	font-weight: bold;
	text-align: center;
`;

const SidebarContainer = styled.div`
	width: 240px;
	height: 100vh;
	background: #f5f5f5;
	position: fixed;
	top: 0;
	left: 0;
	padding: 20px;
	z-index: 2;
	transform: translateX(${(props) => (props.open ? "0" : "-100%")});
	transition: transform 0.3s ease;
`;

const Overlay = styled.div`
	display: ${(props) => (props.open ? "block" : "none")};
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.3);
	z-index: 1;
`;

const Content = styled.div`
	flex: 1;
	margin-left: 240px;
	padding: 20px;
`;
const containerStyle = {
	backgroundColor: "#f3f4f6", // 연한 그레이 (Light Gray)
	minHeight: "100vh", // 화면 높이 전체 차지
	padding: "20px",
	margin: 0,
};

function AppLayout() {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	return (
		<>
			<div style={containerStyle}>
				<MainTitleText>Website</MainTitleText>

				{/* 햄버거 버튼 */}
				<button onClick={() => setOpen(!open)}>☰</button>

				{/* 배경 클릭 시 닫기 */}
				<Overlay open={open} onClick={() => setOpen(false)} />

				{/* 사이드바 */}
				<SidebarContainer open={open}>
					<h3>메뉴</h3>
					<div
						onClick={() => {
							navigate("/");
							setOpen(false);
						}}
					>
						홈
					</div>
					<div
						onClick={() => {
							navigate("/input-sample-page");
							setOpen(false);
						}}
					>
						Input Sample
					</div>
					<div
						onClick={() => {
							navigate("/user-list-page");
							setOpen(false);
						}}
					>
						User List Sample
					</div>
					<div
						onClick={() => {
							navigate("/counter-page");
							setOpen(false);
						}}
					>
						Counter
					</div>
					<div
						onClick={() => {
							navigate("/button-page");
							setOpen(false);
						}}
					>
						Button
					</div>
					<div
						onClick={() => {
							navigate("/todolist-page");
							setOpen(false);
						}}
					>
						TodoList
					</div>
					<div
						onClick={() => {
							navigate("/api-test-page");
							setOpen(false);
						}}
					>
						API Test
					</div>
					<div
						onClick={() => {
							navigate("/api-comment-test-page");
							setOpen(false);
						}}
					>
						API Comment Test
					</div>
					<div
						onClick={() => {
							navigate("/study-page");
							setOpen(false);
						}}
					>
						Study
					</div>
					<div
						onClick={() => {
							navigate("/dashboard-page");
							setOpen(false);
						}}
					>
						Dashboard
					</div>
				</SidebarContainer>

				{/* 메인 콘텐츠 */}
				<Content>
					<Routes>
						<Route index element={<MainPage />} />
						<Route path="input-sample-page" element={<InputSamplePage />} />
						{/* <Route path="user-list-page" element={<UserListPage users = {users}/>} /> */}
						<Route path="user-list-page" element={<UserListPage />} />
						<Route path="counter-page" element={<CounterPage />} />
						<Route path="button-page" element={<ButtonPage />} />
						<Route path="todolist-page" element={<TodoListPage />} />
						<Route path="api-test-page" element={<UserPage />} />
						<Route path="api-comment-test-page" element={<APICommentTestPage />} />
						<Route path="study-page" element={<StudyPage />} />
						<Route path="dashboard-page" element={<DashboardPage />} />
					</Routes>
				</Content>
			</div>
		</>
	);
}

function App() {
	return (
		<BrowserRouter>
			<AppLayout />
		</BrowserRouter>
	);
}

export default App;
