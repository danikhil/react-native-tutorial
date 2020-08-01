import React, { Component } from "react";
import { ScrollView, Text, Image, View, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';
import ProgressBar from 'react-native-progress/Bar'

import {fetchMovieDetails} from './api'

const renderItem = (item, index) => {

    function getRating() {
        if(item.Value[item.Value.length-1]==='%') {
            return parseInt(item.Value)/100
        }
        else {
            return item.Value.split('/')[0]/item.Value.split('/')[1]
        }
    }

    const getColor = () => {
        if(indicator<0.15)
        return "black"
        else if(indicator < 0.35)
        return "red"
        else if(indicator < 0.7)
        return "orange"
        return "green"
    }

    const indicator = getRating();

    return (
        <View key={index} style={styles.ratings}>
            <Text style={{paddingBottom: 8}}>{item.Source} ({item.Value}):</Text>
            <ProgressBar progress={indicator} animated={false} width={null} height={10} borderRadius={8} borderWidth={2} color={getColor()}/>
        </View>
    )
}

export default class MovieDetails extends Component {

    _Mounted = false
    state = {
        details: {},
        webViewHeight: 0,
    }

    fetchDetails = async () => {
        const result = await fetchMovieDetails(this.props.imdbID)

        if(this._Mounted) {
            this.setState({details: result})
        }
    }

    componentDidMount() {
        this._Mounted = true
        this.fetchDetails()
    }

    componentWillUnmount() {
        this._Mounted = false
    }

    processProperty = (property) => {
        if(property) {
            return property
        }
        else
            return "N/A"
    }

    // Feature yet to be enable currently doesn't work  
    // setWebViewHeight = (event) => {
    //     console.log(event)
    //     const height = Number(event.title)
    //     console.log(height)
    //     this.setState({webViewHeight: height})
    // }

    onPosterFailue = () => {
        let detailsCopy = this.state.details
        detailsCopy.Poster = "https://cdn2.iconfinder.com/data/icons/designer-skills/128/react-512.png"
        this.setState({details: detailsCopy})
    }

    render() {
        return  (
            <ScrollView style={styles.container}>
                <View style={styles.posterView}>
                    <Image
                        style = {styles.poster}
                        source = {{uri: this.state.details.Poster}}
                        resizeMode = {'stretch'}
                        onError = {(erros) => {this.onPosterFailue()}}
                    />
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.title}>{this.processProperty(this.state.details.Title)}</Text>
                </View>
                <View style={styles.subDetailsView}>
                    <Text>({this.processProperty(this.state.details.imdbRating)}/10), {this.processProperty(this.state.details.Year)}, {this.processProperty(this.state.details.Runtime)}</Text>
                    <Text>{this.processProperty(this.state.details.Genre)}, ({this.processProperty(this.state.details.Rated)}) </Text>
                </View>
                <View style={styles.plotView}>
                    {/* <WebView
                        originWhitelist={['*']}
                        style={{height: 50}}
                        scrollEnabled={false}
                        automaticallyAdjustContentInsets= {false}
                        javaScriptEnabled= {true}
                        source={{
                            html:
                            `<style> p {text-align: justify}</style>
                            <p id="plot">
                            ${this.state.details.Plot}
                            </p>
                            <script>
                                const p = document.getElementById("plot")
                                p.innerHtml = "hellpo"
                                document.title = p.style.height
                                const p2 = document.createElement("p")
                                p2.innerHTML = p.style.height.toString()
                                document.getElementByTagName("html").appendChild(p2)
                            </script>`
                        }}
                        onNavigationStateChange={(event) => this.setWebViewHeight(event)}
                    /> */}
                    <Text style={styles.plot}>{this.processProperty(this.state.details.Plot)}</Text>
                </View>
                <View style={styles.ratingsView}> 
                    {
                        (typeof(this.state.details.Ratings) === "object")
                        ? (this.state.details.Ratings.map((rating, index) => renderItem(rating, index))) 
                        : null
                    }
                </View>
                <View style={styles.extras}>
                    <Text><Text style={{fontWeight: "bold"}}>Director:</Text> {this.processProperty(this.state.details.Director)}</Text>
                    <Text><Text style={{fontWeight: "bold"}}>Box Office:</Text> {this.processProperty(this.state.details.BoxOffice)}</Text>
                    <Text><Text style={{fontWeight: "bold"}}>Production:</Text> {this.processProperty(this.state.details.Production)}</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        margin: 10
    },
    posterView: {
        flexDirection: "row"
    },
    poster: {
        flex: 1,
        height: 450
    },
    titleView: {
        marginTop: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 25
    },
    subDetailsView: {
        paddingTop: 10,
    },
    subDetails: {
        
    },
    plotView: {
        flex: 1,
        paddingTop: 10
    },
    plot: {
        fontStyle: "italic"
    },
    ratingsView: {
        
    },
    ratings: {
        paddingTop: 10,
    },
    extras: {
        paddingTop: 10
    }
})