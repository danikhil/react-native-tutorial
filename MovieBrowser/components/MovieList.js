import React, { Component } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";

import MovieBanner from "./MovieBanner";

import {fetchSearchResult} from "./api"

export default class MovieList extends Component {

    _Mounted = false
    state = {
        loading: false,
        movieData: [],
        page: 0,
        totalResults: 0,
    }

    renderItem = ({item}) => {
        if(this._Mounted) {
            return <MovieBanner {...item} />
        }
        else {
            return null
        }
    }

    shouldComponentUpdate(prevState) {
        if(this.props.query === "") {
            return false
        }
        else {
            return true
        }
    }

    componentDidUpdate(prevProps, prevState) {
        
        //Function Updates the states if Query is changed
        if(prevProps.query !== this.props.query) {
            // console.log(`On empty: ${this.props.query}`)
            this.setState({movieData: [], totalResults: 0, page: 0, loading: true})
        }
        //For when user reaching end
        else if(this.state.loading === true) {
            //console.log("Entering")
            this.addMovieList()
        }
    }

    addMovieList = async () => {

        const result = await fetchSearchResult(this.state.page+1,this.props.query)
        
        if(this._Mounted) {
            if (result.Response === "True") {
                this.setState((prevState) => ({movieData: [...prevState.movieData, ...result.Search], totalResults: result.totalResults, page: prevState.page+1, loading: false}))
            }
            else {
                this.setState({movieData: [], totalResults: 0, page: 0, loading: false})
            }
        }
    }

    componentDidMount() {
        this._Mounted=true
        if(this.props.query.length > 2)
            this.addMovieList()
    }

    componentWillUnmount() {
        this._Mounted=false
    }

    hasMore = () => {
        // console.log(this.state.movieData.length)
        if(this.state.movieData.length < this.state.totalResults) {
            return true
        }
        return false
    }

    updateLoading = () => {
        if(this.hasMore()) {
            this.setState({loading: true})
        }
    }

    render() {
        return (
            (this.state.totalResults)
            ? <FlatList
                style = {styles.container}
                renderItem = {this.renderItem}
                data = {[...this.state.movieData]}
                keyExtractor = {(item, index) => index.toString()}
                onEndReachedThreshold = {0.7}
                onEndReached = {this.updateLoading}
             />
            : <View style={styles.container}>
                <Text>Result Not Found</Text>
              </View>
        )        
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1
    }
})