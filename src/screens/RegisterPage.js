/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {GoogleSignin} from '@react-native-community/google-signin';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';

import {Loader} from '../common/Loader';
import {pattern} from '../common/email.regex';
import {UserContext} from '../contexts/UserContext';

const errors = {
  firstname: undefined,
  lastname: undefined,
  email: undefined,
  mobilenumber: undefined,
  password: undefined,
  passwordConfirm: undefined,
};

class RegisterPage extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    mobilenumber: '',
    password: '',
    passwordConfirm: '',
    loading: false,
    message: undefined,
    errors,
  };

  Submit = async () => {
    const {
      firstname,
      lastname,
      email,
      mobilenumber,
      password,
      passwordConfirm,
    } = this.state;

    if (firstname === '') {
      await this.setState((p) => ({
        ...p,
        errors: {...p.errors, firstname: '* Firstname is Required'},
      }));
    } else {
      await this.setState((p) => ({
        ...p,
        errors: {...p.errors, firstname: undefined},
      }));
    }
    if (lastname === '') {
      await this.setState((p) => ({
        ...p,
        errors: {...p.errors, lastname: '* Lastname is Required'},
      }));
    } else {
      await this.setState((p) => ({
        ...p,
        errors: {...p.errors, lastname: undefined},
      }));
    }
    if (!pattern.test(email)) {
      await this.setState((p) => ({
        ...p,
        errors: {...p.errors, email: '* Invalid Email'},
      }));
    } else {
      await this.setState((p) => ({
        ...p,
        errors: {...p.errors, email: undefined},
      }));
    }
    if (mobilenumber.length < 10) {
      await this.setState((p) => ({
        ...p,
        errors: {
          ...p.errors,
          mobilenumber: '* Mobile number must be of 10 digits',
        },
      }));
    } else {
      await this.setState((p) => ({
        ...p,
        errors: {
          ...p.errors,
          mobilenumber: undefined,
        },
      }));
    }

    if (password.length < 8) {
      await this.setState((p) => ({
        ...p,
        errors: {
          ...p.errors,
          password: '* Min 8 Digit Password is Required"',
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

    if (password !== passwordConfirm) {
      await this.setState((p) => ({
        ...p,
        errors: {
          ...p.errors,
          passwordConfirm: "* both passwords didn't matched",
        },
      }));
    } else {
      await this.setState((p) => ({
        ...p,
        errors: {
          ...p.errors,
          passwordConfirm: undefined,
        },
      }));
    }

    const isvalidated = !Object.values(this.state.errors).some((i) => !!i);

    if (isvalidated) {
      this.setState({loading: true, message: undefined});
      fetch('https://cuboidtechnologies.com/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email,
          mobilenumber: this.state.mobilenumber,
          password: this.state.password,
          passwordConfirm: this.state.passwordConfirm,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          this.setState({loading: false});
          if (res.status === 'fail') {
            this.setState({message: res.message});
          } else if (res.status === 'success') {
            this.context.setPayload({
              ...res.data,
              token: res.token,
              isLoggedIn: true,
            });
            this.props.navigation.navigate('LoginPage');
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

      fetch('https://cuboidtechnologies.com/api/users/google-facebook-signup', {
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
            this.context.setPayload({
              ...res.data,
              token: res.token,
              isLoggedIn: true,
            });
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
      fetch('https://cuboidtechnologies.com/api/users/google-facebook-signup', {
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
            this.context.setPayload({
              ...res.data,
              token: res.token,
              isLoggedIn: true,
            });
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
                    string: 'email,first_name,last_name,picture.type(large)',
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
      errors: {
        firstname,
        lastname,
        mobilenumber,
        email,
        password,
        passwordConfirm,
      },
      loading,
      message,
    } = this.state;
    return (
      <View style={styles.container}>
        {loading && <Loader />}
        <ImageBackground
          source={require('../../assets/images/SplashScreen.png')}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
          }}>
          <ScrollView style={{width: '100%'}}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.LogoText}>Register with us</Text>
            </View>
            <View style={{padding: 15, width: '100%'}}>
              <TextInput
                onChangeText={(text) => this.setState({firstname: text})}
                style={styles.LoginTextArea}
                placeholder="First Name"
                placeholderTextColor="#fff"
              />
              <View style={styles.LoginTextBorder} />
              <Text style={{color: '#FFA500', paddingTop: 2}}>
                {firstname ? firstname : ''}
              </Text>

              <TextInput
                onChangeText={(text) => this.setState({lastname: text})}
                style={styles.LoginTextArea}
                placeholder="Last Name"
                placeholderTextColor="#fff"
              />
              <View style={styles.LoginTextBorder} />
              <Text style={{color: '#FFA500', paddingTop: 2}}>
                {lastname ? lastname : ''}
              </Text>
              <TextInput
                onChangeText={(text) => this.setState({mobilenumber: text})}
                style={styles.LoginTextArea}
                keyboardType="number-pad"
                maxLength={10}
                placeholder="Phone Number"
                placeholderTextColor="#fff"
              />
              <View style={styles.LoginTextBorder} />
              <Text style={{color: '#FFA500', paddingTop: 2}}>
                {mobilenumber ? mobilenumber : ''}
              </Text>
              <TextInput
                onChangeText={(text) => this.setState({email: text})}
                style={styles.LoginTextArea}
                require="@"
                placeholder="Email"
                keyboardType="email-address"
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
              <TextInput
                onChangeText={(text) => this.setState({passwordConfirm: text})}
                style={styles.LoginTextArea}
                placeholder="Confirm Password"
                placeholderTextColor="#fff"
                secureTextEntry={true}
              />
              <View style={styles.LoginTextBorder} />
              {passwordConfirm && (
                <Text style={{color: '#FFA500', paddingTop: 2}}>
                  {passwordConfirm ? passwordConfirm : ''}
                </Text>
              )}
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
                onPress={() => this.Submit()}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    fontFamily: 'Lato-Regular',
                  }}>
                  SIGNUP
                </Text>
              </TouchableOpacity>

              <View style={{marginTop: 10, alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: '#fff', fontFamily: 'Lato-Regular'}}>
                    Already have an account?{' '}
                  </Text>

                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('LoginPage')}>
                    <Text style={{color: '#fff', fontFamily: 'Lato-Regular'}}>
                      LOG IN NOW
                    </Text>
                  </TouchableOpacity>
                </View>

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
                <TouchableOpacity style={{padding: 10}} onPress={this.fbLogin}>
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
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Logo: {
    width: 140,
    height: 140,
    marginTop: 20,
  },
  LogoText: {
    fontSize: 30,
    fontFamily: 'Lato-Bold',
    color: '#FFA500',
    marginTop: '16%',
  },
  LoginTextArea: {
    color: '#fff',
    marginTop: 0,
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
    borderColor: '#FFA500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  OrView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
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
    marginTop: 10,
  },
  SocialIcons: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    // marginRight: 15
  },
});

RegisterPage.contextType = UserContext;

export default RegisterPage;
