import React from "react";

function Hello2({ messages=[] , isLoggedIn}) {
  return (
    <>
      <div>
      {messages.length > 0 && messages.length + "건의 메시지가 있습니다."}
      </div>
      <div>
        {isLoggedIn && "로그인 되었습니다"}
        {/*{ isLoggedIn?"로그인 되었습니다": "로그인 되지 않았습니다." }*/}
      </div>
    </>
  );
}

export default Hello2;
