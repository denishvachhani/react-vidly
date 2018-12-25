import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: "",
    pageSize: 4,
    currentPage: 1
  };

  componentDidMount() {
    const genres = [{ name: "All Generes" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLikeClick = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handelPageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = item => {
    this.setState({ selectedGenre: item, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      movies: allMovies,
      genres,
      selectedGenre,
      pageSize,
      currentPage
    } = this.state;

    if (count === 0) return <p>There are no movies in database</p>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <h1>Showing {filtered.length} in the database</h1>
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
                      <Like
                        onClick={() => this.handleLikeClick(movie)}
                        like={movie.liked}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => this.handleDelete(movie)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              itemCount={filtered.length}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              onPageChange={this.handelPageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
