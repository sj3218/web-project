import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import TodoTemplate from "./component/TodoTemplate";
import TodoHeader from "./component/TodoHeader";

//todolist-test page
const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;
function TodoListTestPage() {
	return (
		<>
			<GlobalStyle />
			<TodoTemplate>
				<TodoHeader></TodoHeader>
			</TodoTemplate>
		</>
	);
}

export default TodoListTestPage;
