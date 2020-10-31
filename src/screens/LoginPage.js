/* eslint-disable react-native/no-inline-styles */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Checkbox} from 'react-native-paper';
import {GoogleSignin} from '@react-native-community/google-signin';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';

import {pattern} from '../common/email.regex';
import {Loader} from '../common/Loader';
import {UserContext} from '../contexts/UserContext';

const errors = {
  email: undefined,
  password: undefined,
};

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
      isSelected: false,
      setSelection: true,
      checked: false,
      email: '',
      password: '',
      errors,
      loading: false,
      message: undefined,
    };
  }

  Submit = async () => {
    const {email, password} = this.state;

    if (email.includes('@')) {
      if (!pattern.test(email)) {
        await this.setState((p) => ({
          ...p,
          errors: {
            ...p.errors,
            email: '* please provide valid email/phone number',
          },
        }));
      } else {
        await this.setState((p) => ({
          ...p,
          errors: {...p.errors, email: undefined},
        }));
      }
    } else {
      if (email.length < 10) {
        await this.setState((p) => ({
          ...p,
          errors: {
            ...p.errors,
            email: '* please provide valid email/phone number',
          },
        }));
      } else {
        await this.setState((p) => ({
          ...p,
          errors: {
            ...p.errors,
            email: undefined,
          },
        }));
      }
    }

    if (password.length < 8) {
      await this.setState((p) => ({
        ...p,
        errors: {
          ...p.errors,
          password: '* please provide valid password',
        },
      }));
    } else {
      await this.setState((p) => ({
        ...p,
        errors: {
          ...p.errors,
          password: undefined,
        },
      }));
    }

    const isvalidated = !Object.values(this.state.errors).some((i) => !!i);

    if (isvalidated) {
      this.setState({loading: true, message: undefined});
      fetch('https://cuboidtechnologies.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          this.setState({loading: false});
          if (res.status === 'fail' || res.status === 'error') {
            this.setState({message: res.message});
          } else if (res.status === 'success') {
            this.context.setPayload({...res.data, isLoggedIn: true});
            this.props.navigation.navigate('WelcomeScreen');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  googleLogin = async () => {
    this.setState({loading: true, message: undefined});
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      const {
        user: {email, familyName, givenName, photo},
      } = userInfo;

      fetch('https://cuboidtechnologies.com/api/users/google-facebook-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: givenName,
          lastname: familyName,
          email: email,
          imagepath: photo,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          this.setState({loading: false});
          if (res.status === 'fail') {
            this.setState({message: res.message});
          } else if (res.status === 'success') {
            this.context.setPayload({...res.data, isLoggedIn: true});
            this.props.navigation.navigate('WelcomeScreen');
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      this.setState({loading: false, message: 'something went wrong '});
      console.log(error);
    }
  };

  fbCallback = (error, result) => {
    this.setState({loading: true, message: undefined});
    if (error) {
    } else {
      fetch('https://cuboidtechnologies.com/api/users/google-facebook-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: result.first_name,
          lastname: result.last_name,
          email: result.email ? result.email : '',
          imagepath: result.picture.data.url,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          this.setState({loading: false});
          if (res.status === 'fail' || res.status === 'error') {
            this.setState({message: res.message});
          } else if (res.status === 'success') {
            this.context.setPayload({...res.data, isLoggedIn: true});
            this.props.navigation.navigate('WelcomeScreen');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  fbLogin = async () => {
    const callBack = this.fbCallback;
    LoginManager.logOut();
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async function (result) {
        if (result.isCancelled) {
          // login cancelled
        } else {
          AccessToken.getCurrentAccessToken().then(async (data) => {
            let token = data.accessToken.toString();

            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: token,
                parameters: {
                  fields: {
                    string: 'email,first_name,last_name,picture',
                  },
                },
              },
              callBack,
            );
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  render() {
    const {
      errors: {email, password},
      loading,
      message,
    } = this.state;
    return (
      <View style={styles.container}>
        {loading && <Loader />}
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={require('../../assets/images/SplashScreen.png')}>
          <View style={{width: '100%', height: '100%'}}>
            <ScrollView>
              <View style={{width: '100%'}}>
                <Image
                  style={styles.Logo}
                  source={require('../../assets/Icons/Coboid.png')}
                />
                <Text style={styles.LogoText}>Login with us</Text>
              </View>

              <View style={{width: '100%', marginTop: 50, padding: 10}}>
                <TextInput
                  onChangeText={(text) => this.setState({email: text})}
                  style={styles.LoginTextArea}
                  placeholder="Email or Phone number"
                  placeholderTextColor="#fff"
                />
                <View style={styles.LoginTextBorder} />
                <Text style={{color: '#FFA500', paddingTop: 2}}>
                  {email ? email : ''}
                </Text>
                <TextInput
                  onChangeText={(text) => this.setState({password: text})}
                  style={styles.LoginTextArea}
                  placeholder="Password"
                  placeholderTextColor="#fff"
                  secureTextEntry={true}
                />
                <View style={styles.LoginTextBorder} />
                <Text style={{color: '#FFA500', paddingTop: 2}}>
                  {password ? password : ''}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 8,
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#fff', fontFamily: 'Lato-Regular'}}>
                    Remember Me
                  </Text>
                  <Checkbox
                    uncheckedColor="#fff"
                    status={this.state.checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      this.setState({checked: !this.state.checked});
                    }}
                  />
                </View>
                {message && (
                  <Text
                    style={{
                      color: '#FFA500',
                      paddingTop: 8,
                      textAlign: 'center',
                    }}>
                    {message ? message : ''}
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.LoginBtnView}
                  onPress={this.Submit}>
                  <Text style={{fontFamily: 'Lato-Bold', fontSize: 20}}>
                    LOGIN
                  </Text>
                </TouchableOpacity>

                <View style={{marginTop: '5%', alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ForgetPassword')
                    }>
                    <Text style={{color: '#fff', fontFamily: 'Lato-Regular'}}>
                      Forgot Password
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.OrView}>
                    <View style={styles.DashLink} />
                    <Text style={{color: '#fff', fontFamily: 'Lato-Regular'}}>
                      {' '}
                      OR{' '}
                    </Text>
                    <View style={styles.DashLink} />
                  </View>
                </View>
                <View style={styles.FacebookView}>
                  <TouchableOpacity
                    style={{padding: 10}}
                    onPress={this.fbLogin}>
                    <Image
                      style={styles.SocialIcons}
                      source={require('../../assets/Icons/Facebook1.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.googleLogin}
                    style={{padding: 10}}>
                    <Image
                      style={styles.SocialIcons}
                      source={require('../../assets/Icons/Gmail.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Logo: {
    width: 140,
    height: 140,
    marginTop: 30,
    alignSelf: 'center',
  },
  LogoText: {
    fontSize: 30,
    fontFamily: 'Lato-Bold',
    color: '#FFA500',
    // fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
  },
  LoginTextArea: {
    color: '#fff',
    marginTop: 4,
    fontFamily: 'Lato-Regular',
  },
  LoginTextBorder: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#fff',
    marginTop: -5,
  },
  LoginBtnView: {
    marginTop: '6%',
    backgroundColor: '#F6D700',
    width: '100%',
    height: 40,
    borderRadius: 20,

    alignItems: 'center',
    justifyContent: 'center',
  },
  OrView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '5%',
    alignItems: 'center',
  },
  DashLink: {
    borderWidth: 1,
    borderColor: '#fff',
    width: 50,
    height: 1,
  },
  FacebookView: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  SocialIcons: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    // marginRight: 15
  },
});

LoginPage.contextType = UserContext;

export default LoginPage;
