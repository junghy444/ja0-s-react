import React from "react";  // const React = require("react");
import PropTypes from "prop-types";

// const props = { name: "홍길동", color: "blue", children: "내용 없음"}
function Hello({ name = "이름 없음", color = "black", children = "내용 없음" }) {
  name = "아무개";
  return (
    <>
      <div style={{ color }}>안녕하세요, {name}님</div>
      <div>{children}</div>
    </>
  )
}

Hello.defaultProps = {
  //name: "이름 없음2",
  color: "black",
  children: "내용 없음2"
};

Hello.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  children: PropTypes.string
}

export default Hello;
