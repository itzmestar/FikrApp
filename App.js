/**
 * FikrApp in React Native
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import FormScreen from './src/screens/FormScreen';
import SplashScreen from "./src/screens/SplashScreen";
import { getToken } from './src/api/token';

const Drawer = createDrawerNavigator();

const AuthContext = React.createContext();

function App({ navigation }) {
    const [state, dispatch] = React.useReducer(
      (prevState, action) => {
        switch (action.type) {        
          case 'RESTORE_TOKEN':            
            return {            
              ...prevState,              
              userToken: action.token,            
              isLoading: false,            
            };          
          case 'SIGN_IN':            
            return {            
              ...prevState,              
              isSignout: false,            
              userToken: action.token,            
            };          
          case 'SIGN_OUT':            
            return {            
              ...prevState,              
              isSignout: true,            
              userToken: null,            
            };          
        }
      },
      {
        isLoading: true,
        isSignout: false,
        userToken: null,
      }
    );
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      userToken = getToken();

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);
  const authContext = React.useMemo(
    () => ({

    }), []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Drawer.Navigator>
        {
          state.isLoading ? (
                // We haven't finished checking for the token yet
              <Drawer.Screen name="Splash" component={SplashScreen} />            
          ) : state.userToken == null ? (
            // No token found, user isn't signed in            
              <Drawer.Screen name="Login" component={LoginScreen} />            
          ) : (// User is signed in
                <React.Fragment>
                  <Drawer.Screen name="Home" component={HomeScreen} />
                  <Drawer.Screen name="Form" component={FormScreen} />
                </React.Fragment>
              )
        }
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
