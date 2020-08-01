import React, { Component } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
    thumbnail: {
        height: 70,
        width: 70,
        borderRadius: 20,
    },
    container: {
        flexDirection: "row",
        padding: 10,
    },
    title: {
        fontWeight: "bold"
    },
    text: {

    },
    details: {
        flex: 1,
        height: 40,
        paddingLeft: 20,
        paddingTop: 5
    }
})

const MovieBanner = props => {

    const navigation = useNavigation()

    let posterLink = props.Poster

    function onImageFailure() {
        posterLink = "https://cdn2.iconfinder.com/data/icons/designer-skills/128/react-512.png"
    }

    return (
        <TouchableOpacity 
            onPress={() => {
                navigation.navigate("MovieDetails", {
                    imdbID: props.imdbID,
                    Title: props.Title
                })
            }}
            activeOpacity= {0.5}
        >
            <View style={styles.container}>
                <Image
                    style={styles.thumbnail}
                    source = {{uri: posterLink}}
                    resizeMode = {'stretch'}
                    onError = {(error) => onImageFailure()}
                />
                <View style={styles.details}>
                    <Text style={styles.title}>{props.Title}</Text>
                    <Text style={styles.text}>{props.Year} ({props.Type})</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default MovieBanner