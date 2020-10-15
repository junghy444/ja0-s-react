import React, {useState, useRef} from "react";

function InputPractice() {
    const [student, setStudent] = useState({
        id: '',
        name: ''
    });

    // inputId = {current: }
    const inputId = useRef();   // ref 객체

    const { id, name } = student;

    const onChange = (e) => {
        const { value, name } = e.target;
        setStudent({
            ...student,     // 기존 값 그대로 가져오고
            [name]: value   // 변경할 것만 업데이트
        });
    };

    const onReset = () => {
        setStudent({
            id: '',
            name: ''
        });
        // inputId.current = input DOM
        inputId.current.focus();
    };

    return (
        <>
            <input name="id" placeholder="학번" onChange={onChange} value={id} ref={inputId} />
            <input name="name" placeholder="이름" onChange={onChange} value={name} />
            <button onClick={onReset}>초기화</button>
            <div>
                학번 : {id} 이름: {name}
            </div>
        </>
    );
}

export default InputPractice;