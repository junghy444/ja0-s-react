import React from "react";
import PropTypes from "prop-types";

function HelloPractice({ id="0", name="이름 없음", children="별명 없음", color="black"}) {
    return (
      <>
        <div style={{ color }}>
          학번 : {id}<br/>
          이름 : {name}<br/>
          별명 : {children}<br/>
        </div>
      </>
    );
  }

HelloPractice.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    children: PropTypes.string
}
  
export default HelloPractice;