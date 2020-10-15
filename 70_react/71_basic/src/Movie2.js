// 클래스형 컴포넌트
import React, { Component } from "react";

// render() 메소드 있어야 함
class Movie2 extends Component {
    render() {
        const { movie, onRemove, onToggle } = this.props;
        const { id, title, singer, active } = movie;
        const style = {
            color: active ? "green" : "black",
            cursor: "pointer"
        };
        return (
            <>
                <div>
                    <b style={style} onClick={() => onToggle(id)}> {title}</b>{singer}
                    <button onClick={() => onRemove(id)}>삭제</button>
                </div>
            </>
        );
    }
    
    componentDidMount() {
        console.log("컴포넌트가 화면에 나타남");
    }

    componentWillUnmount() {
        console.log("컴포넌트가 화면에서 사라짐");
    }

    componentDidUpdate() {
        console.log("컴포넌트가 업데이트 됨");
    }

};

export default Movie2;
