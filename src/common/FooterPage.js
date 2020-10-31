/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import {UserContext} from '../contexts/UserContext';
import {useNavigation} from '@react-navigation/native';

function FooterPage(props) {
  const navigation = useNavigation();
  const {
    payload: {isLoggedIn},
  } = useContext(UserContext);

  return (
    <View>
      <View
        style={[styles.FooterView, {bottom: props.bottom ? props.bottom : 0}]}>
        <TouchableOpacity onPress={props.welcomePress}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../assets/Icons/Home.png')}
              style={{width: 25, height: 25}}
            />
            <Text style={{fontFamily: 'Lato-Regular', fontSize: 12}}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.subPress}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../assets/Icons/Subscription.png')}
              style={{width: 25, height: 25}}
            />
            <Text style={{fontFamily: 'Lato-Regular', fontSize: 12}}>
              Subscription
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.postPress}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../assets/Icons/PostIcon.png')}
              style={{width: 25, height: 25, resizeMode: 'contain'}}
            />
            <Text style={{fontFamily: 'Lato-Regular', fontSize: 12}}>Post</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.contPress}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../assets/Icons/Contactus.png')}
              style={{width: 25, height: 25}}
            />
            <Text style={{fontFamily: 'Lato-Regular', fontSize: 12}}>
              Contact us
            </Text>
          </View>
        </TouchableOpacity>
        {isLoggedIn && (
          <TouchableOpacity onPress={props.profilePress}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../assets/Icons/Profile.png')}
                style={{width: 25, height: 28, resizeMode: 'contain'}}
              />
              <Text style={{fontFamily: 'Lato-Regular', fontSize: 12}}>
                Profile
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {!isLoggedIn && (
          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterPage')}
            style={{alignItems: 'center'}}>
            <Image
              style={{
                width: 25,
                height: 25,
                tintColor: 'grey',
                resizeMode: 'contain',
              }}
              source={require('../../assets/Icons/UserIcon.png')}
            />
            <Text style={{fontFamily: 'Lato-Regular', fontSize: 12}}>
              Sign up
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  FooterView: {
    height: 60,
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

FooterPage.PropTypes = {
  bottom: PropTypes.number,
  welcomePress: PropTypes.func,
  subPress: PropTypes.func,
  postPress: PropTypes.func,
  contPress: PropTypes.func,
  profilePress: PropTypes.func,
};

export default FooterPage;
