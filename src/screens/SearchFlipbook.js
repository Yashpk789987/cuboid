/* eslint-disable react-native/no-inline-styles */

import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {Loader} from '../common/Loader';
import {UserContext} from '../contexts/UserContext';

const windowHeight = Dimensions.get('window').height;

function SearchFlipbook({
  route: {
    params: {params, url},
  },
  navigation,
}) {
  const {
    payload: {isLoggedIn},
  } = useContext(UserContext);
  useEffect(() => {
    setLoading(true);
    console.log(url, params);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
      })
      .catch((err) => console.log(err));
  }, [url, params]);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([
    {
      index: 'house',
      imageurl: require('../../assets/images/LookFurnished.jpg'),
      content: 'Looking for a house ',
    },
    {
      index: 'hotel',
      imageurl: require('../../assets/images/LookHotel.jpg'),
      content: 'Looking for a Hotel',
    },
    {
      index: 'land',
      imageurl: require('../../assets/images/LookHouse.jpg'),
      content: 'Looking for Land and Plot',
    },
    {
      index: 'warehouse',
      imageurl: require('../../assets/images/WareHouse.jpeg'),
      content: 'Looking for a warehouse',
    },
  ]);
  return (
    <>
      {loading && <Loader />}

      <View style={styles.container}>
        <View style={styles.HeaderView}>
          <View style={styles.HeaderTextView}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
              onPress={() => navigation.navigate('RegisterPage')}
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

        <View style={{padding: 10, height: '5%'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text> Dear </Text>
            <Text style={{color: '#FFA500', fontFamily: 'Lato-Regular'}}>
              Rahul
            </Text>
            <Text style={{fontFamily: 'Lato-Regular'}}> your search has</Text>
            <Text style={{color: '#FFA500', fontFamily: 'Lato-Regular'}}>
              {' '}
              2345
            </Text>
            <Text style={{fontFamily: 'Lato-Regular'}}> results</Text>
          </View>
        </View>

        <View style={{paddingHorizontal: 2, height: '85%'}}>
          <FlatList
            data={listings}
            renderItem={({item}) => (
              <View>
                <ImageBackground
                  source={item.imageurl}
                  style={{
                    marginTop: 10,
                    height: windowHeight,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('SavedFlipbook')}
                      style={{
                        width: 130,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        backgroundColor: '#000',
                      }}>
                      <Text style={{color: '#fff'}}>Save FlipBook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('FlipbookDiscription')}
                      style={{
                        width: 130,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        backgroundColor: '#F6D600',
                      }}>
                      <Text style={{color: '#000'}}>Open FlipBook</Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
            )}
          />
          <View
            style={{
              padding: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{
                width: 150,
                height: 40,
                backgroundColor: '#F6D600',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <Text>Go Back</Text>
              {/* <Text>{mainCategory}</Text> */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('VisitFlipbook')}
              style={{
                width: 150,
                height: 40,
                backgroundColor: '#F6D600',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <Text>View Next</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <Footer /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  HeaderView: {
    width: '100%',
    height: '12%',
    padding: 20,
    paddingTop: 32,
    backgroundColor: '#000',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  HeaderTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  Backimage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    opacity: 0.6,
  },
  SaveFlipBtn: {
    height: 40,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: 10,
    opacity: 1.5,
  },
  OpenFlipBookBtn: {
    height: 40,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6D600',
    borderRadius: 10,
    opacity: 1.5,
  },
});

export default SearchFlipbook;
