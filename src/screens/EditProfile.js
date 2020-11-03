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
import ImageCropPicker from 'react-native-image-crop-picker';
import {pattern} from '../common/email.regex';

import FooterPage from '../common/FooterPage';
import {Loader} from '../common/Loader';
import {UserContext} from '../contexts/UserContext';

function EditProfile(props) {
  const {
    payload: {user, token, isLoggedIn},
    setPayload,
  } = useContext(UserContext);
  const [form, setForm] = useState(user);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const update = async () => {
    if (form.firstname === '') {
      setMessage('please provide first name');
    } else if (form.lastname === '') {
      setMessage('please provide last name');
    } else if (!pattern.test(form.email)) {
      setMessage('please provide valid email');
    } else if (
      !form.mobilenumber ||
      (form.mobilenumber && form.mobilenumber.length < 10) ||
      (form.mobilenumber && form.mobilenumber.length > 10)
    ) {
      setMessage('please provide valid phone number');
    } else {
      setMessage('');
      setLoading(true);
      fetch('https://cuboidtechnologies.com/api/users/editprofile', {
        method: 'patch',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((result) => {
          setLoading(false);
          if (result.status === 'success') {
            setPayload({token, isLoggedIn: true, user: result.data.user});
          } else {
            setMessage(result.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const openImageAndUpload = async () => {
    ImageCropPicker.openPicker({
      includeBase64: true,
    })
      .then((image) => {
        setLoading(true);
        const data = {image: `data:image/jpeg;base64,${image.data}`};
        fetch('https://cuboidtechnologies.com/api/users/upload', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((result) => {
            setLoading(false);
            if (result.status === 'success') {
              setPayload({
                token,
                isLoggedIn,
                user: {...user, imagepath: result.url},
              });
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      })
      .catch((e) => console.log(e));
  };
  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{marginBottom: 60}}>
        <View style={{height: 150, paddingTop: 16, backgroundColor: '#000'}}>
          <View style={{flexDirection: 'row', padding: 15}}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  marginTop: 10,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/Icons/backarrow.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.MainView}>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <TouchableOpacity
              onPress={openImageAndUpload}
              style={{width: '85%', marginTop: -50, left: '30%'}}>
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
            </TouchableOpacity>
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
                marginTop: -20,
              }}>
              {form.firstname + ' ' + form.lastname}
            </Text>
          </View>

          <View style={{padding: 10}}>
            <Text>Edit Profile</Text>
            <View style={{borderWidth: 1, top: 5}} />
          </View>
          <TextInput
            onChangeText={(text) => setForm((f) => ({...f, firstname: text}))}
            value={form.firstname}
            style={styles.EditProfile}
            placeholder="First Name"
            placeholderTextColor="#000"
          />
          <TextInput
            onChangeText={(text) => setForm((f) => ({...f, lastname: text}))}
            value={form.lastname}
            style={styles.EditProfile}
            placeholder="Last Name"
            placeholderTextColor="#000"
          />
          <TextInput
            value={`+91 ${form.mobilenumber ? form.mobilenumber : ''}`}
            onChangeText={(text) =>
              setForm((f) => ({...f, mobilenumber: text.substring(4)}))
            }
            style={styles.EditProfile}
            placeholder="Phone Number"
            placeholderTextColor="#000"
          />
          <TextInput
            onChangeText={(text) => setForm((f) => ({...f, email: text}))}
            value={form.email}
            style={styles.EditProfile}
            placeholder="email"
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

          <View style={{padding: 10, marginTop: 8}}>
            <TouchableOpacity onPress={update} style={styles.UpdateBtn}>
              <Text style={{fontFamily: 'Lato-Regular'}}>Update</Text>
            </TouchableOpacity>
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
    height: 200,
    width: 200,
    borderRadius: 100 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  UserNameView: {
    marginTop: 32,
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

export default EditProfile;
