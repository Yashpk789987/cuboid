/* eslint-disable no-shadow */
// import the library
import React, {useCallback, useEffect, useState} from 'react';

//import Usable components
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

//Import Drawer Page
import DrawerPage from './src/common/DrawerPage';

// import Files
import SplashScreen from './src/screens/SplashScreen';
import LoginPage from './src/screens/LoginPage';
import ForgetPassword from './src/screens/ForgetPassword';
import OTPPage from './src/screens/OTPPage';
import OTPPage1 from './src/screens/OTPPage1';
import RegisterPage from './src/screens/RegisterPage';
import FooterPage from './src/common/FooterPage';
import WelcomeScreen from './src/screens/WelcomeScreen';
import PostProperties from './src/screens/PostProperties';
import ProfilePage from './src/screens/ProfilePage';
import EditProfile from './src/screens/EditProfile';
import SearchFlipbook from './src/screens/SearchFlipbook';
import ChangePassword from './src/screens/ChangePassword';
import SavedFlipbook from './src/screens/SavedFlipbook';
import SubscriptionPage from './src/screens/SubscriptionPage';
import LookingHouseSteps from './src/screens/LookingHouseSteps';
import LookingLandSteps from './src/screens/LookingLandSteps';
import LookingHotelSteps from './src/screens/LookingHotelSteps';
import LookingWarehouseSteps from './src/screens/LookingWarehouseSteps';
import VisitFlipbook from './src/screens/VisitFlipbook';
import FlipbookDiscription from './src/screens/FlipbookDiscription';
import ThanksPage from './src/screens/ThanksPage';
import ContactUS from './src/screens/ContactUS';
import FAQPage from './src/screens/FAQPage';
import NeedHelp from './src/screens/NeedHelp';
import MySubscriptionPage from './src/screens/MySubscriptionPage';
import Test1 from './src/screens/Test1';
import Test2 from './src/screens/Test2';

import Modal1 from './src/screens/Modal1';
import Modal2 from './src/screens/Modal2';

// import Tabs
import Tabs from './src/common/Tabs';
import {initialState, UserContext} from './src/contexts/UserContext';
import {AsyncStorage, LogBox} from 'react-native';
import {Loader} from './src/common/Loader';
import {StatusBar} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';

// Create Stacks form Drawer,Appavigator,Tabs Stack
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

LogBox.ignoreAllLogs();

function HomeScreenStack() {
  return (
    <Stack.Navigator headerMode={false} initialRouteName="WelcomeScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="FooterPage" component={FooterPage} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="OTPPage" component={OTPPage} />
      <Stack.Screen name="OTPPage1" component={OTPPage1} />
      <Stack.Screen name="RegisterPage" component={RegisterPage} />
      <Stack.Screen name="PostProperties" component={PostProperties} />
      <Stack.Screen name="ProfilePage" component={ProfilePage} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="SearchFlipbook" component={SearchFlipbook} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="SavedFlipbook" component={SavedFlipbook} />
      <Stack.Screen name="SubscriptionPage" component={SubscriptionPage} />
      <Stack.Screen name="LookingHouseSteps" component={LookingHouseSteps} />
      <Stack.Screen name="LookingLandSteps" component={LookingLandSteps} />
      <Stack.Screen name="LookingHotelSteps" component={LookingHotelSteps} />
      <Stack.Screen
        name="LookingWarehouseSteps"
        component={LookingWarehouseSteps}
      />
      <Stack.Screen name="VisitFlipbook" component={VisitFlipbook} />
      <Stack.Screen
        name="FlipbookDiscription"
        component={FlipbookDiscription}
      />
      <Stack.Screen name="FAQPage" component={FAQPage} />
      <Stack.Screen name="NeedHelp" component={NeedHelp} />
      <Stack.Screen name="ThanksPage" component={ThanksPage} />
      <Stack.Screen name="MySubscriptionPage" component={MySubscriptionPage} />
      <Stack.Screen name="ContactUS" component={ContactUS} />
      <Stack.Screen name="Test1" component={Test1} />
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Test2" component={Test2} />
      {/* <Stack.Screen name="Test3" component={Test3} /> */}
      <Stack.Screen name="Modal1" component={Modal1} />
      <Stack.Screen name="Modal2" component={Modal2} />
    </Stack.Navigator>
  );
}

function App(props) {
  const [payload, setPayload] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const loadPayload = useCallback(async () => {
    try {
      const _payload = await AsyncStorage.getItem('payload');
      if (_payload) {
        const p = JSON.parse(_payload);
        fetch('https://cuboidtechnologies.com/api/users/userprofile', {
          headers: {
            Authorization: `Bearer ${p.token}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.status === 'success') {
              setPayload({
                isLoggedIn: true,
                token: p.token,
                user: result.data.user,
              });
              setLoading(false);
            } else if (result.status === 'error') {
              setPayload(initialState);
              logout();
              setLoading(false);
            }
          })
          .catch((err) => console.log(err));
      } else {
        setPayload(initialState);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setPayload(initialState);
      setLoading(false);
    }
  }, []);

  const _setPayload = async (payload) => {
    try {
      setPayload(payload);
      await AsyncStorage.setItem('payload', JSON.stringify(payload));
    } catch (error) {
      console.log(error);
      setPayload(initialState);
    }
  };

  useEffect(() => {
    loadPayload();
    GoogleSignin.configure();
  }, [loadPayload]);

  const logout = async () => {
    try {
      setPayload(initialState);
      await AsyncStorage.removeItem('payload');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{payload, setPayload: _setPayload, logout}}>
      {loading && <Loader />}
      <NavigationContainer>
        <StatusBar backgroundColor="transparent" translucent />
        <Drawer.Navigator drawerContent={(props) => <DrawerPage {...props} />}>
          <Drawer.Screen
            name="HomeScreenStack"
            options={{drawerLabel: 'Home Screen Option'}}
            component={HomeScreenStack}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;

// <FlipPage orientation="horizontal">
//   <FlipPagePage>
//     <Text>Page 1</Text>
//   </FlipPagePage>
//   <FlipPagePage>
//     <Text>Page 2</Text>
//   </FlipPagePage>
//   <FlipPagePage>
//     <Text>Page 3</Text>
//   </FlipPagePage>
// </FlipPage>;
