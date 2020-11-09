/* eslint-disable react-native/no-inline-styles */

import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import RangeSlider from 'rn-range-slider';

import {UserContext} from '../contexts/UserContext';

class LookingHotelSteps extends Component {
  constructor() {
    super();
    this.state = {
      bedbreakfastcost: {
        min: 500,
        max: 3000,
      },
      class: '',
      locality: '',
      conferenceroom: 5,
      kmfromtarmac: 15,
      area: '',
      Hotel: '',
      index: 0,
      Cost: null,
      KMS: null,
      ConferenceCount: null,
      Sizearea: null,
      ShopDist: null,
      NeighbourDist: null,
      TarmacDist: null,
      WaterDist: null,
      ElectricityDist: null,
      params: {},
      url: 'https://cuboidtechnologies.com/api/search/hotel-search',
      Max_Rooms: 0,
      aircon: false,
      carpark: false,
      spa: false,
      freshoutdoors: false,
      indoorpool: false,
      disabilityaccess: false,
      barlounge: false,
      hairsalon: false,
      petsallowed: false,

      Class_Data: [
        {
          index: '0',
          imageurl: require('../../assets/Icons/worldClass.png'),
          name: 'World class',
          code: 'worldclass',
        },
        {
          index: '1',
          imageurl: require('../../assets/Icons/MidRange.png'),
          name: 'Mid Range',
          code: 'midrange',
        },
        {
          index: '2',
          imageurl: require('../../assets/Icons/Budget.png'),
          name: 'Budget',
          code: 'budget',
        },
      ],
      Locality_Data: [
        {
          index: '0',
          imageurl: require('../../assets/Icons/city.png'),
          name: 'City',
          code: 'city',
        },
        {
          index: '1',
          imageurl: require('../../assets/Icons/Airport.png'),
          name: ' Airprt',
          code: 'airport',
        },
        {
          index: '2',
          imageurl: require('../../assets/Icons/Outskirts.png'),
          name: 'Outskirts',
          code: 'outskirts',
        },
        {
          index: '3',
          imageurl: require('../../assets/Icons/GameHotel.png'),
          name: 'Game Hotel',
          code: 'gamehotel',
        },
      ],
      Select_More_Featurs: [
        {
          index: '0',
          imageurl: require('../../assets/Icons/carpark.png'),
          name: 'Car Parks',
          code: 'carpark',
        },
        {
          index: '1',
          imageurl: require('../../assets/Icons/aircon.png'),
          name: 'Aircon',
          code: 'aircon',
        },
        {
          index: '2',
          imageurl: require('../../assets/Icons/spa.png'),
          name: 'SPA',
          code: 'spa',
        },
        {
          index: '3',
          imageurl: require('../../assets/Icons/freshoutdoor.png'),
          name: 'Fresh outdoor',
          code: 'carpark',
        },
        {
          index: '4',
          imageurl: require('../../assets/Icons/indoorpool.png'),
          name: 'Indoor Pool',
          code: 'indoorpool',
        },
        {
          index: '5',
          imageurl: require('../../assets/Icons/Disability.png'),
          name: 'Disability Access',
          code: 'disabilityaccess',
        },
        {
          index: '6',
          imageurl: require('../../assets/Icons/barlounge.png'),
          name: 'Bar lounge',
          code: 'barlounge',
        },
        {
          index: '7',
          imageurl: require('../../assets/Icons/hairsaloon.png'),
          name: 'Hair Salon',
          code: 'hairsalon',
        },
        {
          index: '8',
          imageurl: require('../../assets/Icons/petsallowed.png'),
          name: 'Pet Allowed',
          code: 'petsallowed',
        },
        {
          index: '9',
          imageurl: require('../../assets/Icons/MatureGarden.png'),
          name: 'Mature Garden',
          code: 'maturegarden',
        },
      ],
      message: '',
      Min_Breakfast_Cost: 500,
      Max_Breakfast_Cost: 3000,
      Max_Tarmac_Dist: 0,
    };
  }

  GoNextStep = () => {
    this.setState({
      index: this.state.index + 1,
    });
  };

  GoPreviousStep = () => {
    this.setState({
      index: this.state.index - 1,
    });
    if (this.state.index === 0) {
      this.props.navigation.navigate('WelcomeScreen');
    }
  };

  _searchStep1 = async (next = false) => {
    const {area, Hotel} = this.state;
    if (this.state.class === '') {
      this.setState({message: 'please select class'});
    } else if (this.state.locality === '') {
      this.setState({message: 'please select locality'});
    } else if (area === '') {
      this.setState({message: 'please enter location '});
    } else if (Hotel === '') {
      this.setState({message: 'please enter Hotel name'});
    } else {
      this.setState({message: ''});

      const params = {
        bedbreakfastcost: {
          min: this.state.Min_Breakfast_Cost,
          max: this.state.Max_Breakfast_Cost,
        },
        attributes: {
          class: this.state.class,
          locality: this.state.locality,
        },
        conferenceroom: this.state.Max_Rooms,
        kmfromtarmac: this.state.Max_Tarmac_Dist,
        area: this.state.area,
        Hotel: this.state.Hotel,
      };
      if (next) {
        this.setState({params});
        this.setState({
          index: this.state.index + 1,
        });
      } else {
        if (this.context.payload.isLoggedIn) {
          this.props.navigation.navigate('SearchFlipbook', {
            params,
            url: this.state.url,
          });
        } else {
          this.props.navigation.navigate('LoginPage');
        }
      }
    }
  };

  _searchStep2 = async () => {
    const {
      carpark,
      aircon,
      spa,
      freshoutdoors,
      indoorpool,
      disabilityaccess,
      barlounge,
      hairsalon,
      petsallowed,
      params,
    } = this.state;
    let data = {};
    if (carpark) {
      data = {...data, carpark};
    }
    if (aircon) {
      data = {...data, aircon};
    }
    if (spa) {
      data = {...data, spa};
    }
    if (freshoutdoors) {
      data = {...data, freshoutdoors};
    }
    if (indoorpool) {
      data = {...data, indoorpool};
    }
    if (disabilityaccess) {
      data = {...data, disabilityaccess};
    }
    if (barlounge) {
      data = {...data, hairsalon};
    }
    if (petsallowed) {
      data = {...data, petsallowed};
    }
    const _params = {...params, ...data};
    if (this.context.payload.isLoggedIn) {
      this.props.navigation.navigate('SearchFlipbook', {
        params: _params,
        url: this.state.url,
      });
    } else {
      this.props.navigation.navigate('LoginPage');
    }
  };

  render() {
    const {
      payload: {
        user: {firstname},
        isLoggedIn,
      },
    } = this.context;
    const progressStepsStyle = {
      activeStepIconBorderColor: '#000', //Active step ,numbers border color
      activeLabelColor: '#000',
      activeStepNumColor: '#FFA500', //Numbers color in processbar
      completedStepIconColor: '#000', //After complete the step change the step color
      completedProgressBarColor: '#000', //line Borders
      completedCheckColor: '#fff',
      height: 50,
      width: 100,
      borderRadius: 20,
    };

    return (
      <View style={{flex: 1}}>
        <ScrollView style={{bottom: 10}}>
          {/*//////////////////////////////////////  Header Start ///////////////////////////// */}
          <View style={styles.HeaderView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <TouchableOpacity onPress={this.GoPreviousStep}>
                <Image
                  style={styles.BackIcon}
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
                  {isLoggedIn ? firstname : 'Sign up'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* /////////////////// /////////////////// Header end  /////////////// */}
          <View style={{width: '100%'}}>
            {/* /////////////////////// ProcessSteps Start Here /////////////////////////////////// */}
            <ProgressSteps
              {...progressStepsStyle}
              activeStep={this.state.index}>
              {/* ////////////////////// First Step Start Here //////////////////////////// */}
              <ProgressStep
                activeLabelColor="#000"
                label="Step 1"
                onNext={this.onPaymentStepComplete}
                onPrevious={this.onPrevStep}
                scrollViewProps={this.defaultScrollViewProps}
                removeBtnRow={true}>
                <View style={{top: 20}}>
                  {/*///////////////////////////////////  Class   ///////////////////////////// */}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Class
                        </Text>
                        <Image
                          style={styles.Downarrow}
                          source={require('../../assets/Icons/Downarrow.png')}
                        />
                      </View>
                      <View style={styles.BottomBorder} />
                    </CollapseHeader>

                    <CollapseBody>
                      <AccordionList
                        data={this.state.Class_Data}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                          <View
                            style={{
                              padding: 10,
                              justifyContent: 'space-between',
                              width: '33%',
                            }}>
                            <TouchableOpacity
                              onPress={() => this.setState({class: item.code})}
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor:
                                  this.state.class === item.code
                                    ? '#F6D700'
                                    : '#f2f2f2',
                                shadowColor: '#000',
                                shadowOffset: {width: 2, height: 2},
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                              }}>
                              <Image
                                source={item.imageurl}
                                style={{
                                  height: 45,
                                  width: 45,
                                  resizeMode: 'contain',
                                }}
                              />
                              <Text style={{fontSize: 12}}>{item.name}</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      />
                    </CollapseBody>
                  </Collapse>
                  {/* ///////////////////////////////////////// Locality  ////////////////////////*/}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Locality
                        </Text>
                        <Image
                          style={styles.Downarrow}
                          source={require('../../assets/Icons/Downarrow.png')}
                        />
                      </View>
                      <View style={styles.BottomBorder} />
                    </CollapseHeader>

                    <CollapseBody>
                      <AccordionList
                        data={this.state.Locality_Data}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                          <View
                            style={{
                              padding: 10,
                              justifyContent: 'space-between',
                              width: '33%',
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                this.setState({locality: item.code})
                              }
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor:
                                  this.state.locality === item.code
                                    ? '#F6D700'
                                    : '#f2f2f2',
                                shadowColor: '#000',
                                shadowOffset: {width: 2, height: 2},
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                              }}>
                              <Image
                                source={item.imageurl}
                                style={{
                                  height: 45,
                                  width: 45,
                                  resizeMode: 'contain',
                                }}
                              />
                              <Text style={{fontSize: 12}}>{item.name}</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      />
                    </CollapseBody>
                  </Collapse>

                  <View style={{paddingHorizontal: 20, height: 60}}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        borderWidth: 1,
                        height: 40,
                        borderColor: '#C0C0C0',
                        borderRadius: 20,
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{width: 20, height: 20, left: 20}}
                        source={require('../../assets/Icons/SearchIcon.png')}
                      />
                      <TextInput
                        placeholderTextColor="#000"
                        placeholder="Enter a location suburb or town"
                        style={{left: 20, fontFamily: 'Lato-Regular'}}
                        onChangeText={(text) => this.setState({area: text})}
                      />
                    </View>
                  </View>

                  {/* /////////////////////////////////////////////   Bed  breadfast cost  ///////////////////////////////  */}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Bed breakfast cost
                        </Text>
                        <Image
                          style={styles.Downarrow}
                          source={require('../../assets/Icons/Downarrow.png')}
                        />
                      </View>
                      <View style={styles.BottomBorder} />
                    </CollapseHeader>

                    <CollapseBody>
                      <View style={{padding: 10, height: 100}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: -20,
                          }}>
                          <Text>{this.state.Min_Breakfast_Cost}</Text>
                          <Text> - {this.state.Max_Breakfast_Cost}</Text>
                        </View>
                        <RangeSlider
                          style={{width: '100%', height: 70}}
                          gravity={'center'}
                          min={500}
                          max={3000}
                          step={50}
                          handleBorderWidth={0.5}
                          handleBorderColor="#F6D700"
                          selectionColor="#F6D700"
                          blankColor="#808080"
                          onValueChanged={(
                            Min_Breakfast_Cost,
                            Max_Breakfast_Cost,
                          ) => {
                            this.setState({
                              Min_Breakfast_Cost: Min_Breakfast_Cost,
                              Max_Breakfast_Cost: Max_Breakfast_Cost,
                            });
                          }}
                        />
                      </View>
                    </CollapseBody>
                  </Collapse>
                  {/* /////////////////////////////////////////////  Hotel name ///////////////////////////////  */}

                  <View style={{paddingHorizontal: 20, height: 80}}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        borderWidth: 1,
                        height: 40,
                        borderColor: '#C0C0C0',
                        borderRadius: 20,
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{width: 20, height: 20, left: 20}}
                        source={require('../../assets/Icons/SearchIcon.png')}
                      />
                      <TextInput
                        placeholderTextColor="#000"
                        placeholder="Hotel Name"
                        style={{
                          left: 20,
                          width: '100%',
                          fontFamily: 'Lato-Regular',
                        }}
                        onChangeText={(text) => this.setState({Hotel: text})}
                      />
                    </View>
                  </View>

                  {/* /////////////////////////////// KMs to tarmac ////////////////////// */}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          style={{
                            height: 15,
                            width: 15,
                            resizeMode: 'contain',
                            marginLeft: 10,
                          }}
                          source={require('../../assets/Icons/AllWather.png')}
                        />
                        <Text
                          style={{marginLeft: 10, fontFamily: 'Lato-Regular'}}>
                          {' '}
                          KMs to tarmac
                        </Text>
                      </View>
                      <View style={styles.BottomBorder} />
                    </CollapseHeader>

                    <CollapseBody>
                      <View style={{padding: 10, height: 100}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: -20,
                          }}>
                          <Text>{this.state.Max_Tarmac_Dist}/KM</Text>
                        </View>
                        <RangeSlider
                          style={{width: '100%', height: 70}}
                          gravity={'center'}
                          min={0}
                          max={11}
                          step={1}
                          rangeEnabled={false}
                          handleBorderWidth={0.5}
                          handleBorderColor="#F6D700"
                          selectionColor="#F6D700"
                          blankColor="#808080"
                          onValueChanged={(
                            Min_Tarmac_Dist,
                            Max_Tarmac_Dist,
                          ) => {
                            this.setState({
                              Min_Tarmac_Dist: Min_Tarmac_Dist,
                              Max_Tarmac_Dist: Max_Tarmac_Dist,
                            });
                          }}
                        />
                      </View>
                    </CollapseBody>
                  </Collapse>
                  {/* ///////////////////////////////////// conference room and number   ////////////////////////////// */}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          style={{
                            height: 15,
                            width: 15,
                            resizeMode: 'contain',
                            marginLeft: 10,
                          }}
                          source={require('../../assets/Icons/PartyArea.png')}
                        />
                        <Text
                          style={{marginLeft: 10, fontFamily: 'Lato-Regular'}}>
                          Conference room and number
                        </Text>
                      </View>
                      <View style={styles.BottomBorder} />
                    </CollapseHeader>

                    <CollapseBody>
                      <View style={{padding: 10, height: 100}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: -20,
                          }}>
                          <Text>{this.state.Max_Rooms}</Text>
                        </View>
                        <RangeSlider
                          rangeEnabled={false}
                          style={{width: '100%', height: 70}}
                          gravity={'center'}
                          min={0}
                          max={11}
                          step={1}
                          handleBorderWidth={0.5}
                          handleBorderColor="#F6D700"
                          selectionColor="#F6D700"
                          blankColor="#808080"
                          onValueChanged={(Min_Rooms, Max_Rooms) => {
                            this.setState({
                              Min_Rooms: Min_Rooms,
                              Max_Rooms: Max_Rooms,
                            });
                          }}
                        />
                      </View>
                    </CollapseBody>
                  </Collapse>

                  <View style={styles.ApplyView}>
                    <TouchableOpacity
                      onPress={() => this._searchStep1()}
                      style={styles.ApplyBtn}>
                      <Text style={{fontFamily: 'Lato-Regular'}}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this._searchStep1(true)}
                      style={styles.ApplyBtn}>
                      <Text style={{fontFamily: 'Lato-Regular'}}>Next </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ProgressStep>

              {/*//////////////////////////////  Second processStep Start Here ///////////////////////////////////////// */}
              <ProgressStep
                label="Step 2"
                removeBtnRow={true}
                onNext={this.onNextStep}
                onPrevious={this.onPrevStep}
                scrollViewProps={this.defaultScrollViewProps}>
                <View style={{top: 20}}>
                  {/* //////////////////////////////////////////  Class /////////////////////////////////////  */}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          select more features
                        </Text>
                        <Image
                          style={styles.Downarrow}
                          source={require('../../assets/Icons/Downarrow.png')}
                        />
                      </View>
                      <View style={styles.BottomBorder} />
                    </CollapseHeader>

                    <CollapseBody>
                      <AccordionList
                        data={this.state.Select_More_Featurs}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                          <View
                            style={{
                              padding: 10,
                              justifyContent: 'space-between',
                              width: '33%',
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                console.log(this.state[item.code]);
                                this.setState({
                                  [item.code]: !this.state[item.code],
                                });
                              }}
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: this.state[item.code]
                                  ? '#F6D700'
                                  : '#f2f2f2',
                                shadowColor: '#000',
                                shadowOffset: {width: 2, height: 2},
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                              }}>
                              <Image
                                source={item.imageurl}
                                style={{
                                  height: 45,
                                  width: 45,
                                  resizeMode: 'contain',
                                }}
                              />
                              <Text style={{fontSize: 12}}>{item.name}</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      />
                    </CollapseBody>
                  </Collapse>
                  {/* ///////////////////////////////////////////  Apply Btn's /////////////////////////////////////// */}
                  <View style={styles.ApplyView}>
                    <TouchableOpacity
                      onPress={() => this._searchStep2()}
                      style={styles.ApplyBtn}>
                      <Text style={{fontFamily: 'Lato-Regular'}}>Search</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ProgressStep>
            </ProgressSteps>
            <Text
              style={{
                color: '#D33257',
                paddingTop: 8,
                paddingHorizontal: 32,
                textAlign: 'left',
              }}>
              {this.state.message}
            </Text>
            {/* //////////////////////////////// End All ProcessSteps Here ///////////////////////////////////// */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

LookingHotelSteps.contextType = UserContext;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  HeaderView: {
    width: '100%',
    height: 100,
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#000',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  HeaderTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
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
  Backimage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    opacity: 0.6,
  },
  CallHeaderMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CallBodyMainView: {
    height: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  BottomBorder: {
    borderWidth: 0.5,
    width: '100%',
    top: 5,
    borderColor: '#c0c0c0',
  },
  CategoryCircleView: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  CategoryIcons: {
    height: 45,
    width: 45,
    resizeMode: 'contain',
  },
  Downarrow: {
    width: 15,
    height: 15,
    right: 20,
    resizeMode: 'contain',
  },
  ApplyView: {
    marginTop: -10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 10,
  },
  ApplyBtn: {
    backgroundColor: '#F6D700',
    padding: 10,
    height: 40,
    width: 150,
    borderRadius: 20,
    alignItems: 'center',
  },
});
export default LookingHotelSteps;
