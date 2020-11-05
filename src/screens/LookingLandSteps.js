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

class LookingLandSteps extends Component {
  constructor() {
    super();
    this.state = {
      index: 2,
      cost: {min: 0, max: 5000},
      sizeinacres: {min: 0, max: 1000},
      area: '',
      mainCategory: '',
      leasefreehold: '',
      councilwater: false, //optional
      electricity: false, //optional
      readyfence: false, //optional
      gated: false, //optional
      borehole: false, //optional
      controlleddevelopment: false, //optional
      waterfront: false, //optional
      kmtoelectricity: 2,
      kmtoneighbour: 2,
      kmtoshoppingcenter: 2,
      kmtotarmac: 2,
      kmtowater: 2,
      nature: '',
      road: '',
      soilType: '',
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
          name: ' Let',
          code: 'let',
        },
      ],
      Select_Services: [
        {
          index: '0',
          imageurl: require('../../assets/Icons/CouncialWater.png'),
          name: 'Councial Water',
          code: 'councilwater',
        },
        {
          index: '1',
          imageurl: require('../../assets/Icons/Electricityonsite.png'),
          name: 'Elelcticity Site',
          code: 'electricity',
        },
        {
          index: '2',
          imageurl: require('../../assets/Icons/Borehole2.png'),
          name: 'Bore Hole',
          code: 'borehole',
        },
        {
          index: '3',
          imageurl: require('../../assets/Icons/ReadyFence.png'),
          name: 'Ready Fance',
          code: 'readyfence',
        },
        {
          index: '4',
          imageurl: require('../../assets/Icons/ControlledDepartment.png'),
          name: 'Controlled',
          code: 'controlleddevelopment',
        },
        {
          index: '5',
          imageurl: require('../../assets/Icons/WaterFront.png'),
          name: 'Water Front',
          code: 'waterfront',
        },
        {
          index: '6',
          imageurl: require('../../assets/Icons/Gated.png'),
          name: 'Gated',
          code: 'gated',
        },
      ],
      Soil_Type_Data: [
        {
          index: '0',
          imageurl: require('../../assets/Icons/Redsoil.png'),
          name: 'Red',
          code: 'red',
        },
        {
          index: '1',
          imageurl: require('../../assets/Icons/Redsoil.png'),
          name: 'Black Cotton',
          code: 'blackcotton',
        },
        {
          index: '2',
          imageurl: require('../../assets/Icons/Murram.png'),
          name: 'Murram',
          code: 'murram',
        },
      ],
      Nature_Data: [
        {
          index: '0',
          imageurl: require('../../assets/Icons/Residential.png'),
          name: 'Residential',
          code: 'residential',
        },
        {
          index: '1',
          imageurl: require('../../assets/Icons/Commercial.png'),
          name: 'Commercial',
          code: 'commercial',
        },
        {
          index: '2',
          imageurl: require('../../assets/Icons/Indrustial.png'),
          name: 'Industrial',
          code: 'industrial',
        },
      ],
      Road_Data: [
        {
          index: '0',
          imageurl: require('../../assets/Icons/Tarmac.png'),
          name: 'Tarmac',
          code: 'tarmac',
        },
        {
          index: '1',
          imageurl: require('../../assets/Icons/Murram.png'),
          name: 'Murram',
          code: 'murram',
        },
        {
          index: '2',
          imageurl: require('../../assets/Icons/AllWather.png'),
          name: 'All Weather',
          code: 'allweather',
        },
        {
          index: '3',
          imageurl: require('../../assets/Icons/NoRoad.png'),
          name: 'No Road',
          code: 'noroad',
        },
      ],
      params: undefined,
      url: undefined,
      message: '',
      loading: false,
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

  _stepSearch1 = async (next = false) => {
    const {mainCategory, area, cost, sizeinacres, leasefreehold} = this.state;
    if (mainCategory === '') {
      this.setState({message: 'please select main category'});
    } else if (leasefreehold === '') {
      this.setState({message: 'please select lease free hold'});
    } else {
      this.setState({message: ''});
      let params = {
        cost: {min: cost.min, max: cost.max},
        sizeinacres: {min: sizeinacres.min, max: sizeinacres.max},
        attributes: {
          mainCategory: mainCategory,
          leasefreehold: leasefreehold,
        },
      };
      if (area !== '') {
        params = {...params, area};
      }
      const url = 'https://cuboidtechnologies.com/api/search/land-search-1';
      if (next) {
        await this.setState({params: params, url});
        this.setState({
          index: this.state.index + 1,
        });
      } else {
        this.props.navigation.navigate('SearchFlipbook', {
          params,
          url,
        });
      }
    }
  };

  _stepSearch2 = async (next = false) => {
    const {
      councilwater,
      electricity,
      borehole,
      readyfence,
      controlleddevelopment,
      waterfront,
      gated,
      soilType,
      nature,
      road,
      params,
    } = this.state;
    let data = {};
    if (councilwater) {
      data = {...data, councilwater};
    }
    if (electricity) {
      data = {...data, councilwater};
    }
    if (borehole) {
      data = {...data, borehole};
    }
    if (readyfence) {
      data = {...data, readyfence};
    }
    if (controlleddevelopment) {
      data = {...data, controlleddevelopment};
    }
    if (waterfront) {
      data = {...data, waterfront};
    }
    if (gated) {
      data = {...data, gated};
    }
    if (soilType === '') {
      this.setState({message: 'please choose soil type'});
    } else if (nature === '') {
      this.setState({message: 'please choose nature'});
    } else if (road === '') {
      this.setState({message: 'please choose nature'});
    } else {
      this.setState({message: ''});
      data = {...data, soilType, nature, road};
      const url = 'https://cuboidtechnologies.com/api/search/land-search-2';
      const newData = {...params, attributes: {...params.attributes, ...data}};
      if (next) {
        await this.setState({
          params: newData,
          url,
        });
        this.setState({
          index: this.state.index + 1,
        });
      } else {
        this.props.navigation.navigate('SearchFlipbook', {
          params: newData,
          url,
        });
      }
    }
  };

  _stepSearch3 = async () => {
    const {
      kmtoshoppingcenter,
      kmtoneighbour,
      kmtotarmac,
      kmtowater,
      kmtoelectricity,
      params,
    } = this.state;
    const url = 'https://cuboidtechnologies.com/api/search/land-search-3';
    const data = {
      ...params,
      kmtoshoppingcenter,
      kmtoneighbour,
      kmtotarmac,
      kmtowater,
      kmtoelectricity,
    };
    this.props.navigation.navigate('SearchFlipbook', {
      params: data,
      url,
    });
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
          {/* ////////////////////////////// Header start here  ////////////////////////////////  */}
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
          {/* ////////////////////////////// End Header Here /////////////////////////////////////////// */}
          <View style={{width: '100%'}}>
            {/* /////////////////// Main ProcessSteps  Start Here ////////////////////////////////// */}
            <ProgressSteps
              {...progressStepsStyle}
              activeStep={this.state.index}>
              {/* /////////////////////// First Step star Here //////////////////// */}
              <ProgressStep
                activeLabelColor="#000"
                label="Step 1"
                onNext={this.onPaymentStepComplete}
                onPrevious={this.onPrevStep}
                scrollViewProps={this.defaultScrollViewProps}
                removeBtnRow={true}>
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

                {/* /////////////////////////////////////////////  Enter a location suburb or town ///////////////////////////////  */}
                <Collapse>
                  <CollapseHeader style={{height: 60}}>
                    <View style={{paddingHorizontal: 20}}>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          borderWidth: 1,
                          height: 40,
                          borderColor: '#C0C0C0',
                          // backgroundColor: 'red',
                          borderRadius: 20,
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{width: 20, height: 20, left: 20}}
                          source={require('../../assets/Icons/SearchIcon.png')}
                        />
                        <TextInput
                          value={this.state.area}
                          onChangeText={(text) => this.setState({area: text})}
                          placeholderTextColor="#000"
                          placeholder="Enter a location suburb or town"
                          style={{left: 20, fontFamily: 'Lato-Regular'}}
                        />
                      </View>
                    </View>
                  </CollapseHeader>
                </Collapse>

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
                        min={0}
                        max={5000}
                        step={50}
                        handleBorderWidth={0.5}
                        handleBorderColor="#F6D700"
                        selectionColor="#F6D700"
                        blankColor="#808080"
                        onValueChanged={(low, high) => {
                          this.setState({
                            cost: {min: low, max: high},
                          });
                        }}
                      />
                    </View>
                  </CollapseBody>
                </Collapse>

                {/* /////////////////////////////////  Size in area's //////////////////////////////// */}
                <Collapse>
                  <CollapseHeader style={{height: 50}}>
                    <View style={styles.CallHeaderMainView}>
                      <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                        Size in acres
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
                        <Text>{this.state.sizeinacres.min}</Text>
                        <Text>-{this.state.sizeinacres.max} acres </Text>
                      </View>
                      <RangeSlider
                        style={{width: '100%', height: 70}}
                        gravity={'center'}
                        min={0}
                        max={1000}
                        step={1}
                        handleBorderWidth={0.5}
                        handleBorderColor="#F6D700"
                        selectionColor="#F6D700"
                        blankColor="#808080"
                        onValueChanged={(lowSize, highSize) => {
                          this.setState({
                            sizeinacres: {min: lowSize, max: highSize},
                          });
                        }}
                      />
                    </View>
                    <View style={styles.CallBodyMainView}>
                      <View style={{alignItems: 'center'}}>
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({leasefreehold: 'freehold'})
                          }
                          style={[
                            styles.CategoryCircleView,
                            {
                              backgroundColor:
                                this.state.leasefreehold === 'freehold'
                                  ? '#F6D700'
                                  : '#f2f2f2',
                            },
                          ]}>
                          <Image
                            style={styles.CategoryIcons}
                            source={require('../../assets/Icons/Freeholdland.png')}
                          />
                          <Text
                            style={{
                              top: 5,
                              fontSize: 10,
                              fontFamily: 'Lato-Regular',
                            }}>
                            Freehold land
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{alignItems: 'center'}}>
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({leasefreehold: 'lease'})
                          }
                          style={[
                            styles.CategoryCircleView,
                            {
                              backgroundColor:
                                this.state.leasefreehold === 'lease'
                                  ? '#F6D700'
                                  : '#f2f2f2',
                            },
                          ]}>
                          <Image
                            style={styles.CategoryIcons}
                            source={require('../../assets/Icons/XMLTD.png')}
                          />
                          <Text
                            style={{
                              top: 5,
                              fontSize: 10,
                              fontFamily: 'Lato-Regular',
                            }}>
                            Own compound
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View style={{alignItems: 'center'}} />
                    </View>
                  </CollapseBody>
                </Collapse>

                <View style={styles.ApplyView}>
                  <TouchableOpacity
                    onPress={() => this._stepSearch1()}
                    style={styles.ApplyBtn}>
                    <Text style={{fontFamily: 'Lato-Regular'}}>Search</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this._stepSearch1(true)}
                    style={styles.ApplyBtn}>
                    <Text style={{fontFamily: 'Lato-Regular'}}>Next </Text>
                  </TouchableOpacity>
                </View>
              </ProgressStep>

              {/* ////////////////////////////////////////////// Second PprocessStep Start Here ////////////////////// */}
              <ProgressStep
                label="Step 2"
                removeBtnRow={true}
                onNext={this.onNextStep}
                onPrevious={this.onPrevStep}
                scrollViewProps={this.defaultScrollViewProps}>
                <View style={{top: 20}}>
                  {/* /////////////////////////// Select Services /////////////////////////  */}
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
                                this.setState((p) => ({
                                  ...p,
                                  [item.code]: !p[item.code],
                                }))
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
                                // backgroundColor: this.state.index == item.index ? 'red' : 'green',
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
                  {/*/////////////////////////////////  Soil type ///////////////////////////////////////////// */}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          Soil type
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
                        data={this.state.Soil_Type_Data}
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
                                this.setState({soilType: item.code})
                              }
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100 / 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor:
                                  this.state.soilType === item.code
                                    ? '#F6D700'
                                    : '#f2f2f2',
                                // backgroundColor: this.state.index == item.index ? 'red' : 'green',
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
                  {/* /////////////////////////////////////////////   Nature  /////////////////////*/}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10}}>Nature</Text>
                        <Image
                          style={styles.Downarrow}
                          source={require('../../assets/Icons/Downarrow.png')}
                        />
                      </View>
                      <View style={styles.BottomBorder} />
                    </CollapseHeader>

                    <CollapseBody>
                      <AccordionList
                        data={this.state.Nature_Data}
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
                              onPress={() => this.setState({nature: item.code})}
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100 / 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor:
                                  this.state.nature === item.code
                                    ? '#F6D700'
                                    : '#f2f2f2',

                                // backgroundColor: this.state.index == item.index ? 'red' : 'green',
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
                  {/* ///////////////////////////////////////////// Road  /////////////////////////////////////////*/}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10}}>Road</Text>
                        <Image
                          style={styles.Downarrow}
                          source={require('../../assets/Icons/Downarrow.png')}
                        />
                      </View>
                      <View style={styles.BottomBorder} />
                    </CollapseHeader>

                    <CollapseBody>
                      <AccordionList
                        data={this.state.Road_Data}
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
                              onPress={() => this.setState({road: item.code})}
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100 / 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor:
                                  this.state.road === item.code
                                    ? '#F6D700'
                                    : '#f2f2f2',
                                // backgroundColor: this.state.index == item.index ? 'red' : 'green',
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
                  {/* ////////////////////////////////////// Apply Btn's ////////////////////////////////////*/}
                  <View style={styles.ApplyView}>
                    <TouchableOpacity
                      onPress={() => this._stepSearch2()}
                      style={styles.ApplyBtn}>
                      <Text style={{fontFamily: 'Lato-Regular'}}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this._stepSearch2(true)}
                      style={styles.ApplyBtn}>
                      <Text style={{fontFamily: 'Lato-Regular'}}>Next</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ProgressStep>
              {/* //////////////////////////////////////// Third ProcessStep Start Here //////////////////////// */}
              <ProgressStep
                label="Step 3"
                removeBtnRow={true}
                onNext={this.onNextStep}
                onPrevious={this.onPrevStep}
                scrollViewProps={this.defaultScrollViewProps}>
                <View style={{top: 20}}>
                  {/* ////////////////////////////////////////// KM to shoping center ///////////////////////////// */}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          KM to shoping center
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
                          <Text>{this.state.kmtoshoppingcenter} KM</Text>
                        </View>
                        <RangeSlider
                          rangeEnabled={false}
                          style={{width: '100%', height: 70}}
                          gravity={'center'}
                          min={0}
                          max={20}
                          step={1}
                          handleBorderWidth={0.5}
                          handleBorderColor="#F6D700"
                          selectionColor="#F6D700"
                          blankColor="#808080"
                          onValueChanged={(lowKM, highKM) => {
                            this.setState({kmtoshoppingcenter: lowKM});
                          }}
                        />
                      </View>
                    </CollapseBody>
                  </Collapse>
                  {/* ////////////////////////////////////////  KM to  neighbour ///////////////////////////////////////// */}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          KM to neighbour
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
                          <Text>-{this.state.kmtoneighbour} KM</Text>
                        </View>
                        <RangeSlider
                          rangeEnabled={false}
                          style={{width: '100%', height: 70}}
                          gravity={'center'}
                          min={0}
                          max={20}
                          step={1}
                          handleBorderWidth={0.5}
                          handleBorderColor="#F6D700"
                          selectionColor="#F6D700"
                          blankColor="#808080"
                          onValueChanged={(Min_Neb_KM, Max_Neb_KM) => {
                            this.setState({
                              kmtoneighbour: Min_Neb_KM,
                            });
                          }}
                        />
                      </View>
                    </CollapseBody>
                  </Collapse>
                  {/* ////////////////////////////////////////// KM to tarmac //////////////////////////////////////// */}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          {' '}
                          KM to tarmac
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
                          <Text>{this.state.kmtotarmac} KM</Text>
                        </View>
                        <RangeSlider
                          rangeEnabled={false}
                          style={{width: '100%', height: 70}}
                          gravity={'center'}
                          min={0}
                          max={20}
                          step={1}
                          handleBorderWidth={0.5}
                          handleBorderColor="#F6D700"
                          selectionColor="#F6D700"
                          blankColor="#808080"
                          onValueChanged={(Min_Tarmac_Dis, Max_Tarmac_Dis) => {
                            this.setState({
                              kmtotarmac: Min_Tarmac_Dis,
                            });
                          }}
                        />
                      </View>
                    </CollapseBody>
                  </Collapse>
                  {/* ////////////////////////////////////////// KM to water /////////////////////////////////////// */}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          {' '}
                          KM to water
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
                          <Text>{this.state.kmtowater} KM</Text>
                        </View>
                        <RangeSlider
                          style={{width: '100%', height: 70}}
                          gravity={'center'}
                          rangeEnabled={false}
                          min={0}
                          max={20}
                          step={1}
                          handleBorderWidth={0.5}
                          handleBorderColor="#F6D700"
                          selectionColor="#F6D700"
                          blankColor="#808080"
                          onValueChanged={(Min_Water_Dis, Max_Water_Dis) => {
                            this.setState({
                              kmtowater: Min_Water_Dis,
                            });
                          }}
                        />
                      </View>
                    </CollapseBody>
                  </Collapse>
                  {/* ///////////////////////////////////////////////// KM to electricity //////////////////////////////////// */}
                  <Collapse>
                    <CollapseHeader style={{height: 50}}>
                      <View style={styles.CallHeaderMainView}>
                        <Text style={{left: 10, fontFamily: 'Lato-Regular'}}>
                          {' '}
                          KM to electricity{' '}
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
                          <Text>{this.state.kmtoelectricity} KM</Text>
                        </View>
                        <RangeSlider
                          style={{width: '100%', height: 70}}
                          gravity={'center'}
                          min={0}
                          max={20}
                          step={1}
                          rangeEnabled={false}
                          handleBorderWidth={0.5}
                          handleBorderColor="#F6D700"
                          selectionColor="#F6D700"
                          blankColor="#808080"
                          onValueChanged={(Min_Elect_Dis, Max_Elect_Dis) => {
                            this.setState({
                              kmtoelectricity: Min_Elect_Dis,
                            });
                          }}
                        />
                      </View>
                    </CollapseBody>
                  </Collapse>

                  {/* Apply Btn's */}
                  <View style={styles.ApplyView}>
                    {/* <TouchableOpacity style={styles.ApplyBtn}>
                                            <Text style={{fontFamily: 'Lato-Regular'}}>Apply</Text>
                                        </TouchableOpacity> */}
                    <View></View>
                    <TouchableOpacity
                      onPress={() => this._stepSearch3()}
                      // onPress={this.GoNextStep}
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
          </View>
        </ScrollView>
      </View>
    );
  }
}

LookingLandSteps.contextType = UserContext;

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
    // marginTop: 20,
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
export default LookingLandSteps;
