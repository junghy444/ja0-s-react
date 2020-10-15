import React, { useEffect, useState } from "react";
import { useAsync } from "react-async";
import Music from "./Music";
import { getMusicList } from "./api";

function MusicList() {
    const [id, setId] = useState(null);
    const { data: musicList, error, isLoading, reload } = useAsync({
        promiseFn: getMusicList
    });

    // 화면이 마운트될 때만 실행
    useEffect(() => {
        getMusicList();
    }, []);
    
    if (isLoading) return <div>로딩중...</div>;
    if (error) return <div>에러가 발생했습니다.</div>;
    if (!musicList) return null;

    return (
        <>
            <ul>
                {musicList.map(music => (
                    <li key={music.id} onClick={()=>setId(music.id)} style={{cursor:"pointer"}}>
                        {music.title}({music.singer})
                    </li>
                ))}
            </ul>
            <button onClick={reload}>불러오기</button>
            {id && <Music id={id} />}
        </>
    )
}

export default MusicList;