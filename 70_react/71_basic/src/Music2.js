// 클래스형 컴포넌트
import React, { Component } from "react";

// render() 메소드
class Music2 extends Component{
    render() {
        const { music, onRemove, onToggle } = this.props;
        const { id, title, singer, active } = music;
        const style = {
            color: active ? "blue" : "black",
            cursor: "pointer"
        };


        return (
            <>
                <div>
                    <b style={style} onClick={() => onToggle(id)}>{title}</b> {singer}
                    <button onClick={() => onRemove(id)}>삭제</button>
                </div>
            </>
        );
    };

    componentDidMount() {
        console.log("업데이트");
    };

    componentWillUnmount() {
        console.log("삭제");
    };

}

export default Music2;