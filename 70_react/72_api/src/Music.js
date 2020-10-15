import React from "react";
import { useAsync } from "react-async";
import { getMusic } from "./api";

function Music({id}) {
    const { data: music, error, isLoading } = useAsync({
        promiseFn: getMusic,
        id,
        watch:id    // id가 바뀌면 다시 호출
    });

    if (isLoading) return <div>로딩중...</div>;
    if (error) return <div>에러가 발생했습니다.</div>;
    if (!music) return null;

    return (
        <>
            <h3>{music.title}</h3>
            <div>{music.singer}</div>
        </>
    )
}

export default Music;