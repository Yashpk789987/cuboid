import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ImageBackground,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

class FlipbookDiscription extends Component {
  state = {
    value: null,
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Header Start */}
        <View style={styles.HeaderView}>
          <View style={styles.HeaderTextView}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
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

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('RegisterPage')}
              style={{alignItems: 'center'}}>
              <Image
                style={styles.HeaderRightIcon}
                source={require('../../assets/Icons/UserIcon.png')}
              />
              <Text
                style={{
                  color: '#FFA500',
                  fontSize: 10,
                  fontFamily: 'Lato-Regular',
                }}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Header end */}

        <View style={{padding: 20, height: '75%'}}>
          <Text
            style={{color: '#F6D600', fontSize: 16, fontFamily: 'Lato-Bold'}}>
            Description
          </Text>
          <Text style={{fontFamily: 'Lato-Regular'}}>
            {' '}
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32. The standard chunk of
            Lorem Ipsum used since the 1500s is reproduced below for those
            interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
            Malorum" by Cicero are also reproduced in their exact original form,
            accompanied by English versions from the 1914 translation by H.
            Rackham{' '}
          </Text>
        </View>

        <View style={{height: '23%', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('VisitFlipbook')}
            style={styles.NextPageBtn}>
            <Image
              style={{width: 30, height: 30, resizeMode: 'contain'}}
              source={require('../../assets/Icons/Rightarrow.png')}
            />
          </TouchableOpacity>
        </View>

        {/* <Footer /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  HeaderView: {
    width: '100%',
    // height: 80,
    height: '12%',
    padding: 20,
    backgroundColor: '#000',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  HeaderTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: 20
  },
  HeaderText: {
    color: '#FFA500',
    fontSize: 20,
    fontFamily: 'Lato-Bold',
  },
  HeaderRightIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  BackIcon: {
    width: 20,
    height: 20,
    marginTop: 10,
    resizeMode: 'contain',
  },
  NextPageBtn: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: '#F6D600',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FlipbookDiscription;
