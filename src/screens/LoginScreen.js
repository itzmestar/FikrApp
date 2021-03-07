import React, { useState } from 'react';
import { Animated, Text, StyleSheet, View, TextInput, ActivityIndicator, TouchableOpacity, ToastAndroid } from 'react-native';
import Form from '../forms/Form';
import { login } from '../api/api';
import { validateContent } from '../forms/validation';
import colors from '../config/colors';
import { setToken } from '../api/token';
import { DEBUG } from '../config/config';

const LoginScreen = (props) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [errortext, setErrortext] = useState(null);
    const [opacity] = useState(new Animated.Value(1));
    const [isSubmitting, setSubmitting] = useState(false);
  
    const animationTimeout = () =>
        new Promise((resolve) => setTimeout(resolve, 500));

    const fadeOut = () =>
        Animated.timing(opacity, { toValue: 0.2, duration: 200, useNativeDriver: true }).start();

    const fadeIn = () =>
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    
    const loginUser = async () => {
    if (isSubmitting) {
      return;
    }
        setErrortext(null);
        if (!username) {
          setErrortext("Provide Username!");
          if(DEBUG)
            console.log("Provide Username!");
            return;
        } else if (!password) {
            setErrortext("Provide Password!");
            console.log("Provide Password!");
            return;
        }
        fadeOut();
        setSubmitting(true);
      const [result] = await Promise.all([
      login(username, password),
      animationTimeout(),
      ]);
      setSubmitting(false);
      fadeIn();
    if (result.ok) {
      console.log("Login success");
      await setToken(result.data);
      ToastAndroid.show("Login Successful", ToastAndroid.SHORT);
      props.navigation.navigate('Home');
    } else if (result.error) {
      setErrortext(result.error);
      ToastAndroid.show(result.error, ToastAndroid.SHORT);
    }
    else{
        console.log("Login Failed");
        setErrortext("Login Failed!");
        ToastAndroid.show("Login Failed!", ToastAndroid.SHORT);
      }
    };
    return (
        <View style={styles.container}>
            <Animated.View style={opacity}>
                {isSubmitting && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="green" />
        </View>
      )}
        <TextInput placeholder="Username"
          style={styles.inputStyle}
          onChangeText={(username) => setUsername(username)} />
        <TextInput placeholder="Password"
          secureTextEntry={true}
          style={styles.inputStyle}
          onChangeText={(password) => setPassword(password)} />
        {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
          ) : null}
        </Animated.View>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
                onPress={loginUser}>
                {isSubmitting ? (
          <ActivityIndicator size="small" color="#FFFFFF" style={styles.buttonTextStyle} />
        ) : (
                        <Text style={styles.buttonTextStyle}>Login</Text>
                        )}
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    activityIndicatorContainer: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
      inputStyle: {
        marginTop: 20,
        width: 300,
        height: 50,
        paddingHorizontal: 20,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: colors.lightGrey,
        color: 'black',
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
  },
      
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    logo:{
        width: 100,
        height: 100,
        position: "absolute",
        top: 70,
    },
  buttonStyle: {
    backgroundColor: 'green',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 25,
    width: 300,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'grey',
    elevation: 8
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 15,
    alignItems: 'center',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Regular',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
})

export default LoginScreen;