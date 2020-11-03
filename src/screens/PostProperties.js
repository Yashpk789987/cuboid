/* eslint-disable react-native/no-inline-styles */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import FooterPage from '../common/FooterPage';
import {UserContext} from '../contexts/UserContext';
import {pattern} from '../common/email.regex';
import {Loader} from '../common/Loader';

const errors = {
  name: undefined,
  email: undefined,
  mobile: undefined,
  address: undefined,
  propertyDetails: undefined,
  nationalId: undefined,
  propertyImages: undefined,
};

class PostProperties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phonenumber: '',
      address: '',
      propertyDetails: '',
      nationalidimage: '',
      propertyimage: [],
      errors,
      loading: false,
      message: undefined,
    };
  }
  // function for pick multiple images
  pickMultiple() {
    ImagePicker.openPicker({
      includeBase64: true,
      multiple: true,
    })
      .then((images) => {
        this.setState((p) => ({
          ...p,
          propertyimage: [
            ...p.propertyimage,
            ...images.map((i) => `data:image/jpeg;base64,${i.data}`),
          ],
        }));
      })
      .catch((e) => console.log(e));
  }

  // function for pick  a image for national id
  NationalIdImage = async () => {
    ImagePicker.openPicker({
      includeBase64: true,
    })
      .then((image) => {
        this.setState({
          nationalidimage: `data:image/jpeg;base64,${image.data}`,
        });
      })
      .catch((e) => console.log(e));
  };

  removePropertyImage = (index) => {
    const newArray = this.state.propertyimage.filter((_, i) => i !== index);
    this.setState({propertyimage: newArray});
  };

  // make a function to post the details
  SubmitData = async () => {
    const {
      name,
      email,
      phonenumber,
      address,
      propertyDetails,
      nationalidimage,
      propertyimage,
    } = this.state;

    if (name === '') {
      await this.setState((p) => ({
        ...p,
        errors: {...p.errors, name: '* Name is Required'},
      }));
    } else {
      await this.setState((p) => ({
        ...p,
        errors: {...p.errors, name: undefined},
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
    if (phonenumber.length < 10) {
      await this.setState((p) => ({
        ...p,
        errors: {
          ...p.errors,
          mobile: '* Mobile number must be of 10 digits',
        },
      }));
    } else {
      await this.setState((p) => ({
        ...p,
        errors: {
          ...p.errors,
          mobile: undefined,
        },
      }));
    }

    if (address === '') {
      await this.setState((p) => ({
        ...p,
        errors: {...p.errors, address: '* Address is Required'},
      }));
    } else {
      await this.setState((p) => ({
        ...p,
        errors: {...p.errors, address: undefined},
      }));
    }

    if (propertyDetails === '') {
      await this.setState((p) => ({
        ...p,
        errors: {
          ...p.errors,
          propertyDetails: '* Property Details are Required',
        },
      }));
    } else {
      await this.setState((p) => ({
        ...p,
        errors: {...p.errors, propertyDetails: undefined},
      }));
    }

    if (nationalidimage === '') {
      await this.setState((p) => ({
        ...p,
        errors: {
          ...p.errors,
          nationalId: '* National Id is required',
        },
      }));
    } else {
      await this.setState((p) => ({
        ...p,
        errors: {...p.errors, nationalId: undefined},
      }));
    }

    if (propertyimage.length < 5) {
      await this.setState((p) => ({
        ...p,
        errors: {
          ...p.errors,
          propertyImages: '* Minimum 5 images are required',
        },
      }));
    } else {
      await this.setState((p) => ({
        ...p,
        errors: {...p.errors, propertyImages: undefined},
      }));
    }

    const isvalidated = !Object.values(this.state.errors).some((i) => !!i);

    if (isvalidated) {
      this.setState({loading: true, message: undefined});
      fetch('https://cuboidtechnologies.com/api/property/post-property', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          phonenumber: this.state.phonenumber,
          propertyDetails: this.state.propertyDetails,
          nationalidimage: this.state.nationalidimage,
          propertyimage: this.state.propertyimage,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          this.setState({
            loading: false,
            message: 'your property successfully posted',
          });
        })
        .catch(function (error) {
          console.log(error);
          this.setState({
            loading: false,
            message: 'something went wrong',
          });
        });
    }
  };

  render() {
    const {
      payload: {
        isLoggedIn,
        user: {firstname},
      },
    } = this.context;

    const {
      errors: {
        name,
        email,
        mobile,
        address,
        propertyDetails,
        nationalId,
        propertyImages,
      },
      message,
    } = this.state;

    return (
      <View style={styles.container}>
        {this.state.loading && <Loader />}
        <ScrollView style={{flex: 1, marginBottom: 10}}>
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
                onPress={() => {
                  if (isLoggedIn) {
                    this.props.navigation.navigate('ProfilePage');
                  } else {
                    this.props.navigation.navigate('RegisterPage');
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
                  {isLoggedIn ? firstname : 'Sign Up'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{paddingLeft: 15, paddingRight: 15}}>
            <View style={styles.DetailMainView}>
              <TextInput
                placeholder="Name"
                placeholderTextColor="#FFA500"
                onChangeText={(text) => {
                  this.setState({name: text});
                }}
                style={styles.TextInputStyle}
              />
              {name && (
                <Text style={{color: '#FFA500', paddingTop: 0}}>
                  {name ? name : ''}
                </Text>
              )}
              <TextInput
                placeholder="Email"
                placeholderTextColor="#FFA500"
                onChangeText={(text) => {
                  this.setState({email: text});
                }}
                style={styles.TextInputStyle}
              />
              {email && (
                <Text style={{color: '#FFA500', paddingTop: 0}}>
                  {email ? email : ''}
                </Text>
              )}
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor="#FFA500"
                TextInputStyle={Number}
                onChangeText={(text) => this.setState({phonenumber: text})}
                style={styles.TextInputStyle}
              />
              {mobile && (
                <Text style={{color: '#FFA500', paddingTop: 0}}>
                  {mobile ? mobile : ''}
                </Text>
              )}
              <TextInput
                placeholder="Address"
                placeholderTextColor="#FFA500"
                onChangeText={(text) => this.setState({address: text})}
                style={styles.TextInputStyle}
              />
              {address && (
                <Text style={{color: '#FFA500', paddingTop: 0}}>
                  {address ? address : ''}
                </Text>
              )}

              <View style={styles.PropertyDetailView}>
                <Text style={{color: '#FFA500'}}>Property Details</Text>
                <TextInput
                  onChangeText={(text) =>
                    this.setState({propertyDetails: text})
                  }
                  style={{height: 60, color: '#FFA500'}}
                />
              </View>
              {propertyDetails && (
                <Text style={{color: '#FFA500', paddingTop: 0}}>
                  {propertyDetails ? propertyDetails : ''}
                </Text>
              )}

              <View style={styles.PropertyDetailView}>
                <Text style={{color: '#FFA500'}}>Upload national id</Text>
                <TouchableOpacity
                  onPress={() => this.NationalIdImage()}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 12,
                  }}>
                  <View style={{width: '90%'}}>
                    {this.state.nationalidimage !== '' && (
                      <Image
                        source={{
                          uri: `${this.state.nationalidimage}`,
                        }}
                        style={{
                          width: 50,
                          height: 50,
                        }}
                      />
                    )}
                  </View>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    source={require('../../assets/Icons/AddIcon.png')}
                  />
                </TouchableOpacity>
              </View>
              {nationalId && (
                <Text style={{color: '#FFA500', paddingTop: 0}}>
                  {nationalId ? nationalId : ''}
                </Text>
              )}

              <View style={styles.PropertyDetailView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#FFA500'}}>Upload Property images</Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 10,
                      fontFamily: 'Lato-Regular',
                    }}>
                    *minimum 5 images
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    paddingTop: 6,
                    alignItems: 'center',
                  }}>
                  <FlatList
                    nestedScrollEnabled={true}
                    data={this.state.propertyimage}
                    numColumns={4}
                    renderItem={({item, index}) => (
                      <View
                        style={{
                          width: 50,
                          height: 50,
                          marginVertical: 8,
                          marginHorizontal: 4,
                        }}>
                        <TouchableOpacity
                          onPress={() => this.removePropertyImage(index)}
                          style={{
                            position: 'absolute',
                            top: -8,
                            right: -12,
                            zIndex: 12,
                            height: 24,
                            width: 24,
                          }}>
                          <Image
                            style={{
                              height: 16,
                              width: 16,
                              resizeMode: 'contain',
                            }}
                            source={require('../../assets/Icons/close.png')}
                          />
                        </TouchableOpacity>
                        <Image
                          source={{uri: `${item}`}}
                          style={{
                            width: 50,
                            height: 50,
                          }}
                        />
                      </View>
                    )}
                  />

                  <TouchableOpacity
                    onPress={() => this.pickMultiple()}
                    style={styles.AddTuchableView}>
                    <Image
                      style={styles.Addicon}
                      source={require('../../assets/Icons/AddIcon.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {propertyImages && (
                <Text style={{color: '#FFA500', paddingTop: 0}}>
                  {propertyImages ? propertyImages : ''}
                </Text>
              )}
              <TouchableOpacity
                style={styles.PostBtnView}
                onPress={() => this.SubmitData()}
                // onPress={() => this.props.navigation.navigate('RegisterPage')}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    fontFamily: 'Lato-Bold',
                  }}>
                  Post
                </Text>
              </TouchableOpacity>
            </View>
            {message && (
              <Text style={{color: '#FFA500', paddingTop: 4}}>
                {message ? message : ''}
              </Text>
            )}

            <View style={{height: 80}} />
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
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  HeaderView: {
    height: '14%',
    padding: 20,
    paddingTop: 42,
    backgroundColor: '#000',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  HeaderTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: 20,
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
  DetailMainView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,

    marginTop: -15,
    bottom: 10,
  },
  TextInputStyle: {
    color: '#FFA500',
    height: 40,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#000',
    paddingLeft: 10,
    fontFamily: 'Lato-Regular',
  },
  PropertyDetailView: {
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#000',
    padding: 10,
    height: 100,
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
  AddTuchableView: {
    height: 40,
    width: 40,
    paddingTop: 6,
  },
  Addicon: {
    width: 30,
    height: 30,
    left: 10,
  },

  PostBtnView: {
    marginTop: 30,
    backgroundColor: '#F6D700',
    width: '100%',
    height: 40,
    borderRadius: 20,
    borderColor: '#FFA500',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

PostProperties.contextType = UserContext;

export default PostProperties;
