import React, {useReducer, useRef} from "react";

const initialState = {
    id: "",
    name: ""
};

function reducer(state, action) {
    const { name, value } = action;
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                [name]: value
            }
        case "RESET":
            return initialState
        default:
            throw new Error("Unhandled Error")
    };
};

function ReducerSample2() {
    const [student, dispatch] = useReducer(reducer, initialState);

    // inputId = {current: }
    const inputId = useRef();   // ref 객체
    const inputName = useRef();

    const { id, name } = student;

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: "CHANGE",
            name,
            value
        });

        // // inputId.current = input DOM
        // inputId.current.focus();
        inputName.current.focus();
    };

    const onReset = () => {
        dispatch({
            type: "RESET"
        });
    };

    return (
        <>
            <input name="id" placeholder="학번" onChange={onChange} value={id} ref={inputId} />
            <input name="name" placeholder="이름" onChange={onChange} value={name} ref={inputName} />
            <button onClick={onReset}>초기화</button>
            <div>
                학번 : {id} 이름: {name}
            </div>
        </>
    );
}

export default ReducerSample2;