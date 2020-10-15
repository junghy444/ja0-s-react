import React, {useRef, useContext} from "react";
import { MovieContext } from "./MovieReducerApp";

function CreateMovie({ movie }) {
    const { title, director, year } = movie;
    const dispatch = useContext(MovieContext);

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch({
          type: "CHANGE",
          name,
          value
        });
      };
    
      const nextId = useRef(4);
    
      const onCreate = () => {
        dispatch({
          type: "CREATE",
          id: nextId.current
        });
    
        nextId.current += 1;
      };


    return (
        <>
            <input name="title"placeholder="영화 제목"onChange={onChange} value={title}></input>
            <input name="director"placeholder="영화 감독"onChange={onChange} value={director}></input>
            <input name="year" placeholder="개봉 연도" onChange={onChange} value={year}></input>
            <button onClick={onCreate}>등록</button>
        </>
    )
}

export default CreateMovie;