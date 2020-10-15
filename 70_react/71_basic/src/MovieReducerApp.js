import React, {useReducer, createContext} from "react";
import MovieList from "./MovieList";
import CreateMovie from "./CreateMovie";

const initialState = {
  movie: {
    title: "",
    director: "",
    year: "",
    active:false
  },
  movieList:[
    { id: 1, title: "스타워즈", director: "조지 루카스", year: "1977", active: false },
    { id: 2, title: "아바타", director: "제임스 카메론", year: "2009", active: false },
    { id: 3, title: "인터스텔라", director: "크리스토퍼 놀란", year: "2014", active: false }
  ]
}

function reducer(state, action) {
  const { name, value } = action;
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        movie: {
          ...state.movie,
          [name]: value
        }
      };
    case "CREATE":
      return {
        movieList: state.movieList.concat(
          {
            ...state.movie,
            id: action.id,
            active: false
          }
        ),
        movie: initialState.movie
      };
    case "REMOVE":
      return {
        ...state,
        movieList: state.movieList.filter(movie => movie.id !== action.id)
      };
    case "TOGGLE":
      return {
        ...state,
        movieList: state.movieList.map(movie => movie.id === action.id ?
          { ...movie, active: !movie.active } : movie)
      };
    default:
      throw new Error("Unhandled Error");
  };
};

export const MovieContext = createContext(null);

function MovieReducerApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  //const { title, director, year } = state.movie;
  const { movieList } = state;

  return (
    <>
      <MovieContext.Provider value={dispatch}>
        <CreateMovie movie={state.movie} />
        <MovieList movieList={movieList} />
      </MovieContext.Provider>
    </>
  );
}


export default MovieReducerApp;
