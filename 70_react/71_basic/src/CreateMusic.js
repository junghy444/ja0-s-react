import React, {useRef,useContext} from "react";
import { MusicContext } from "./MusicReducerApp";

function CreateMusic({ music }) {
  const { title, singer } = music;
    const dispatch = useContext(MusicContext);

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch({
          type: "CHANGE",
          name,
          value
        })
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
            <input name="title" placeholder="노래 제목" onChange={onChange} value={title}></input>
            <input name="singer" placeholder="가수명" onChange={onChange} value={singer}></input>
            <button onClick={onCreate}>등록</button>
        </>
    )
}

export default CreateMusic;