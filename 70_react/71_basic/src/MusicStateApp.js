import React, {useRef, useState} from "react";
import MusicList from "./MusicList";
import CreateMusic from "./CreateMusic";

function MusicStateApp() {
  const [music, setMusic] = useState({
    title: "",
    singer: "",
    active: false
  });

  const [musicList, setMusicList] = useState([
    { id: 1, singer: "아이유", title: "무릎", active: false },
    { id: 2, singer: "10cm", title: "help", active: false },
    { id: 3, singer: "선우정아", title: "구애", active: false }
  ]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setMusic({
      ...music,
      [name]: value
    });
  };
  
  const nextId = useRef(4);  // 서버가 살아있는 동안 화면 리렌더링에 상관없이 값 유지
  // const nextId = 4; 는 화면 리렌더링하면 값이 바뀐다.

  const onCreate = () => {
    // 배열에 추가
    // 1. spread 연산자
    /*
    setMusicList([
      ...musicList,
      {
        id: nextId.current,
        ...music    // title, singer 와 같음
      }
    ]);
    */

    // 2. concat() 함수
    setMusicList(musicList.concat({
      id: nextId.current,
      ...music
    }));

    nextId.current += 1;
    setMusic({
      title: "",
      singer: "",
      active: false
    });
  };

  const onRemove = (id) => {
    setMusicList(musicList.filter(music => music.id !== id));
  };

  const onToggle = (id) => {
    setMusicList(musicList.map(music =>
      music.id === id ? { ...music, active: !music.active } : music
    ));
  };


  return (
    <>
      <CreateMusic music ={music} onChange={onChange} onCreate={onCreate} />
      <MusicList musicList={musicList} onRemove={onRemove} onToggle={onToggle} />
    </>
  );
}

export default MusicStateApp;
