import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar, TextInput, Button, Alert } from "react-native";

const Setter = props => (
    <View style={[{flexDirection: "row", paddingTop: 10}, styles.center]}>
        <Text style={{fontWeight: "bold", fontSize: 20, width: 60}} >{props.title}</Text>
        <Text style={{fontSize: 25}} >Min: </Text>
        <TextInput 
            style={[styles.input, {width: 60}]}
            keyboardType={"numeric"}
            defaultValue = {props.defaultMinValue}
            onChangeText = {(value) => props.onChangeText("0", value)}
        />
        <Text style={{fontSize: 25, paddingLeft: 10}}>Sec: </Text>
        <TextInput 
            style={[styles.input,{width: 60}]}
            keyboardType={"numeric"}
            defaultValue = {props.defaultSecValue}
            onChangeText = {(value) => props.onChangeText("1", value)}
        />
    </View>
)

class Timer extends Component {

    state = {
        isWork: true,
        work: {
            minute: 25,
            second: 0,
        },
        break: {
            minute: 5,
            second: 0,
        },
        timer: 25*60,
        buttonLabel: "START"
    }

    getHeading = () => {
        if (this.state.isWork) {
            return "WORK TIME"
        }
        else
        return "BREAK TIMER"
    }

    getTimer = () => {
        let second = this.state.timer%60
        if(second < 10)
        second = "0" + second.toString()
        else
        second = second.toString()
        let minute = Math.floor(this.state.timer/60).toString()
        return minute + ":" + second
    }

    inputChange = (x, y) => {
        if(y<0 || !(Number.isInteger(Number(y)))) {
            this.props.generateAlert()
            y=0
        }
        if(y==="") {
			    y=0
        }
        if(x[0]==="0") {
            if(x[1]==="0") {
                this.setState({
                    work: {
                        minute: parseInt(y),
                        second: this.state.work.second
                    }
                })
            }
            else {
                this.setState({
                    work: {
                        minute: this.state.work.minute,
                        second: parseInt(y)
                    }
                })
            }
            // this.setState(prevState => ({
            //     timer: prevState.work.minute*60 + prevState.work.second
            // }))
            if (this.state.isWork) {
              	this.reset()
            }
        }
        else {
            if(x[1]==="0") {
                this.setState({
                    break: {
                        minute: parseInt(y),
                        second: this.state.break.second
                    }
                })
            }
            else {
                this.setState({
                    break: {
                        minute: this.state.break.minute,
                        second: parseInt(y)
                    }
                })
            }
            // this.setState(prevState => ({
            //     timer: prevState.break.minute*60 + prevState.break.second
            // }))
            if (!this.state.isWork) {
            	this.reset()
            }
        }
    }

    reset = () => {
        if(this.countdown !== undefined) {
            this.setState(prevState => ({buttonLabel: "START"}))
            clearInterval(this.countdown)
            delete this.countdown
        }
        if(this.state.isWork) {
            this.setState(prevState => ({
                timer: prevState.work.minute*60+prevState.work.second
            }))
        }
        else {
            this.setState(prevState => ({
                timer: prevState.work.minute*60+prevState.work.second
            }))
        }
    }

    dec = () => {
        if(this.state.timer === 0) {
            if(this.state.isWork) {
                this.setState(prevState => ({timer: prevState.break.minute*60+prevState.break.second})
              )
            }
            else {
                this.setState(prevState => ({timer: prevState.work.minute*60+prevState.work.second})
              )
            }
            this.setState(prevState => ({isWork: !prevState.isWork}))
        }
        this.setState(prevState => ({timer: prevState.timer-1}))
    }

    pushButton = () => {
    	// consolconsole.log(this.countdown)
      	if(this.countdown === undefined ) {
        	this.setState({buttonLabel: "PAUSE"})
        	this.countdown = setInterval(this.dec, 1000)
      	}
      	else {
        	this.setState({buttonLabel: "START"})
        	clearInterval(this.countdown)
        	delete this.countdown
      	}
    }

    render() {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={styles.heading}>{this.getHeading()}</Text>
                <Text style={styles.timer}>{this.getTimer()}</Text>
                <View style={[styles.center, {flexDirection: "row", padding: 20}]}>
                    <Button 
                        title = {this.state.buttonLabel}
                        onPress = {this.pushButton}
                    />
                    <Button 
                        title = {"RESET"}
                        onPress = {this.reset}
                    />
                </View>
                <View style={{flexDirection: "column"}}>
                    <Setter 
                        onChangeText = {(x, y) => this.inputChange("0"+x, y)}
                        defaultMinValue = "25"
                        defaultSecValue = "0"
                        title = "Work Time:"
                    />
                    <Setter 
                        onChangeText = {(x, y) => this.inputChange("1"+x, y)}
                        defaultMinValue = "5"
                        defaultSecValue = "0"
                        title = "Break Time:"
                    />
                </View>
            </View>
        )
    }
}

export default class App extends Component {

  createTwoButtonAlert = () => (
    Alert.alert (
      	"Warning",
      	"Do You Wanna Break Things?",
      	[
        	{ text: "APOLOGIZE", onPress: () => console.log("APOLOGY ACCEPTED") }
      	],
      	{ cancelable: false }
		)
	)

    render() {
        return <Timer
                generateAlert = {() => this.createTwoButtonAlert()}
                />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingTop: StatusBar.currentHeight,
    },
    center: {
        alignItems: "center"
    },
    heading: {
        fontSize: 50,
        fontWeight: "bold",
    },
    timer: {
        fontSize: 60,
        fontWeight: "bold",
    },
    input: {
        borderWidth: 2,
        height: 40,
        fontSize: 18,
        textAlign: "center",
        textAlignVertical: "center"
    }
})