import React from "react";
import styled from "styled-components";

//todo header component
// 오늘의 날짜와 요일, 앞으로 해야할 일을 보여주는 컴포넌트

const TodoHeaderBlock = styled.div`
	padding-top: 10px;
	padding-left: 30px;
	padding-right: 30px;
	padding-bottom: 25px;
	border-bottom: 1px solid #e9ecef;

    h1{
    margin:0,
    font-size: 36px;
    color: black;
    font-weight:bold;
    }

    .day{
    margin-top: 4px;
    color: gray;
    font-size: 14px;
    }

    .tasks-left
    {
    margin-top:4px;
    color: pink
    font-size: 18px;
    font-weight:bold;
    }
`;

function TodoHeader() {
	return (
		<>
			<TodoHeaderBlock>
				<h1>Todo-list</h1>
				<div className="day">wed</div>
				<div className="task-left">2 left</div>
			</TodoHeaderBlock>
		</>
	);
}
export default TodoHeader;
