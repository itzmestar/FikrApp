import React, {Component} from 'react';
import Form from '../forms/Form';
import { login } from '../api/authentication';
import { validateContent } from '../forms/validation';

const handleResult = async (result) => {
    if (result.ok && result.data) {
      /*await setToken(result.data.auth_token);*/
      navigation.navigate('Home');
    } else if (result.status === 401) {
      throw new Error('Invalid login.');
    } else {
      throw new Error('Something went wrong.');
    }
};
  
class LoginScreen extends Component { 
    
    render() { 
        return (
            <Form
                action={login}
                buttonText='Submit'
                afterSubmit={handleResult}
                fields={{
                    email: {
                        label: 'Email',
                        validators: [validateContent],
                        inputProps: {
                            keyboardType: 'email-address',
                        },
                    },
                    password: {
                        label: 'Password',
                        validators: [validateContent],
                        inputProps: {
                            secureTextEntry: true,
                        },
                    },
                }}
            />
        );
    }
}

export default LoginScreen;