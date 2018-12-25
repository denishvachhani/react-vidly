import React from "react";
import Like from "./common/like";

const MoviesTable = props => {
  const { movies, onLike, onDelete } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Stock</th>
          <th scope="col">Type</th>
          <th scope="col">Rate</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {movies.map(movie => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like onClick={() => onLike(movie)} like={movie.liked} />
            </td>
            <td>
              <button
                onClick={() => onDelete(movie)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;