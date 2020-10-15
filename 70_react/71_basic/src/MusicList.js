import React, { useEffect, useMemo, useContext } from "react";
import { MusicContext } from "./MusicReducerApp";

function Music({ music }) {
    const { id, title, singer, active } = music;
    const style = {
        color: active ? "blue" : "black",
        cursor: "pointer"
    };
    
    // 리렌더링 때마다 호출
    /*
    useEffect(() => {
        console.log("호출");
    })
    */
    
    // 마운트 또는 언마운트 시에만 호출
    useEffect(() => {
        console.log("화면에 등장");
        // REST API, 외부 라이브러리 사용
        console.log("업데이트 후", music);
        return () => {
            // clean-up 함수
            console.log("화면에서 사라짐");
        }
    }, [music]);    // 의존 값이 들어있는 배열

    const dispatch = useContext(MusicContext);

    const onRemove = (id) => {
        dispatch({
            type: "REMOVE",
            id
        });
    };
    
    const onToggle = (id) => {
        dispatch({
            type: "TOGGLE",
            id
        });
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

function MusicList({ musicList }) {    
    const countActiveMusic = () => {
        console.log("active");
        return musicList.filter(music => music.active).length;
        
    }; 
    const count = useMemo(countActiveMusic, [musicList]);

    return (
        <>
            {musicList.map(music => (
                <Music key={music.id} music={music} />
            ))}
            <hr />
            <div>Active 된 Music 수: {count}</div>
        </>
    );
};

export default MusicList;