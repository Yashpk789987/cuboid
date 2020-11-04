/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';

import FooterPage from '../common/FooterPage';
import {UserContext} from '../contexts/UserContext';

const windowHeight = Dimensions.get('window').height;

function WelcomeScreen(props) {
  const {
    payload: {
      user: {firstname},
      isLoggedIn,
    },
  } = useContext(UserContext);
  const [state] = useState({
    mainimage: [
      {
        index: 'house',
        imageurl: require('../../assets/images/LookFurnished.jpg'),
        content: 'Looking for a house to let,\n   buy or fully furnished? ',
      },
      {
        index: 'hotel',
        imageurl: require('../../assets/images/LookHotel.jpg'),
        content: 'Looking for a hotel?',
      },
      {
        index: 'land',
        imageurl: require('../../assets/images/LookHouse.jpg'),
        content: 'Looking for land or a Plot?',
      },
      {
        index: 'warehouse',
        imageurl: require('../../assets/images/WareHouse.jpeg'),
        content: 'Looking for a commercial space\n office  or a  go-down?',
      },
    ],
  });
  const GoNextPage = (value) => {
    // console.log(index);
    if (value === 'hotel') {
      props.navigation.navigate('LookingHotelSteps');
    }
    if (value === 'house') {
      props.navigation.navigate('LookingHouseSteps');
    }
    if (value === 'land') {
      props.navigation.navigate('LookingLandSteps');
    }
    if (value === 'warehouse') {
      props.navigation.navigate('LookingWarehouseSteps');
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingTop: '12%',
          height: '14%',
          width: '100%',
          backgroundColor: '#000',
          flexDirection: 'row',
          padding: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}>
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
          <Image
            style={{height: 20, width: 20, resizeMode: 'contain'}}
            source={require('../../assets/Icons/Drawer1.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (isLoggedIn) {
              props.navigation.navigate('ProfilePage');
            } else {
              props.navigation.navigate('RegisterPage');
            }
          }}
          style={{alignItems: 'center'}}>
          <Image
            style={{height: 25, width: 25, resizeMode: 'contain'}}
            source={require('../../assets/Icons/UserIcon.png')}
          />
          <Text
            style={{
              color: '#FFA500',
              fontSize: 10,
              fontFamily: 'Lato-Regular',
            }}>
            {isLoggedIn ? firstname : 'Sign up'}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: '90%',
        }}>
        <FlatList
          showsVerticalScrollIndicator={true}
          data={state.mainimage}
          numColumns={1}
          renderItem={({item}) => (
            <View style={{paddingHorizontal: 10}}>
              <TouchableOpacity
                onPress={() => GoNextPage(item.index)}
                style={{marginTop: 10}}>
                <ImageBackground
                  borderTopLeftRadius={10}
                  borderTopRightRadius={10}
                  source={item.imageurl}
                  style={{
                    height: windowHeight - 120,
                    width: '100%',
                    overflow: 'hidden',
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 100,
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontSize: 22,
                        fontFamily: 'Lato-Bold',
                        alignSelf: 'center',
                      }}>
                      {state.Token}
                      {item.content}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <FooterPage
        bottom={24}
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
    backgroundColor: '#f2f2f2',
  },
  DrawerIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginTop: 10,
  },
  HeaderText: {
    color: '#FFA500',
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    marginTop: 20,
  },
  HeaderView: {
    height: 80,
    padding: 20,
    backgroundColor: '#000',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  FooterView: {
    height: '10%',
    bottom: 0,
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

export default WelcomeScreen;
