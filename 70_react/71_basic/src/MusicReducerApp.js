import React, { useReducer, createContext } from "react";
import MusicList from "./MusicList";
import CreateMusic from "./CreateMusic";
import StatePractice from "./StatePractice";

const initialState = {
  music:{
    title: "",
    singer: "",
    active: false
  },
  musicList:[
    { id: 1, singer: "아이유", title: "무릎", active: false },
    { id: 2, singer: "10cm", title: "help", active: false },
    { id: 3, singer: "선우정아", title: "구애", active: false }
  ]
}

function reducer(state, action) {
  const { name, value } = action;
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        music: {
          ...state.music,
          [name]: value
        }
      };
    case "CREATE":
      return {
        musicList: state.musicList.concat(
          {
            ...state.music,
            id: action.id,
            active: false
          }
        ),
        music: initialState.music
      };
    case "REMOVE":
      return {
        ...state,
        musicList: state.musicList.filter(music => music.id !== action.id)
      };
    case "TOGGLE":
      return {
        ...state,
        musicList: state.musicList.map(music => music.id === action.id ?
          { ...music, active: !music.active } : music)
      };
    default:
      throw new Error("Unhandled Error");
  };
};

export const MusicContext = createContext(null);

function MusicReducerApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  //const { title, singer } = state.music;
  const { musicList } = state;


  return (
    <>
      <MusicContext.Provider value={dispatch}>
        <CreateMusic music={state.music} />
        <MusicList musicList={musicList} />
      </MusicContext.Provider>
    </>
  );
}

export default MusicReducerApp;
