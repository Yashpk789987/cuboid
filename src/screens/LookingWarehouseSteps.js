/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

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

class LookingWarehouseSteps extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      Cost: null,
      Sizeft: null,
      KMtatmac: null,
      clicked: false,
      type: '',
      mainCategory: '',
      conferencefacilites: false,
      freshoutdoors: false,
      aircon: false,
      fullyfurnished: false,
      landscapegarden: false,
      wifi: false,
      zoning: '',
      townLocation: '',
      accessRoad: '',
      tenants: '',
      elevator: '',
      security: '',
      vehicleTraffic: '',
      humanTraffic: '',
      meetingRoom: '',
      parking: '',
      sharedsecretary: false,
      sizeinfeet: {
        min: 500,
        max: 8000,
      },
      cost: {
        min: 1000,
        max: 90000,
      },
      kmfromtarmac: 2,
      Type_Data: [
        {
          index: '0',
          imageurl: require('../../assets/Icons/godown.png'),
          name: 'Go Down',
          code: 'godown',
        },
        {
          index: '1',
          imageurl: require('../../assets/Icons/commercialspace.png'),
          name: 'Commercial Space',
          code: 'commercialspace',
        },
      ],
      Choose_Main_Category: [
        {
          index: '0',
          imageurl: require('../../assets/Icons/Buy.png'),
          name: 'Buy',
          code: 'buy',
        },
        {
          index: '1',
          imageurl: require('../../assets/Icons/Rent.png'),
          name: 'Let',
          code: 'let',
        },
      ],
      Select_Services: [
        {
          index: '0',
          imageurl: require('../../assets/Icons/Conferencefacilities.png'),
          name: 'Confrence',
          code: 'conferencefacilites',
        },
        {
          index: '1',
          imageurl: require('../../assets/Icons/freshoutdoor.png'),
          name: 'Fresh Outdoor',
          code: 'freshoutdoors',
        },
        {
          index: '2',
          imageurl: require('../../assets/Icons/Wifi.png'),
          name: 'Wifi',
          code: 'wifi',
        },
        {
          index: '3',
          imageurl: require('../../assets/Icons/aircon.png'),
          name: 'Aircone',
          code: 'aircon',
        },
        {
          index: '4',
          imageurl: require('../../assets/Icons/fullyfurnished.png'),
          name: 'Fully Furnished',
          code: 'fullyfurnished',
        },
        {
          index: '5',
          imageurl: require('../../assets/Icons/sharedsecretary.png'),
          name: 'Shared Secretary',
          code: 'sharedsecretary',
        },
        {
          index: '6',
          imageurl: require('../../assets/Icons/Redsoil.png'),
          name: 'Large Garden',
          code: 'landscapegarden',
        },
      ],
      Zooning_Data: [
        {
          index: '0',
          imageurl: require('../../assets/Icons/commercial2.png'),
          name: 'Commercial',
          code: 'commercial',
        },
        {
          index: '1',
          imageurl: require('../../assets/Icons/industrial2.png'),
          name: 'Indrustial',
          code: 'industrial',
        },
        {
          index: '2',
          imageurl: require('../../assets/Icons/Residential.png'),
          name: 'Residential',
          code: 'residential',
        },
        {
          index: '3',
          imageurl: require('../../assets/Icons/EPZ.png'),
          name: 'EPZ',
          code: 'epz',
        },
      ],
      Access_Road_Data: [
        {
          index: '0',
          imageurl: require('../../assets/Icons/Tarmac.png'),
          name: 'Tarmac',
          code: 'tarmac',
        },
        {
          index: '1',
          imageurl: require('../../assets/Icons/Cabro.png'),
          name: 'Cabro',
          code: 'cabro',
        },
        {
          index: '2',
          imageurl: require('../../assets/Icons/AllWather.png'),
          name: 'All Weather',
          code: 'allweather',
        },
        {
          index: '3',
          imageurl: require('../../assets/Icons/Tarmac.png'),
          name: 'Main',
          code: 'main',
        },
      ],
      Town_Location_Data: [
        {
          index: '0',
          imageurl: require('../../assets/Icons/commercial2.png'),
          name: 'Downtown',
          code: 'downtown',
        },
        {
          index: '1',
          imageurl: require('../../assets/Icons/industrial2.png'),
          name: 'Uptown',
          code: 'uptown',
        },
        {
          index: '2',
          imageurl: require('../../assets/Icons/Residential.png'),
          name: 'Near Town',
          code: 'neartown',
        },
      ],
      Tenants_Data: [
        {
          index: '0',
          imageurl: require('../../assets/Icons/Bathrooms.png'),
          name: 'Mixed',
          code: 'mixed',
        },
        {
          index: '1',
          imageurl: require('../../assets/Icons/SteamBath.png'),
          name: 'Specialized',
          code: 'specialized',
        },
        {
          index: '2',
          imageurl: require('../../assets/Icons/Lift.png'),
          name: 'Processing',
          code: 'processing',
        },
      ],
      elevators: [
        {label: 'NONE', code: 'none'},
        {label: 'GOODS', code: 'goods'},
        {label: 'PASSENGER', code: 'passenger'},
        {label: 'PASSENGERS AND GOODS', code: 'passengersandgoods'},
      ],
      securites: [
        {label: 'TIGHT', code: 'tight'},
        {label: 'MAINGATE', code: 'maingate'},
        {label: 'MAINGATE AND FLOORS', code: 'maingateandfloors'},
        {label: 'NONE', code: 'none'},
      ],
      vehicleTraffics: [
        {label: 'VERY HIGH', code: 'veryhigh'},
        {label: 'HIGH', code: 'high'},
        {label: 'LOW', code: 'low'},
      ],
      meetingrooms: [
        {label: 'NONE', code: 'none'},
        {label: 'FREE', code: 'free'},
        {label: 'PAID', code: 'paid'},
      ],
      params: {},
      message: '',
      url: 'https://cuboidtechnologies.com/api/search/warehouse-search',
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
    // console.log(this.state.index);
    if (this.state.index === 0) {
      this.props.navigation.navigate('WelcomeScreen');
    }
  };
  ChangeColor = () => {
    this.setState({
      unclicked: this.state.clicked,
    });
  };

  _searchStep1 = async (next = false) => {
    const {
      type,
      mainCategory,
      cost,
      sizeinfeet,
      kmfromtarmac,
      params,
    } = this.state;
    if (type === '') {
      this.setState({message: 'please select type'});
    } else if (mainCategory === '') {
      this.setState({message: 'please select category'});
    } else {
      this.setState({message: ''});
      let data = {
        ...params,
        attributes: {
          Type: type,
          mainCategory,
        },
        cost,
        sizeinfeet,
        kmfromtarmac,
      };
      if (next) {
        await this.setState({params: data});
        this.setState({
          index: this.state.index + 1,
        });
      } else {
        this.props.navigation.navigate('SearchFlipbook', {
          params: data,
          url: this.state.url,
        });
      }
    }
  };

  _searchStep2 = async (next = false) => {
    const {
      conferencefacilites,
      freshoutdoors,
      wifi,
      aircon,
      fullyfurnished,
      sharedsecretary,
      landscapegarden,
      params,
    } = this.state;
    let newData = {};
    if (conferencefacilites) {
      newData = {...newData, conferencefacilites};
    }
    if (freshoutdoors) {
      newData = {...newData, conferencefacilites};
    }
    if (wifi) {
      newData = {...newData, wifi};
    }
    if (aircon) {
      newData = {...newData, aircon};
    }
    if (fullyfurnished) {
      newData = {...newData, fullyfurnished};
    }
    if (sharedsecretary) {
      newData = {...newData, sharedsecretary};
    }
    if (landscapegarden) {
      newData = {...newData, landscapegarden};
    }
    await this.setState({
      params: {...params, attributes: {...params.attributes, ...newData}},
    });
    if (next) {
      this.setState({
        index: this.state.index + 1,
      });
    } else {
      this.props.navigation.navigate('SearchFlipbook', {
        params: this.state.params,
        url: this.state.url,
      });
    }
  };

  _searchStep3 = async () => {
    const {
      zoning,
      townLocation,
      accessRoad,
      tenants,
      elevator,
      security,
      vehicleTraffic,
      humanTraffic,
      meetingRoom,
      parking,
      params,
    } = this.state;

    if (zoning === '') {
      this.setState({message: 'please select zoning'});
      alert('please select zoning');
    } else if (townLocation === '') {
      this.setState({message: 'please select town location'});
      alert('please elect town location');
    } else if (accessRoad === '') {
      this.setState({message: 'please select access road'});
      alert('please select town location');
    } else if (tenants === '') {
      this.setState({message: 'please select tenants '});
      alert('please select town location');
    } else if (elevator === '') {
      this.setState({message: 'please select elevator'});
      alert('please select town location');
    } else if (security === '') {
      this.setState({message: 'please select security'});
      alert('please select security');
    } else if (vehicleTraffic === '') {
      this.setState({message: 'please select vehicle traffic'});
      alert('please select vehicle traffic');
    } else if (humanTraffic === '') {
      this.setState({message: 'please select human traffic'});
      alert('please select human traffic');
    } else if (meetingRoom === '') {
      this.setState({message: 'please select meeting room'});
      alert('please select meeting room');
    } else if (parking === '') {
      this.setState({message: 'please select parking'});
      alert('please select parking');
    } else {
      this.setState({message: ''});
      const newData = {
        zoning,
        townLocation,
        accessRoad,
        tenants,
        elevator,
        security,
        vehicleTraffic,
        humanTraffic,
        meetingRoom,
        parking,
      };
      const newParams = {
        ...params,
        attributes: {...params.attributes, ...newData},
      };
      this.props.navigation.navigate('SearchFlipbook', {
        params: newParams,
        url: this.state.url,
      });
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
      activeStepIconBorderColor: '#000',
      activeLabelColor: '#000',
      activeStepNumColor: '#FFA500',
      completedStepIconColor: '#000',
      completedProgressBarColor: '#000',
      completedCheckColor: '#fff',
      height: 50,
      width: 100,
      borderRadius: 20,
    };

    return (
      <View style={{flex: 1}}>
        <ScrollView style={{bottom: 10}}>
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
                  {isLoggedIn ? firstname : 'Sign Up'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/*////////////////////////////  Header end  /////////////////////////////// */}

          <View style={{width: '100%'}}>
            {/* ////////////////////////////////  ProcessSteps Start Here  ///////////////////////////////// */}
            <ProgressSteps
              {...progressStepsStyle}
              activeStep={this.state.index}>
              {/* ////////////////////////// First ProcessStep Start Here ////////////////////////////// */}
              <ProgressStep
                activeLabelColor="#000"
                label="Step 1"
                onNext={this.onPaymentStepComplete}
                onPrevious={this.onPrevStep}
                scrollViewProps={this.defaultScrollViewProps}
                removeBtnRow={true}>
                <View style={{top: 20}}>
                  {/* ///////////////////// TYPE COLLAPSE////////////////////////////// */}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Type
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
                        data={this.state.Type_Data}
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
                              onPress={() => this.setState({type: item.code})}
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100 / 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor:
                                  this.state.type === item.code
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
                              <Text style={{fontSize: 12, textAlign: 'center'}}>
                                {item.name}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      />
                    </CollapseBody>
                  </Collapse>
                  {/* /////////////////////  Choose a category  ////////////////////////////// */}

                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Choose a category{' '}
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
                        data={this.state.Choose_Main_Category}
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
                                this.setState({mainCategory: item.code})
                              }
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100 / 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor:
                                  this.state.mainCategory === item.code
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
                    ;
                  </Collapse>

                  {/* ////////////////////////////////  COST /////////////////////////////////////////// */}

                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Cost
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
                          <Text>${this.state.cost.min}</Text>
                          <Text>-{this.state.cost.max}</Text>
                        </View>
                        <RangeSlider
                          style={{width: '100%', height: 70}}
                          gravity={'center'}
                          min={1000}
                          max={90000}
                          step={1000}
                          handleBorderWidth={0.5}
                          handleBorderColor="#F6D700"
                          selectionColor="#F6D700"
                          blankColor="#808080"
                          onValueChanged={(Min_Cost, Max_Cost) => {
                            this.setState({
                              cost: {
                                min: Min_Cost,
                                max: Max_Cost,
                              },
                            });
                          }}
                        />
                      </View>
                    </CollapseBody>
                  </Collapse>
                  {/* ////////////////////////////////  Size in Feet /////////////////////////////////////////// */}

                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Size in ft
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
                          <Text>${this.state.sizeinfeet.min}</Text>
                          <Text>-{this.state.sizeinfeet.max}</Text>
                        </View>
                        <RangeSlider
                          style={{width: '100%', height: 70}}
                          gravity={'center'}
                          min={500}
                          max={8000}
                          step={100}
                          handleBorderWidth={0.5}
                          handleBorderColor="#F6D700"
                          selectionColor="#F6D700"
                          blankColor="#808080"
                          onValueChanged={(Min_Size, Max_Size) => {
                            this.setState({
                              sizeinfeet: {
                                min: Min_Size,
                                max: Max_Size,
                              },
                            });
                          }}
                        />
                      </View>
                    </CollapseBody>
                  </Collapse>
                  {/* ////////////////////////////////  KMs from tarmac /////////////////////////////////////////// */}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          KMs from tarmac
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
                          <Text>{this.state.kmfromtarmac} KM</Text>
                        </View>
                        <RangeSlider
                          rangeEnabled={false}
                          style={{width: '100%', height: 70}}
                          gravity={'center'}
                          min={2}
                          max={20}
                          step={1}
                          handleBorderWidth={0.5}
                          handleBorderColor="#F6D700"
                          selectionColor="#F6D700"
                          blankColor="#808080"
                          onValueChanged={(Min_Tarm_Dist, Max_Tarm_Dist) => {
                            this.setState({
                              kmfromtarmac: Min_Tarm_Dist,
                            });
                          }}
                        />
                      </View>
                    </CollapseBody>
                  </Collapse>

                  {/*  //////////////////////////////  Apply btn  /////////////////////////////*/}
                  <View style={styles.ApplyView}>
                    <TouchableOpacity
                      onPress={() => this._searchStep1()}
                      style={styles.ApplyBtn}>
                      <Text style={{fontFamily: 'Lato-Regular'}}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this._searchStep1(true)}
                      style={styles.ApplyBtn}>
                      <Text style={{fontFamily: 'Lato-Regular'}}>Next</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ProgressStep>
              {/* ////////////////////////////////  Second Process Step Start here /////////////////////////////////////////// */}

              <ProgressStep
                label="Step 2"
                removeBtnRow={true}
                onNext={this.onNextStep}
                onPrevious={this.onPrevStep}
                scrollViewProps={this.defaultScrollViewProps}>
                <View style={{top: 20}}>
                  {/* ////////////////////////////////  Select Services /////////////////////////////////////////// */}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Select services
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
                        data={this.state.Select_Services}
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
                                this.setState({
                                  [item.code]: !this.state[item.code],
                                })
                              }
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100 / 2,
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
                  <View style={styles.ApplyView}>
                    <TouchableOpacity
                      onPress={() => this._searchStep2()}
                      style={styles.ApplyBtn}>
                      <Text style={{fontFamily: 'Lato-Regular'}}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this._searchStep2(true)}
                      style={styles.ApplyBtn}>
                      <Text style={{fontFamily: 'Lato-Regular'}}>Next</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ProgressStep>
              <ProgressStep
                label="Step 3"
                removeBtnRow={true}
                onNext={this.onNextStep}
                onPrevious={this.onPrevStep}
                scrollViewProps={this.defaultScrollViewProps}>
                <View style={{top: 20}}>
                  {/* ///////////////////////////  Type/////////////////////////////////// */}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Zooning
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
                        data={this.state.Zooning_Data}
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
                              onPress={() => this.setState({zoning: item.code})}
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100 / 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor:
                                  this.state.zoning === item.code
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
                  {/* ///////////////////////////  Town Location   /////////////////////////////////// */}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Town location{' '}
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
                        data={this.state.Town_Location_Data}
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
                                this.setState({townLocation: item.code})
                              }
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100 / 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor:
                                  this.state.townLocation === item.code
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
                  {/* ///////////////////////////  Access Road  /////////////////////////////////// */}

                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Access road{' '}
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
                        data={this.state.Access_Road_Data}
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
                                this.setState({accessRoad: item.code})
                              }
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100 / 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor:
                                  this.state.accessRoad === item.code
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
                  {/*////////////////////////////////////////////////////// Tenants  //////////////////////////////////  */}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Tenants
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
                        data={this.state.Tenants_Data}
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
                                this.setState({tenants: item.code})
                              }
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100 / 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor:
                                  this.state.tenants === item.code
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
                  {/*/////////////////////////////////////////  Elevator /////////////////////////////////////  */}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Elevator
                        </Text>
                        <Image
                          style={styles.Downarrow}
                          source={require('../../assets/Icons/Downarrow.png')}
                        />
                      </View>
                      <View style={styles.BottomBorder} />
                    </CollapseHeader>

                    <CollapseBody>
                      <View style={{flexDirection: 'row', height: 50}}>
                        {this.state.elevators.map((item) => {
                          return (
                            <TouchableOpacity
                              onPress={() =>
                                this.setState({elevator: item.code})
                              }
                              style={[
                                styles.TouchBTN,
                                {
                                  backgroundColor:
                                    this.state.elevator === item.code
                                      ? '#F6D700'
                                      : '#f2f2f2',
                                },
                              ]}>
                              <Text
                                style={{
                                  fontSize: 10,
                                  fontFamily: 'Lato-Regular',
                                }}>
                                {item.label}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </CollapseBody>
                  </Collapse>
                  {/* /////////////////////////////// Security  ////////////////////////////////////// */}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Security
                        </Text>
                        <Image
                          style={styles.Downarrow}
                          source={require('../../assets/Icons/Downarrow.png')}
                        />
                      </View>
                      <View style={styles.BottomBorder} />
                    </CollapseHeader>

                    <CollapseBody>
                      <View style={{flexDirection: 'row', height: 50}}>
                        {this.state.securites.map((item) => {
                          return (
                            <TouchableOpacity
                              onPress={() =>
                                this.setState({security: item.code})
                              }
                              style={[
                                styles.TouchBTN,
                                {
                                  backgroundColor:
                                    this.state.security === item.code
                                      ? '#F6D700'
                                      : '#f2f2f2',
                                },
                              ]}>
                              <Text
                                style={{
                                  fontSize: 10,
                                  fontFamily: 'Lato-Regular',
                                }}>
                                {item.label}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </CollapseBody>
                  </Collapse>
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Vehicle traffic
                        </Text>
                        <Image
                          style={styles.Downarrow}
                          source={require('../../assets/Icons/Downarrow.png')}
                        />
                      </View>
                      <View style={styles.BottomBorder} />
                    </CollapseHeader>

                    <CollapseBody>
                      <View style={{flexDirection: 'row', height: 50}}>
                        {this.state.vehicleTraffics.map((item) => {
                          return (
                            <TouchableOpacity
                              onPress={() =>
                                this.setState({vehicleTraffic: item.code})
                              }
                              style={[
                                styles.TouchBTN,
                                {
                                  backgroundColor:
                                    this.state.vehicleTraffic === item.code
                                      ? '#F6D700'
                                      : '#f2f2f2',
                                },
                              ]}>
                              <Text
                                style={{
                                  fontSize: 10,
                                  fontFamily: 'Lato-Regular',
                                }}>
                                {item.label}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </CollapseBody>
                  </Collapse>
                  {/* //////////////////////////////////////  Human Traffic  ///////////////////////////////////////// */}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Human traffic
                        </Text>
                        <Image
                          style={styles.Downarrow}
                          source={require('../../assets/Icons/Downarrow.png')}
                        />
                      </View>
                      <View style={styles.BottomBorder} />
                    </CollapseHeader>

                    <CollapseBody>
                      <View style={{flexDirection: 'row', height: 50}}>
                        {this.state.vehicleTraffics.map((item) => {
                          return (
                            <TouchableOpacity
                              onPress={() =>
                                this.setState({humanTraffic: item.code})
                              }
                              style={[
                                styles.TouchBTN,
                                {
                                  backgroundColor:
                                    this.state.humanTraffic === item.code
                                      ? '#F6D700'
                                      : '#f2f2f2',
                                },
                              ]}>
                              <Text
                                style={{
                                  fontSize: 10,
                                  fontFamily: 'Lato-Regular',
                                }}>
                                {item.label}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </CollapseBody>
                  </Collapse>
                  {/* ///////////////////////////////////////  Meeting room  ////////////////////////////////////////// */}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Meeting room
                        </Text>
                        <Image
                          style={styles.Downarrow}
                          source={require('../../assets/Icons/Downarrow.png')}
                        />
                      </View>
                      <View style={styles.BottomBorder} />
                    </CollapseHeader>

                    <CollapseBody>
                      <View style={{flexDirection: 'row', height: 50}}>
                        {this.state.meetingrooms.map((item) => {
                          return (
                            <TouchableOpacity
                              onPress={() =>
                                this.setState({meetingRoom: item.code})
                              }
                              style={[
                                styles.TouchBTN,
                                {
                                  backgroundColor:
                                    this.state.meetingRoom === item.code
                                      ? '#F6D700'
                                      : '#f2f2f2',
                                },
                              ]}>
                              <Text
                                style={{
                                  fontSize: 10,
                                  fontFamily: 'Lato-Regular',
                                }}>
                                {item.label}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </CollapseBody>
                  </Collapse>
                  {/* //////////////////////////////// Parking  ///////////////////////// */}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Parking
                        </Text>
                        <Image
                          style={styles.Downarrow}
                          source={require('../../assets/Icons/Downarrow.png')}
                        />
                      </View>
                      <View style={styles.BottomBorder} />
                    </CollapseHeader>

                    <CollapseBody>
                      <View style={{flexDirection: 'row', height: 50}}>
                        {this.state.meetingrooms.map((item) => {
                          return (
                            <TouchableOpacity
                              onPress={() =>
                                this.setState({parking: item.code})
                              }
                              style={[
                                styles.TouchBTN,
                                {
                                  backgroundColor:
                                    this.state.parking === item.code
                                      ? '#F6D700'
                                      : '#f2f2f2',
                                },
                              ]}>
                              <Text
                                style={{
                                  fontSize: 10,
                                  fontFamily: 'Lato-Regular',
                                }}>
                                {item.label}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </CollapseBody>
                  </Collapse>
                  {/*/////////////////////////////////////////////  Apply and Search Button's ////////////////////////////// */}
                  <View style={styles.ApplyView}>
                    <TouchableOpacity
                      onPress={() => this._searchStep3()}
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
            {/* End Steps */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

LookingWarehouseSteps.contextType = UserContext;

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
    marginTop: 20,
  },
  HeaderText: {
    color: '#FFA500',
    fontSize: 18,
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

  TouchBTN: {
    marginLeft: 10,
    padding: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 1,
  },
});
export default LookingWarehouseSteps;
