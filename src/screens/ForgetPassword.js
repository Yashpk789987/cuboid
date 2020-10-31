/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {pattern} from '../common/email.regex';
import {Loader} from '../common/Loader';

const errors = {
  email: undefined,
};

function ForgetPassword() {
  const [message, setMessage] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [_errors, setErrors] = useState(errors);

  const submit = async () => {
    if (email.includes('@')) {
      if (!pattern.test(email)) {
        setErrors((e) => ({
          ...e,
          email: '* please provide valid email/phone number',
        }));
      } else {
        setErrors((e) => ({...e, email: undefined}));
        callAPI();
      }
    } else {
      if (email.length < 10) {
        setErrors((e) => ({
          ...e,
          email: '* please provide valid email/phone number',
        }));
      } else {
        setErrors((e) => ({
          ...e,
          email: undefined,
        }));
        callAPI();
      }
    }
  };

  const callAPI = async () => {
    setLoading(true);
    setMessage(undefined);
    fetch('https://cuboidtechnologies.com/api/users/forgotPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === 'fail' || res.status === 'error') {
          setLoading(false);
          setMessage(res.message);
        } else if (res.status === 'success') {
          setLoading(false);
          setMessage('link to reset password has been sent to your mail.');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('../../assets/images/SplashScreen.png')}>
        <View style={{width: '100%', height: '100%', paddingTop: 22}}>
          <ScrollView>
            <View style={{width: '100%'}}>
              <Image
                style={styles.Logo}
                source={require('../../assets/Icons/Coboid.png')}
              />
              <Text style={styles.LogoText}>Forget Password</Text>
            </View>
            {/* form area */}
            <View style={{width: '100%', marginTop: 100, padding: 10}}>
              <TextInput
                style={styles.LoginTextArea}
                placeholder="Email or Phone number"
                placeholderTextColor="#fff"
                onChangeText={(text) => setEmail(text)}
              />
              <View style={styles.LoginTextBorder} />
              <Text style={{color: '#FFA500', paddingTop: 2}}>
                {_errors.email ? _errors.email : ''}
              </Text>
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
                onPress={() => submit()}>
                <Text style={{fontFamily: 'Lato-Bold', fontSize: 20}}>
                  SEND OTP
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
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
    alignSelf: 'center',
    marginTop: 30,
  },
  LoginTextArea: {
    color: '#fff',
    marginTop: 10,
    fontFamily: 'Lato-Regular',
  },
  LoginTextBorder: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#fff',
    marginTop: -5,
  },
  LoginBtnView: {
    marginTop: '20%',
    backgroundColor: '#F6D700',
    width: 150,
    height: 40,
    borderRadius: 20,
    marginLeft: '55%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ForgetPassword;
