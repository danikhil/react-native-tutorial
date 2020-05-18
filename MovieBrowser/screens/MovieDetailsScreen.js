import React, { Component } from "react";
import MovieDetails from './../components/MovieDetails'

export default class MovieDetailsScreen extends Component {
    render() {
        const imdbID = this.props.route.params.imdbID
        return (
            <MovieDetails
                imdbID = {imdbID}
            />
        )
    }
}