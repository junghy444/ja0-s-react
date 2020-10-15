import React, { useState } from "react";

function StatePractice() {
    const [color, setColor] = useState("black");
    
    return (
        <>
            <div>
                <p style={{ color }}>색상 바꾸기</p>
                <button onClick={() => { setColor("red");}}>빨간색</button>
                <button onClick={() => { setColor("blue");}}>파란색</button>
                <button onClick={() => { setColor("green");}}>초록색</button>
            </div>
        </>
    )
}

export default StatePractice;