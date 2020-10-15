import React, { useEffect, useMemo, useContext } from "react";
import { MovieContext } from "./MovieReducerApp";

function Movie({ movie }) {
  const { id, title, director, year, active } = movie;
  const style = {
    color: active ? "green" : "black",
    cursor: "pointer"
  };

  useEffect(() => {
    console.log("화면에 등장");
    console.log("업데이트 후", movie);
    return () => {
      console.log("화면에서 사라짐");
    }
  }, [movie]);

  const dispatch = useContext(MovieContext);

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
        <b
          style={style}
          onClick={() => {
            onToggle(id);
          }}
        >
          {title}
        </b>
        ({director}, {year})<button onClick={() => onRemove(id)}>삭제</button>
      </div>
    </>
  );
}

function MovieList({ movieList}) {
  const countActiveMovie = () => {
    console.log("active");
    return movieList.filter(movie => movie.active).length;
  };
  const count = useMemo(countActiveMovie, [movieList]);

  return (
    <>
      {movieList.map(movie => (
        <Movie
          key={movie.id}
          movie={movie}
        />
      ))}
      <hr />
      <div>Active된 Movie 수 : {count}</div>
    </>
  );
}
export default MovieList;
