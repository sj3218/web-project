import { useState } from "react";
import styled from "styled-components";

// const Wrapper = styled.div`
//     padding: 1rem;
//     display: flex;
//     flex-direction: row;
//     align-items: flex-start;
//     justify-content : flex-start;
// `;

function ArrayAPIPage() {
	const initArray = ["apple", "banana", "cherry", "melon", "lemon", "tangerine"];

	const [array, setArray] = useState(initArray);
	const [result, setResult] = useState("");
	const [query, setQuery] = useState("");

	// 1. forEach: Array의 각 아이템을 출력
	const handlerForEach = () => {
		let tempResult = "";
		array.forEach((item) => {
			tempResult += `${item}, `;
		});
		setResult(tempResult);
	};

	//2. filter: Array의 요소 중에서 입력한 값과 일치하는 요소들만 출력
	const handlerFilter = () => {
		const tempResult = array.filter((item) => {
			if (item.includes(query)) {
				return true;
			} else return false;
		});
		setResult(tempResult.join(", "));
	};

	//3. map: Array의 각 요소를 대문자로 변환하여 출력
	const handlerMap = () => {
		const tempResult = array.map((item) => {
			return item.toUpperCase();
		});
		setResult(tempResult.join(", "));
	};

	//4. reduce: 각 아이템을 쉼표로 구분하여 출력 (축적되는 형태)
	const handlerReduce = () => {
		const tempResult = array.reduce((accumulator, current) => {
			return `${accumulator}, ${current}`;
		});
		setResult(tempResult);
	};

	//5. push: input 태그에 입력한 값을 배열 끝에 추가하여 출력
	const handlerPush = () => {
		if (!query) {
			alert("값이 없다");
			return false;
		}
		const tempResult = [...array, query];
		setArray(tempResult);
		setResult(tempResult.join(", "));
	};

	//6. pop: 배열에서 마지막 아이템을 제거하고 결과를 출력
	const handlerPop = () => {
		const tempResult = [...array];
		tempResult.pop();
		setArray(tempResult);
		setResult(tempResult.join(", "));
	};

	//7. slice: 원본 배열의 뒤에서 두 개의 아이템을 제외한 나머지를 출력
	const handlerSlice = () => {
		const tempResult = array.slice(0, -2);
		setResult(tempResult.join(", "));
	};

	//8. splice: 원본 배열의 2번째 위치부터 2개의 아이템을 제거하고 과일 추가한 후 출력
	const handlerSplice = () => {
		//불변성 때문에 값 바꾸면 안됨
		const tempResult = [...array];
		tempResult.splice(2, 2, "grape", "kiwi");
		setResult(tempResult.join(", "));
	};

	//9. indexOf: input에 입력한 값과 일치하는 값이 있는 경우 해당 index를 출력, 없는 경우, -1 출력
	const handlerIndexOf = () => {
		const tempResult = array.indexOf(query);
		setResult(tempResult);
	};

	// 10. includes: 원본배열이 input에 입력한 값과 일치하는 정확한 과일명을 가지고있는 경우 true 출력, 그 외의 경우 false 출력
	const handlerIncludes = () => {
		const tempResult = array.includes(query);
		setResult(tempResult.toString());
	};

	// 11. find: 원본배열이 input에 입력한 값을 포함하는 과일명을 가지고있는 경우 과일명을 출력, 그 외의 경우 "Not Found"를 출력
	const handlerFind = () => {
		if (!query) {
			alert("값 없다");
			return false;
		}

		const tempResult = array.find((fruit) => {
			return fruit.includes(query);
		});

		if (tempResult) {
			setResult(tempResult);
		} else {
			setResult("Not Found");
		}
	};

	// 12. some: 원본배열이 input에 입력한 값을 포함하는 과일명을 가지고있는 경우 true을 출력, 그 외의 경우 false 를 출력
	const handlerSome = () => {
		if (!query) {
			alert("no input");
			return false;
		}

		const tempResult = array.some((fruit) => {
			return fruit.includes(query);
		});

		setResult(tempResult.toString());
	};

	// 13. every: 모든 과일명이 5글자를 초과하는 경우 true를 출력, 그 외의 경우 false를 출력
	const handlerEvery = () => {
		const tempResult = array.every((fruit) => {
			return fruit.length > 5;
		});

		setResult(tempResult.toString());
	};

	// 14. sort: 알파벳 내림차순 정렬 후 리스트 명을 ", "로 구분하여 출력
	// 오름차순 정렬
	//arr.sort((a, b) =>  a - b);

	// 내림차순 정렬
	//arr.sort((a, b) =>  b - a));

	// 	* return 값
	//  ' - 1 ' :  FirstString 이 SecondString 보다 앞에 위치.
	//   ' 0 '  : FirstString 과 SecondString 이 같음.
	//   ' 1 '  : FirstString 이 SecondString 보다 뒤에 위치.

	const handlerSort = () => {
		const tempResult = [...array];
		tempResult.sort((a, b) => {
			return b.localeCompare(a);
		});
		setResult(tempResult.join(", "));
	};

	// 15. join: 배열의 모든 요소를 쉼표(", ")로 구분하고 결합된 문자열을 출력
	const handlerJoin = () => {
		array.join(", ");
		setArray(array);
		setResult(array);
	};

	return (
		<>
			<div>
				<h1>Array API Test</h1>
				<div>
					<input
						type="text"
						placeholder="Enter text"
						value={query}
						onChange={function (e) {
							setQuery(e.target.value);
						}}
					></input>
				</div>
			</div>

			{/* button */}
			<div>
				<button onClick={handlerForEach}>forEach</button>
				<button onClick={handlerFilter}>filter</button>
				<button onClick={handlerMap}>map</button>
				<button onClick={handlerReduce}>reduce</button>
				<button onClick={handlerPush}>push</button>
				<button onClick={handlerPop}>pop</button>
				<button onClick={handlerSlice}>slice</button>
				<button onClick={handlerSplice}>Splice</button>
				<button onClick={handlerIndexOf}>IndexOf</button>
				<button onClick={handlerIncludes}>Includes</button>
				<button onClick={handlerFind}>Find</button>
				<button onClick={handlerSome}>Some</button>
				<button onClick={handlerEvery}>Every</button>
				<button onClick={handlerSort}>Sort</button>
				<button onClick={handlerJoin}>Join</button>
			</div>

			{/* show array */}
			<div>
				{/* array = std::vector<std::string> */}
				{/* result = std::string, therefore, result cannot use join function */}
				<div>Origin: {array.join(", ")}</div>
				<div>Result: {result}</div>
			</div>
		</>
	);
}

export default ArrayAPIPage;
