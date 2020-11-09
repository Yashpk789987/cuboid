/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import FooterPage from '../common/FooterPage';
import {Loader} from '../common/Loader';
import {UserContext} from '../contexts/UserContext';

function SubscriptionPage(props) {
  const {
    payload: {
      isLoggedIn,
      token,
      user: {firstname, id},
    },
  } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const buyPackage = async () => {
    if (!isLoggedIn) {
      props.navigation.navigate('LoginPage');
    } else {
      setLoading(true);
      fetch(
        'https://cuboidtechnologies.com/api/subscription/subscription-page-new-renew',
        {
          method: 'patch',
          headers: {
            Authorization: `Bearer  ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'buy',
            userID: id,
            subscriptionType: {
              buy: true,
            },
            subscriptionAmount: {
              buy: 10000,
            },
            totalpoints: {
              buy: 1500,
            },
          }),
        },
      )
        .then((res) => res.json())
        .then((result) => {
          setLoading(false);
          if (result.status === 'success') {
            props.navigation.goBack();
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const rentPackage = async () => {
    if (!isLoggedIn) {
      props.navigation.navigate('LoginPage');
    } else {
      const data = {
        type: 'rent',
        userID: id,
        subscriptionType: {
          rent: true,
        },
        subscriptionAmount: {
          rent: 10000,
        },
        totalpoints: {
          rent: 1500,
        },
      };
      console.log(data);
      setLoading(true);
      fetch(
        'https://cuboidtechnologies.com/api/subscription/subscription-page-new-renew',
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )
        .then((res) => res.json())
        .then((result) => {
          setLoading(false);
          if (result.status === 'success') {
            props.navigation.goBack();
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <View style={styles.HeaderView}>
        <View style={styles.HeaderTextView}>
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
              style={styles.HeaderRightIcon}
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
      </View>
      <ScrollView
        style={{
          padding: 10,
          paddingTop: 16,
          marginBottom: 64,
          height: '100%',
        }}>
        <Text style={{fontSize: 16, color: '#FFA500', fontFamily: 'Lato-Bold'}}>
          BEST SUBSCRIPTION PLAN FOR YOU
        </Text>

        <View style={{marginTop: 10}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 12,
              fontFamily: 'Lato-Regular',
            }}>
            "Dear customer we charge a small fee for the cost we incure to
            veirfy items we list. after paying this ammount you shall get the
            property you are looking for directly from the seller without
            further charges. We don't charge any brockerage fee. Most of our
            properties are listed at a negotiated price to make sure you gt the
            best deal"
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 10,
            marginTop: 40,
            padding: 20,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              color: '#c0c0c0',
              fontFamily: 'Lato-Bold',
            }}>
            Buy Package
          </Text>

          <View style={styles.PointView}>
            <Image
              source={require('../../assets/Icons/Righticon.png')}
              style={{width: 15, height: 15}}
            />
            <Text style={styles.Point}>
              The point you will get in this package -1500
            </Text>
          </View>
          <View style={styles.PointView}>
            <Image
              source={require('../../assets/Icons/Righticon.png')}
              style={{width: 15, height: 15}}
            />
            <Text style={styles.Point}>
              Use of points: you can use points for searching the properties
            </Text>
          </View>
          <View style={styles.PointView}>
            <Image
              source={require('../../assets/Icons/Righticon.png')}
              style={{width: 15, height: 15}}
            />
            <Text style={styles.Point}>
              The value of points: 1 point per minute
            </Text>
          </View>
          <Text
            style={{
              color: '#FFA500',
              fontFamily: 'Lato-Bold',
              fontSize: 20,
              marginTop: 20,
            }}>
            Charge: Subscription fee Ksh 10,000 for 1500 minutes on website and
            app
          </Text>

          <TouchableOpacity onPress={() => buyPackage()} style={styles.PayBtn}>
            <Text style={{fontFamily: 'Lato-Bold'}}>Pay $10000</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 10,
            marginTop: 40,
            padding: 20,
            marginBottom: 36,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              color: '#c0c0c0',
              fontFamily: 'Lato-Bold',
            }}>
            Rent Package
          </Text>

          <View style={styles.PointView}>
            <Image
              source={require('../../assets/Icons/Righticon.png')}
              style={{width: 15, height: 15}}
            />
            <Text style={styles.Point}>
              The point you will get in this package -1500{' '}
            </Text>
          </View>
          <View style={styles.PointView}>
            <Image
              source={require('../../assets/Icons/Righticon.png')}
              style={{width: 15, height: 15}}
            />
            <Text style={styles.Point}>
              Use of points: you can use points for searching the properties
            </Text>
          </View>
          <View style={styles.PointView}>
            <Image
              source={require('../../assets/Icons/Righticon.png')}
              style={{width: 15, height: 15}}
            />
            <Text style={styles.Point}>
              The value of points: 1 point per minute
            </Text>
          </View>
          <Text
            style={{
              color: '#FFA500',
              fontFamily: 'Lato-Bold',
              fontSize: 20,
              marginTop: 20,
            }}>
            Charge: Subscription fee Ksh 3000 for 1500 minutes on website and
            app
          </Text>

          <TouchableOpacity onPress={() => rentPackage()} style={styles.PayBtn}>
            <Text style={{fontFamily: 'Lato-Bold'}}>Pay $3000</Text>
          </TouchableOpacity>
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
    height: '100%',
    width: '100%',
    backgroundColor: '#0f0f0f',
  },
  HeaderView: {
    width: '100%',
    height: 92,
    padding: 20,
    paddingTop: 36,
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
  PointView: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  Point: {
    color: '#FFA500',
    fontSize: 12,
    left: 10,
    fontFamily: 'Lato-Regular',
  },
  PayBtn: {
    marginTop: 36,
    borderRadius: 20,
    height: 30,
    width: 120,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6D600',
  },
});

export default SubscriptionPage;
