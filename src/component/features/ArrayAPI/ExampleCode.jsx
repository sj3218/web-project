import { useEffect, useRef } from "react";

function ExampleCode() {
	const idRef = useRef(null);
	const handleLogin = (e) => {
		e.preventDefault();
		alert(`${idRef.current.value}님 하이욥`);
	};

	useEffect(() => {
		idRef.current.focus();
	}, []);

	return (
		<from onSubmit={handleLogin}>
			아이디:
			<input></input>
			비밀번호:
			<input></input>
		</from>
	);
}

export default ExampleCode;
