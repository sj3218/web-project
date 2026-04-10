import React from "react";
import styled from "styled-components";

//todo template component
//투두 리스트 레이아웃 설정하는 컴포넌트

const TodoTemplateBlock = styled.div`
	width: 600px;
	height: 750px;

	background: white;
	border-radius: 16px;
	border: 2px solid black;
	box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

	margin: 0 auto;
	margin-top: 96px;
	margin-bottom: 32px;
	display: flex;
	flex-direction: column;
`;

function TodoTemplate({ children }) {
	return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
}
export default TodoTemplate;
