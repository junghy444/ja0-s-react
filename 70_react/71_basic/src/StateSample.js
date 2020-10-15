import React, { useState } from "react";

function StateSample() {
    // [state 값, 업데이트 함수] = useState(초기값);
    const [count, setCount] = useState(0);
    const [number, setNumber] = useState(0);

    const counter = () => {
        //count = count + 1;    //값을 직접 변경하면 안됨.
        setCount(count + 1);    //setter함수를 통해 변경해야 한다.
    }

    const onIncrease = () => {
        //setNumber(number + 1);  // setter로 값 변경
        setNumber((prev) => prev + 1);  // 업데이트 함수
    }
    const onDecrease = () => {
        setNumber(number - 1);
    }
    
    return (
        <>
            <div>
                <p>You cllicked {count} times.</p>
                <button onClick={counter}>Click me</button>
            </div>
            <div>
                <h1>{number}</h1>
                <button onClick={onIncrease}>+</button>
                <button onClick={onDecrease}>-</button>
            </div>
        </>
    )
}

export default StateSample;