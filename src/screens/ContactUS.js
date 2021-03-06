/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native-gesture-handler';

import FooterPage from '../common/FooterPage';

function ContactUS(props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({name: '', email: '', message: ''});

  const submit = async () => {};

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always" style={{marginBottom: 60}}>
        <View style={{height: 220, backgroundColor: '#ffffff', padding: 10}}>
          <Image
            style={{
              width: 250,
              height: 200,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
            source={require('../../assets/Icons/Contact_Page.png')}
          />
        </View>

        <View style={styles.MainView}>
          <View style={{padding: 10, top: 10}}>
            <Text style={{fontFamily: 'Lato-Bold'}}>Contact us</Text>
            <View style={{borderWidth: 1, top: 5}} />
          </View>
          <View style={{height: 90, width: '100%', top: 15}}>
            <Text style={{left: 10, top: 5, fontFamily: 'Lato-Regular'}}>
              Name
            </Text>
            <TextInput
              value={form.name}
              onChangeText={(text) => setForm((p) => ({...p, name: text}))}
              style={styles.EditProfile}
              placeholder="Name"
              placeholderTextColor="#000"
            />
          </View>
          <View style={{height: 74, width: '100%'}}>
            <Text style={{left: 10, top: 5, fontFamily: 'Lato-Regular'}}>
              Email
            </Text>
            <TextInput
              value={form.email}
              onChangeText={(text) => setForm((p) => ({...p, email: text}))}
              style={styles.EditProfile}
              placeholder="Email"
              placeholderTextColor="#000"
            />
          </View>
          <Text style={{left: 10, top: 5, fontFamily: 'Leto-Regular'}}>
            Message
          </Text>
          <View style={styles.MessageView}>
            <TextInput
              value={form.message}
              onChangeText={(text) => setForm((p) => ({...p, message: text}))}
              // style={{backgroundColor:"red"}}
              placeholderTextColor="#000"
            />
          </View>

          <View
            style={{
              padding: 10,
              marginTop: 28,
              alignItems: 'center',
              height: 80,
            }}>
            <TouchableOpacity style={styles.UpdateBtn}>
              <Text style={{fontFamily: 'Lato-Bold'}}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <FooterPage
        welcomePress={() => props.navigation.navigate('WelcomeScreen')}
        subPress={() => props.navigation.navigate('SubscriptionPage')}
        postPress={() => props.navigation.navigate('PostProperties')}
        contPress={() => props.navigation.navigate('ContactUS')}
        profilePress={() => props.navigation.navigate('ProfilePage')}
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
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  MessageView: {
    width: '100%',
    padding: 10,
    height: 120,
    fontFamily: 'Lato-Regular',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  MainView: {
    borderRadius: 30,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#f1f1f1',
    marginTop: -25,
  },

  UpdateBtn: {
    height: 40,
    width: 100,
    backgroundColor: '#F6D700',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    // alignSelf:'flex-end'
  },
});

export default ContactUS;
