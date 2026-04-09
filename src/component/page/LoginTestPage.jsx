import React, { useState } from "react";

function LoginTestPage() {
	const [id, setID] = useState("");
	const [password, setPassword] = useState("");

	const onIdChangeHandler = (event) => {
		setID(event.target.value);
	};

	const onPasswordChangeHandler = (event) => {
		setPassword(event.target.value);
	};

	return (
		<>
			<div>
				아이디: <input value={id} onChange={onIdChangeHandler}></input>
			</div>
			<div>
				비밀번호: <input type="password" value={password} onChange={onPasswordChangeHandler}></input>
			</div>
			<button
				onClick={() => {
					alert(`아이디는 ${id}, 비밀번호는 ${password}`);
					setID("");
					setPassword("");
				}}
			>
				로그인
			</button>
		</>
	);
}

export default LoginTestPage;
