import React from "react";
import "./App.css";
import Hello from "./Hello";
import Hello2 from "./Hello2";
import HelloPractice from "./HelloPractice";
import StateSample from "./StateSample";
import StateSample2 from "./StateSample2";
import StatePractice from "./StatePractice";
import InputSample from "./InputSample";
import InputPractice from "./InputPractice";

// 함수형 컴포넌트
// return (JSX)
// Hello2 컴포넌트 작성 -> App에 추가

// JSX 규칙
// 1. 두 개 이상의 태그는 반드시 하나의 태그로 감싸줘야됨
// 2. 여는 태그와 닫는 태그가 있어야 함
// 3. JSX 안에서 Javascript 값을 사용할 때에는 {}를 붙여줌
// 4. 인라인 style 작성 시 객체 형태로 작성 (Camelcase로 사용)
// 5. css class 설정 시에는 class="box"
// 6. 주석 작성
// - JSX내에서는 {/*  */} 작성
// - 열린 태그 내에서 // 작성

function App() {
  const name = "react";
  const style = {
    backgroundColor: "yellow", // background-color
    color: "blue",
    fontSize: 30, // font-size
  };
  return (
    //주석 예시
    <div>
      {/*주석 예시*/}
      <div style={style}>{name}</div>
      <div class="box"></div>
      <Hello name={name} color="blue">
        태그 안의 텍스트입니다.
         </Hello>
      <Hello />

      <hr />
      
      <Hello2 messages={["메시지1", "메시지2", "메시지3"]} />
      <Hello2 isLoggedIn={true} /> 
      
      <hr />

      <HelloPractice id="3528" name="정하영" color="blue">
        ha0
         </HelloPractice>
      <HelloPractice />      
    </div>
  );
}

function App3() {
  return (
    <>
      <StateSample />
      <hr />
      <StateSample2 />

      <hr />
      
      <StatePractice />
    </>
  );
}

function App4() {
  return (
    <>
      <InputSample />
      
      <hr />

      <InputPractice />
    </>
  );
}

export default App;
