/* eslint-disable react-native/no-inline-styles */

import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {StackActions} from '@react-navigation/native';

import FooterPage from '../common/FooterPage';
import {Loader} from '../common/Loader';
import {UserContext} from '../contexts/UserContext';

function ChangePassword(props) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  });
  const {
    payload: {token, user},
    logout,
  } = useContext(UserContext);
  const updatePassword = async () => {
    setMessage('');
    setLoading(true);
    fetch('https://cuboidtechnologies.com/api/users/updateMyPassword', {
      method: 'patch',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwords),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        if (result.status === 'success') {
          props.navigation.dispatch(StackActions.popToTop());
          logout();
        } else {
          setMessage(result.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        {loading && <Loader />}
        <View style={{height: 150, backgroundColor: '#000'}}>
          <View style={{flexDirection: 'row', padding: 15}}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  marginTop: 20,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/Icons/backarrow.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.MainView}>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <View style={{width: '85%', marginTop: -50, left: '30%'}}>
              <Image
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  resizeMode: 'cover',
                  alignSelf: 'center',
                }}
                source={
                  user.imagepath
                    ? {uri: user.imagepath}
                    : require('../../assets/Icons/no-data.png')
                }
              />
            </View>
            <View style={{width: '15%'}}>
              <TouchableOpacity>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    alignSelf: 'flex-end',
                    right: 20,
                    top: 10,
                  }}
                  source={require('../../assets/Icons/ThreeDots.png')}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.UserNameView}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Lato-Bold',
                left: 5,
                marginTop: 12,
              }}>
              {user.firstname + ' ' + user.lastname}
            </Text>
          </View>

          <View style={{height: 420}}>
            <View style={{padding: 10}}>
              <Text>Change Password</Text>
              <View style={{borderWidth: 1, top: 5}} />
            </View>
            <TextInput
              value={passwords.passwordCurrent}
              onChangeText={(text) =>
                setPasswords((p) => ({...p, passwordCurrent: text}))
              }
              secureTextEntry={true}
              style={styles.EditProfile}
              placeholder="Current Password"
              placeholderTextColor="#000"
            />
            <TextInput
              value={passwords.password}
              onChangeText={(text) =>
                setPasswords((p) => ({...p, password: text}))
              }
              secureTextEntry={true}
              style={styles.EditProfile}
              placeholder="New Password"
              placeholderTextColor="#000"
            />
            <TextInput
              value={passwords.passwordConfirm}
              onChangeText={(text) =>
                setPasswords((p) => ({...p, passwordConfirm: text}))
              }
              secureTextEntry={true}
              style={styles.EditProfile}
              placeholder="Confirm New Password"
              placeholderTextColor="#000"
            />

            <Text
              style={{
                color: '#D33257',
                paddingTop: 8,
                textAlign: 'center',
              }}>
              {message ? message : ''}
            </Text>

            <View style={{padding: 10, marginTop: 50}}>
              <TouchableOpacity
                onPress={updatePassword}
                style={styles.UpdateBtn}>
                <Text style={{fontFamily: 'Lato-Regular'}}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <FooterPage
        welcomePress={() => this.props.navigation.navigate('WelcomeScreen')}
        subPress={() => this.props.navigation.navigate('SubscriptionPage')}
        postPress={() => this.props.navigation.navigate('PostProperties')}
        contPress={() => this.props.navigation.navigate('ContactUS')}
        profilePress={() => this.props.navigation.navigate('ProfilePage')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  EditProfile: {
    width: '100%',
    padding: 10,
    height: 40,
    fontFamily: 'Lato-Regular',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  MainView: {
    borderRadius: 30,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#f1f1f1',
    marginTop: -20,
  },
  CircleView: {
    alignSelf: 'center',
    // right: 85,
    // marginTop: -70,
    height: 200,
    width: 200,
    borderRadius: 100 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  UserNameView: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  EditIcons: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  LoginBtnView: {
    width: 200,
    backgroundColor: '#F6D700',
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    borderRadius: 20,
  },
  UpdateBtn: {
    height: 40,
    width: 100,
    backgroundColor: '#F6D700',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    // alignSelf:'flex-end'
    marginLeft: '70%',
  },
});

export default ChangePassword;
