import React from 'react';

function StudyPage() {
  return (
    <div>
      <h2>useRef Hook</h2>
      <p>
        {`useRef가 하는 일
            const ref = useRef(초기값);
            내부 구조
                ref = {
                    current= 초기값
                }
            - 실제 값은 ref.current에 들어와있음
            - 이 값은 렌더링이 다시 되어도 유지됨
            - 근데 값이 바뀌어도 화면은 렌더링이 되지 않음

            const nextId = useRef(4);
                - nextId.current의 시작 값이 4
            nextId.current += 1;`}
      </p>

      <h2>useState vs useRef</h2>
      <p>
        {`useState는 값이 바뀌면 화면도 바뀌어야 할 때,
            useRef는 값은 유지해야 하는데 화면은 안바뀌어도 될때 - 값이 바뀌어도 렌더링을 발생하지 않음
            `}
      </p>

      <h2>불변성을 지키면서 배열에 새 항목을 추가하는 방법</h2>
      <p>
        {`1. spread 연산자 사용
            2. concat 함수 사용 - 기존의 배열을 수정하지 않고 새로운 원소가 추가된 새로운 배열을 만들어줌

            배열에 push, splice, sort 등의 함수를 사용하면 기존의 배열을 한번 복사하고 나서 사용해야함.`}
      </p>

      <h2>Filter</h2>
      <p>
        {`filter 함수는 배열에서 특정 조건을 만족하는 값들만 따로 추출하여 새로운 배열을 만듭니다. `}
      </p>

      <h2>useEffect</h2>
      <p>
        {`useEffect 훅은 함수, 의존값이 들어있는 배열(deps)를 파라미터로 넣어서 사용 함.
            deps 배열을 비우게 되면, 컴포넌트가 처음 나타날때에만 useEffect에 등록된 함수가 호출됨.`}
      </p>
      <p>{`useEffect(()=> {...}, [])`}</p>
      <p>{`deps 파라미터가 없을 때는, 모든 렌더링 후마다 실행이 됨`}</p>
      <p>{`useEffect(() => {...})`}</p>
      <p>
        {`deps 배열에 특정 값이 있다면, 컴포넌트가 렌더링 될 때, 그 특정 값이 바뀔 때만  실행이 됨`}
      </p>
      <p>
        {`useEffect(() = > {...}, [count]) //count 값이 바뀔 때 마다 실행. 

            참고로, 부모 컴포넌트가 리렌더링이 된다면 자식 컴포넌트 또한 리렌더링이 됨. 바뀐 내용이 없다 할지라도
             `}
      </p>
      <p></p>
      <h2>useCallback</h2>
      <p>
        {`함수들은 컴포넌트가 리렌더링 될 때 마다 새로 만들어집니다. 
            함수를 선언하는 것 자체는 사실 메모리도, 
            CPU 도 리소스를 많이 차지 하는 작업은 아니기 때문에 함수를 새로 선언한다고 해서 그 자체 만으로 큰 부하가 생길일은 없지만, 
            한번 만든 함수를 필요할때만 새로 만들고 재사용하는 것은 여전히 중요합니다.`}
      </p>

      <p>
        {`주의 하실 점은, 함수 안에서 사용하는 상태 혹은 props 가 있다면 꼭, deps 배열안에 포함시켜야 된다는 것 입니다. 
            만약에 deps 배열 안에 함수에서 사용하는 값을 넣지 않게 된다면, 함수 내에서 해당 값들을 참조할때 가장 최신 값을 참조 할 것이라고 보장 할 수 없습니다. 
            props 로 받아온 함수가 있다면, 이 또한 deps 에 넣어주어야 해요.`}
      </p>

      <p>{`사실, useCallback 은 useMemo 를 기반으로 만들어졌습니다. 다만, 함수를 위해서 사용 할 때 더욱 편하게 해준 것 뿐이지요. 이런식으로도 표현 할 수 있습니다.`}</p>
      <p>{`const onToggle = useMemo(
  () => () => {
    /* ... */
  },
  [users]
);`}</p>

      <p></p>
      <h2>useReducer</h2>
      <p>
        {`상태 변경 규칙이 많고, 상태가 객체/배열 처럼 복잡하고, 여러 state가 서로 연관되고, 유지보수/확장성을 고려할 때 usereducer 사용`}
      </p>
      <p>
        {`단순한 boolean이나 간단한 input 값 하나일 경우엔 useState 사용하는 것이 좋음`}
      </p>

      <p>{`useReducer = 복잡한 상태 로직을 구조적으로 관리하기 위한 도구`}</p>
      <p>{``}</p>
    </div>
  );
}

export default StudyPage;
