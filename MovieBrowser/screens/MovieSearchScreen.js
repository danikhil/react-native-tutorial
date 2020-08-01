import React, { Component } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

import MovieList from "./../components/MovieList"

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    textInput: {
        borderWidth: 2,
        borderRadius: 30,
        marginTop: 12,
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 12,
        fontSize: 18,
        height: 45,
        paddingLeft: 20
    }
})

const lightTheme = StyleSheet.create({
    textInput: {

    }
})

const darkTheme = StyleSheet.create({
    textInput: {
        color: "white",
        backgroundColor: "black"
    }
    
})

// const addKeys = (val, key) => ({key: key.to_string(), ...val})

export default class MovieSearchScreen extends Component {

    state= {
        theme: "light",
        renderList: false,
        query: "",
    }

    getTheme = () => {
        if (this.state.theme === "light") {
            return lightTheme
        }
        else {
            return darkTheme
        }
    }

    onQueryChange = (query) => {
        this.setState({query: query})
        if(query === "") {
            this.setState({renderList: false})
        }
        else {
            this.setState({renderList: true})
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    style={[styles.textInput, this.getTheme().textInput]}
                    onChangeText = {(value) => this.onQueryChange(value)}
                    placeholder = "Search movie, anime etc"
                />
                {this.state.renderList &&
                    <MovieList
                        query = {this.state.query}
                    />
                }
            </View>
        )
    }
}