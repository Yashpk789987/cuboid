/* eslint-disable react-native/no-inline-styles */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';

import RangeSlider from 'rn-range-slider';
import Modal from 'react-native-modal';
import {UserContext} from '../contexts/UserContext';

class LookingHouseSteps extends Component {
  constructor() {
    super();
    this.state = {
      cost: {
        max: 90000,
        min: 10,
      },
      area: '4000',
      mainCategory: '',
      subCategory: '',
      propertyStatus: '',
      location: '',
      bedroom: '4',
      balcony: undefined,
      borehole: undefined,
      cctv: undefined,
      disabilityfeature: undefined,
      fireplace: undefined,
      maturegarden: undefined,
      opticalfiber: undefined,
      partyarea: undefined,
      gym: undefined,
      livingsize: {
        min: 50,
        max: 5000,
      },

      kitchensize: {
        min: 50,
        max: 5000,
      },

      gardensize: {
        min: 50,
        max: 5000,
      },
      AreaName: '',
      featurename: '',
      featurearray: [],
      index: 0,
      isModalVisible: false,
      isModalVisible1: false,
      BathroomCounter: 0,
      bathrooms: 0,
      bathtab: 0,
      steambath: 0,
      lift: 0,
      parking: 0,

      TotalBathrooms: '',
      WeSelect: '',
      AreaSelect: '',

      MainCategory: [
        {
          index: '0',
          imageurl: require('../../assets/Icons/Buy.png'),
          name: 'Buy',
          code: 'buy',
        },
        {
          index: '1',
          imageurl: require('../../assets/Icons/Rent.png'),
          name: 'Rent',
          code: 'rent',
        },
        {
          index: '2',
          imageurl: require('../../assets/Icons/FullyFurnished1.png'),
          name: 'Fully Furnished',
          code: 'rent',
        },
      ],
      SubCategory: [
        {
          index: '0',
          imageurl: require('../../assets/Icons/Gated.png'),
          name: 'Gated',
          code: 'gated',
        },
        {
          index: '1',
          imageurl: require('../../assets/Icons/Own.png'),
          name: 'Stand Alone',
          code: 'standalone',
        },
        {
          index: '2',
          imageurl: require('../../assets/Icons/Apartment1.png'),
          name: 'Apartment',
          code: 'apartment',
        },
      ],
      Bedrooms: [
        {
          index: '1',
          name: '1',
        },
        {
          index: '2',
          name: '2',
        },
        {
          index: '3',
          name: '3',
        },
        {
          index: '4',
          name: 'more then three',
        },
      ],
      PropertyStatus: [
        {
          index: '0',
          imageurl: require('../../assets/Icons/Completed.png'),
          name: 'Completed',
          code: 'completed',
        },
        {
          index: '1',
          imageurl: require('../../assets/Icons/Offplan.png'),
          name: 'Off plan',
          code: 'offplan',
        },
        {
          index: '2',
          imageurl: require('../../assets/Icons/Refurbished.png'),
          name: 'Refurbished',
          code: 'refurbished',
        },
      ],
      Select_More_Featurs: [
        {
          index: '0',
          imageurl: require('../../assets/Icons/OpticalFiber.png'),
          name: 'Optical Fiber',
          key: 'opticalfiber',
        },

        {
          index: '1',
          imageurl: require('../../assets/Icons/FirePlace.png'),
          name: ' Fire Place',
          key: 'fireplace',
        },

        {
          index: '2',
          imageurl: require('../../assets/Icons/CCTV.png'),
          name: 'CCTV',
          key: 'cctv',
        },
        {
          index: '3',
          imageurl: require('../../assets/Icons/BoreHole.png'),
          name: '   Bore Hole',
          key: 'borehole',
        },
        {
          index: '4',
          imageurl: require('../../assets/Icons/Disability.png'),
          name: ' Disability',
          key: 'disabilityfeature',
        },
        {
          index: '5',
          imageurl: require('../../assets/Icons/MatureGarden.png'),
          name: 'Mature  Garden',
          key: 'maturegarden',
        },
        {
          index: '6',
          imageurl: require('../../assets/Icons/Balcony.png'),
          name: 'Balcony',
          key: 'balcony',
        },
        {
          index: '7',
          imageurl: require('../../assets/Icons/PartyArea.png'),
          name: '   Party Area',
          key: 'partyarea',
        },
      ],
      Select_Services: [
        {
          index: '0',
          imageurl: require('../../assets/Icons/Bathrooms.png'),
          name: 'Bathrooms',
          area: false,
        },
        {
          index: '1',
          imageurl: require('../../assets/Icons/SteamBath.png'),
          name: 'SteamBath',
          area: false,
        },
        {
          index: '2',
          imageurl: require('../../assets/Icons/Lift.png'),
          name: 'Lift',
          area: false,
        },
        {
          index: '3',
          imageurl: require('../../assets/Icons/BathTub.png'),
          name: 'BathTub',
          area: false,
        },
        {
          index: '4',
          imageurl: require('../../assets/Icons/Parking.png'),
          name: 'Parking',
          area: false,
        },
        {
          index: '5',
          imageurl: require('../../assets/Icons/GYM.png'),
          name: 'GYM',
          area: false,
        },
        {
          index: '6',
          imageurl: require('../../assets/Icons/LivingArea.png'),
          name: 'Living Area',
          area: true,
        },
        {
          index: '7',
          imageurl: require('../../assets/Icons/Kitchen.png'),
          name: 'Kitchen Area',
          area: true,
        },
        {
          index: '8',
          imageurl: require('../../assets/Icons/Garden.png'),
          name: 'Garden Area',
          area: true,
        },
      ],
      message: '',
      params: undefined,
      url: 'https://cuboidtechnologies.com/api/search/house-search',
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

  AddBathroom = () => {
    this.setState({BathroomCounter: this.state.BathroomCounter + 1});
  };

  SubtaractBathroom = () => {
    this.setState({BathroomCounter: this.state.BathroomCounter - 1});
  };

  closemodal = () => {
    this.setState({
      isModalVisible: false,
      isModalVisible1: false,
    });
  };

  toggleModal = (name, area) => {
    if (name === 'GYM') {
      this.setState((p) => ({...p, gym: !p.gym}));
      return;
    }
    if (area === false) {
      this.setState({
        isModalVisible: !this.state.isModalVisible,
        WeSelect: name,
      });
    } else {
      this.setState({
        isModalVisible1: !this.state.slidermodal1,
        AreaSelect: name,
      });
    }
  };

  _searchStep1 = (nextPage = false) => {
    this.setState({message: ''});
    const {
      cost: {max, min},
      bedroom,
      subCategory,
      propertyStatus,
      AreaName,
      mainCategory,
    } = this.state;
    if (mainCategory === '') {
      this.setState({message: '* Required MainCategory'});
    } else if (subCategory === '') {
      this.setState({message: '* Required SubCategory'});
    } else if (propertyStatus === '') {
      this.setState({message: '* Required property status'});
    } else {
      let data = {
        cost: {
          max,
          min,
        },
        attributes: {
          bedroom: bedroom,
          mainCategory: mainCategory,
          subCategory: subCategory,
          propertyStatus: propertyStatus,
        },
      };
      if (AreaName !== '') {
        data = {...data, Area: AreaName};
      }

      if (nextPage) {
        this.setState({params: data});
        this.setState({
          index: this.state.index + 1,
        });
      } else {
        if (this.context.payload.isLoggedIn) {
          this.props.navigation.navigate('SearchFlipbook', {
            params: data,
            url: this.state.url,
          });
        } else {
          this.props.navigation.navigate('LoginPage');
        }
      }
    }
  };

  _searchStep2 = async (next = false) => {
    const {
      opticalfiber,
      fireplace,
      cctv,
      borehole,
      disabilityfeature,
      maturegarden,
      balcony,
      partyarea,
    } = this.state;

    let data = {};

    if (opticalfiber) {
      data = {...data, opticalfiber};
    }

    if (fireplace) {
      data = {...data, fireplace};
    }
    if (cctv) {
      data = {...data, cctv};
    }
    if (borehole) {
      data = {...data, borehole};
    }
    if (disabilityfeature) {
      data = {...data, disabilityfeature};
    }
    if (maturegarden) {
      data = {...data, maturegarden};
    }
    if (balcony) {
      data = {...data, balcony};
    }
    if (partyarea) {
      data = {...data, partyarea};
    }
    if (next) {
      await this.setState((prev) => ({
        ...prev,
        params: {
          ...prev.params,
          attributes: {...prev.params.attributes, ...data},
        },
      }));
      this.setState({
        index: this.state.index + 1,
      });
    } else {
      const params = {
        ...this.state.params,
        attributes: {...this.state.params.attributes, ...data},
      };
      if (this.context.payload.isLoggedIn) {
        this.props.navigation.navigate('SearchFlipbook', {
          params,
          url: this.state.url,
        });
      } else {
        this.props.navigation.navigate('LoginPage');
      }
    }
  };

  _searchStep3 = async () => {
    const {
      bathrooms,
      steambath,
      lift,
      bathtab,
      parking,
      gym,
      params,
      livingsize,
      kitchensize,
      gardensize,
    } = this.state;
    let data = {};
    if (bathrooms > 0) {
      data = {...data, bathrooms};
    }
    if (steambath > 0) {
      data = {...data, steambath};
    }
    if (lift > 0) {
      data = {...data, lift};
    }
    if (bathtab > 0) {
      data = {...data, bathtab};
    }
    if (parking > 0) {
      data = {...data, parking};
    }
    if (gym) {
      data = {...data, gym};
    }

    const finalData = {
      ...params,
      attributes: {...params.attributes, ...data},
      livingsize,
      kitchensize,
      gardensize,
    };
    if (this.context.payload.isLoggedIn) {
      this.props.navigation.navigate('SearchFlipbook', {
        params: finalData,
        url: this.state.url,
      });
    } else {
      this.props.navigation.navigate('LoginPage');
    }
  };

  render() {
    const {
      payload: {
        isLoggedIn,
        user: {firstname},
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
    const {WeSelect} = this.state;

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
                    this.props.navigation.navigate('Profilepage');
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

          <View style={{width: '100%'}}>
            <ProgressSteps
              {...progressStepsStyle}
              activeStep={this.state.index}>
              <ProgressStep
                gravity="true"
                activeLabelColor="#000"
                label="Step 1"
                onNext={this.onPaymentStepComplete}
                onPrevious={this.onPrevStep}
                scrollViewProps={this.defaultScrollViewProps}
                removeBtnRow={true}>
                <View style={{top: 20}}>
                  <Collapse>
                    <CollapseHeader disabled style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Choose one main category
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
                        data={this.state.MainCategory}
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
                  </Collapse>
                  <Collapse>
                    <CollapseHeader disabled style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Bedrooms
                        </Text>
                        <Image
                          style={styles.Downarrow}
                          source={require('../../assets/Icons/Downarrow.png')}
                        />
                      </View>
                      <View style={styles.BottomBorder} />
                    </CollapseHeader>

                    <CollapseBody style={{height: 60}}>
                      <AccordionList
                        data={this.state.Bedrooms}
                        numColumns={5}
                        renderItem={({item}) => (
                          <TouchableOpacity
                            onPress={() => this.setState({bedroom: item.index})}
                            style={{
                              height: 25,
                              borderRadius: 12.5,
                              paddingHorizontal: 10,
                              backgroundColor:
                                this.state.bedroom === item.index
                                  ? '#F6D700'
                                  : '#f2f2f2',
                              shadowColor: '#000',
                              shadowOffset: {width: 2, height: 2},
                              shadowOpacity: 0.25,
                              shadowRadius: 3.84,
                              elevation: 5,
                              marginLeft: 10,
                              marginBottom: 10,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text>{item.name}</Text>
                          </TouchableOpacity>
                        )}
                      />
                    </CollapseBody>
                  </Collapse>
                  <Collapse>
                    <CollapseHeader disabled style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Choose sub category
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
                        data={this.state.SubCategory}
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
                                this.setState({subCategory: item.code})
                              }
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100 / 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor:
                                  this.state.subCategory === item.code
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
                  <Collapse>
                    <CollapseHeader disabled style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Search property status
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
                        data={this.state.PropertyStatus}
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
                                this.setState({propertyStatus: item.code})
                              }
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100 / 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor:
                                  this.state.propertyStatus === item.code
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
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Enter location suburb town
                        </Text>
                        <Image
                          style={styles.Downarrow}
                          source={require('../../assets/Icons/Downarrow.png')}
                        />
                      </View>
                      <View style={styles.BottomBorder} />
                    </CollapseHeader>

                    <CollapseBody>
                      <View style={{padding: 20}}>
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
                            placeholder="Enter address city or neighboard"
                            onChangeText={(text) =>
                              this.setState({location: text})
                            }
                            style={{left: 20, fontFamily: 'Lato-Regular'}}
                          />
                        </View>
                      </View>
                    </CollapseBody>
                  </Collapse>
                  {/* ///////////////////////////////////// Cost slider /////////////////////////////////// */}
                  <Collapse>
                    <CollapseHeader>
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
                          }}>
                          <Text>KSH {this.state.cost.min}</Text>
                          <Text>-{this.state.cost.max}</Text>
                        </View>
                        <RangeSlider
                          style={{width: '100%', height: 70}}
                          gravity="top"
                          min={10}
                          max={90000}
                          step={50}
                          handleBorderWidth={1}
                          handleBorderColor="#F6D700"
                          selectionColor="#F6D700"
                          blankColor="#808080"
                          onValueChanged={(low, high) => {
                            this.setState({cost: {min: low, max: high}});
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
                <Text
                  style={{
                    color: '#D33257',
                    paddingTop: 8,
                    paddingHorizontal: 32,
                    textAlign: 'left',
                  }}>
                  {this.state.message}
                </Text>
              </ProgressStep>
              <ProgressStep
                label="Step 2"
                removeBtnRow={true}
                onNext={this.onNextStep}
                onPrevious={this.onPrevStep}
                scrollViewProps={this.defaultScrollViewProps}>
                <View style={{top: 20}}>
                  <Collapse>
                    <CollapseHeader disabled style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Select more features
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
                              onPress={() =>
                                this.setState((prev) => ({
                                  ...prev,
                                  [item.key]: !prev[item.key],
                                }))
                              }
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: this.state[item.key]
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
                      <Text style={{fontFamily: 'Lato-Regular'}}>Next </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ProgressStep>
              {/* ///////////////////////////////////// Third Step/////////////////////////////////// */}
              <ProgressStep
                label="Step 3"
                removeBtnRow={true}
                onNext={this.onNextStep}
                onPrevious={this.onPrevStep}
                scrollViewProps={this.defaultScrollViewProps}>
                <View style={{top: 20}}>
                  {/* ///////////////////////////////////// Slelect More Featurs /////////////////////////////////// */}
                  <Collapse>
                    <CollapseHeader disabled style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Select more features
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
                                this.toggleModal(item.name, item.area)
                              }
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100 / 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor:
                                  item.name === 'GYM' && this.state.gym === true
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
                      onPress={() => this._searchStep3()}
                      style={styles.ApplyBtn}>
                      <Text style={{fontFamily: 'Lato-Regular'}}>Search</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ProgressStep>
            </ProgressSteps>
          </View>

          <Modal
            style={{margin: 0}}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={500}
            isVisible={this.state.isModalVisible}>
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  height: 400,
                  width: '100%',
                  bottom: 0,
                  position: 'absolute',
                  backgroundColor: '#fff',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                  }}>
                  <Text>{WeSelect}</Text>
                  <TouchableOpacity onPress={() => this.closemodal()}>
                    <Text>Close</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: '#cccccc',
                  }}
                />
                <View style={{padding: 20, top: 40}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    {WeSelect === 'Bathrooms' && (
                      <>
                        <TouchableOpacity
                          disabled={this.state.bathrooms === 0}
                          onPress={() =>
                            this.setState((p) => ({
                              ...p,
                              bathrooms: p.bathrooms - 1,
                            }))
                          }
                          style={styles.LeftClickView}>
                          <Text style={{fontWeight: 'bold', fontSize: 30}}>
                            -
                          </Text>
                        </TouchableOpacity>

                        <View style={styles.TotalCountView}>
                          <Text style={{fontWeight: 'bold', fontSize: 30}}>
                            {this.state.bathrooms}
                          </Text>
                        </View>
                        <TouchableOpacity
                          disabled={this.state.BathroomCounter === 10}
                          onPress={() =>
                            this.setState((p) => ({
                              ...p,
                              bathrooms: p.bathrooms + 1,
                            }))
                          }
                          style={styles.LeftClickView}>
                          <Text style={{fontWeight: 'bold', fontSize: 30}}>
                            +
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                    {WeSelect === 'SteamBath' && (
                      <>
                        <TouchableOpacity
                          disabled={this.state.steambath === 0}
                          onPress={() =>
                            this.setState((p) => ({
                              ...p,
                              steambath: p.steambath - 1,
                            }))
                          }
                          style={styles.LeftClickView}>
                          <Text style={{fontWeight: 'bold', fontSize: 30}}>
                            -
                          </Text>
                        </TouchableOpacity>

                        <View style={styles.TotalCountView}>
                          <Text style={{fontWeight: 'bold', fontSize: 30}}>
                            {this.state.steambath}
                          </Text>
                        </View>
                        <TouchableOpacity
                          disabled={this.state.steambath === 10}
                          onPress={() =>
                            this.setState((p) => ({
                              ...p,
                              steambath: p.steambath + 1,
                            }))
                          }
                          style={styles.LeftClickView}>
                          <Text style={{fontWeight: 'bold', fontSize: 30}}>
                            +
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                    {WeSelect === 'Lift' && (
                      <>
                        <TouchableOpacity
                          disabled={this.state.lift === 0}
                          onPress={() =>
                            this.setState((p) => ({
                              ...p,
                              lift: p.lift - 1,
                            }))
                          }
                          style={styles.LeftClickView}>
                          <Text style={{fontWeight: 'bold', fontSize: 30}}>
                            -
                          </Text>
                        </TouchableOpacity>

                        <View style={styles.TotalCountView}>
                          <Text style={{fontWeight: 'bold', fontSize: 30}}>
                            {this.state.lift}
                          </Text>
                        </View>
                        <TouchableOpacity
                          disabled={this.state.lift === 10}
                          onPress={() =>
                            this.setState((p) => ({
                              ...p,
                              lift: p.lift + 1,
                            }))
                          }
                          style={styles.LeftClickView}>
                          <Text style={{fontWeight: 'bold', fontSize: 30}}>
                            +
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                    {WeSelect === 'BathTub' && (
                      <>
                        <TouchableOpacity
                          disabled={this.state.bathtab === 0}
                          onPress={() =>
                            this.setState((p) => ({
                              ...p,
                              bathtab: p.bathtab - 1,
                            }))
                          }
                          style={styles.LeftClickView}>
                          <Text style={{fontWeight: 'bold', fontSize: 30}}>
                            -
                          </Text>
                        </TouchableOpacity>

                        <View style={styles.TotalCountView}>
                          <Text style={{fontWeight: 'bold', fontSize: 30}}>
                            {this.state.bathtab}
                          </Text>
                        </View>
                        <TouchableOpacity
                          disabled={this.state.bathtab === 10}
                          onPress={() =>
                            this.setState((p) => ({
                              ...p,
                              bathtab: p.bathtab + 1,
                            }))
                          }
                          style={styles.LeftClickView}>
                          <Text style={{fontWeight: 'bold', fontSize: 30}}>
                            +
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                    {WeSelect === 'Parking' && (
                      <>
                        <TouchableOpacity
                          disabled={this.state.parking === 0}
                          onPress={() =>
                            this.setState((p) => ({
                              ...p,
                              parking: p.parking - 1,
                            }))
                          }
                          style={styles.LeftClickView}>
                          <Text style={{fontWeight: 'bold', fontSize: 30}}>
                            -
                          </Text>
                        </TouchableOpacity>

                        <View style={styles.TotalCountView}>
                          <Text style={{fontWeight: 'bold', fontSize: 30}}>
                            {this.state.parking}
                          </Text>
                        </View>
                        <TouchableOpacity
                          disabled={this.state.parking === 10}
                          onPress={() =>
                            this.setState((p) => ({
                              ...p,
                              parking: p.parking + 1,
                            }))
                          }
                          style={styles.LeftClickView}>
                          <Text style={{fontWeight: 'bold', fontSize: 30}}>
                            +
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            style={{margin: 0}}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={500}
            isVisible={this.state.isModalVisible1}>
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  height: 400,
                  width: '100%',
                  bottom: 0,
                  position: 'absolute',
                  backgroundColor: '#fff',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                  }}>
                  <Text>{this.state.AreaSelect}</Text>
                  <TouchableOpacity onPress={() => this.closemodal()}>
                    <Text>Close</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: '#cccccc',
                  }}
                />
                <View style={{padding: 20, top: 40}}>
                  <View
                    style={{
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    {this.state.AreaSelect === 'Living Area' && (
                      <>
                        <View style={styles.TotalCountView}>
                          <Text style={{fontSize: 20, fontFamily: 'Lato-Bold'}}>
                            {this.state.livingsize.min}
                          </Text>
                          <Text style={{fontSize: 20, fontFamily: 'Lato-Bold'}}>
                            -{this.state.livingsize.max}sq/ft
                          </Text>
                        </View>

                        <RangeSlider
                          style={{width: '100%', height: 70}}
                          gravity="top"
                          min={50}
                          max={5000}
                          step={50}
                          handleBorderWidth={1}
                          handleBorderColor="#F6D700"
                          selectionColor="#F6D700"
                          blankColor="#808080"
                          onValueChanged={(low, high) => {
                            this.setState({
                              livingsize: {
                                min: low,
                                max: high,
                              },
                            });
                          }}
                        />
                      </>
                    )}
                    {this.state.AreaSelect === 'Kitchen Area' && (
                      <>
                        <View style={styles.TotalCountView}>
                          <Text style={{fontSize: 20, fontFamily: 'Lato-Bold'}}>
                            {this.state.kitchensize.min}
                          </Text>
                          <Text style={{fontSize: 20, fontFamily: 'Lato-Bold'}}>
                            -{this.state.kitchensize.max}sq/ft
                          </Text>
                        </View>

                        <RangeSlider
                          style={{width: '100%', height: 70}}
                          gravity="top"
                          min={50}
                          max={5000}
                          step={50}
                          handleBorderWidth={1}
                          handleBorderColor="#F6D700"
                          selectionColor="#F6D700"
                          blankColor="#808080"
                          onValueChanged={(low, high) => {
                            this.setState({
                              kitchensize: {
                                min: low,
                                max: high,
                              },
                            });
                          }}
                        />
                      </>
                    )}
                    {this.state.AreaSelect === 'Garden Area' && (
                      <>
                        <View style={styles.TotalCountView}>
                          <Text style={{fontSize: 20, fontFamily: 'Lato-Bold'}}>
                            {this.state.gardensize.min}
                          </Text>
                          <Text style={{fontSize: 20, fontFamily: 'Lato-Bold'}}>
                            -{this.state.gardensize.max}sq/ft
                          </Text>
                        </View>

                        <RangeSlider
                          style={{width: '100%', height: 70}}
                          gravity="top"
                          min={50}
                          max={5000}
                          step={50}
                          handleBorderWidth={1}
                          handleBorderColor="#F6D700"
                          selectionColor="#F6D700"
                          blankColor="#808080"
                          onValueChanged={(low, high) => {
                            this.setState({
                              gardensize: {
                                min: low,
                                max: high,
                              },
                            });
                          }}
                        />
                      </>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
    width: '100%',
  },
  HeaderView: {
    height: 100,
    width: '100%',
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

  BottomBorder: {
    borderWidth: 0.5,
    width: '100%',
    top: 5,
    borderColor: '#c0c0c0',
  },

  Downarrow: {
    width: 15,
    height: 15,
    right: 20,
    resizeMode: 'contain',
  },
  ApplyView: {
    marginTop: 20,
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
  TotalCountView: {
    height: 70,
    width: '45%',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  LeftClickView: {
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

LookingHouseSteps.contextType = UserContext;

export default LookingHouseSteps;
