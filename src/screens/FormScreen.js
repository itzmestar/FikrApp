import React, { useState } from 'react';
import { StyleSheet, ToastAndroid } from 'react-native';
import Form from '../forms/Form';
import { validateContent } from '../forms/validation';

function FormScreen(props) {
    const login = async (username, password) => { 
        ToastAndroid.show(username, ToastAndroid.SHORT);
    };
    const handleResult = async (result) => {
    /* Do something After action result */
        ToastAndroid.show("handleResult", ToastAndroid.SHORT);
    };
    
    return <Form
        action={login}
        buttonText="Submit"
        afterSubmit={handleResult}
        fields={{
            email: {
                label: 'Username', 
                validators: [validateContent],
            },
            password: {
                label: 'Password',
                validators: [validateContent],
                inputProps: {
                    secureTextEntry: true
                }
            }
        }}
    />;
}

export default FormScreen;