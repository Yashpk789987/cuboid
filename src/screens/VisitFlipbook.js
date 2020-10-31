import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import Modal from 'react-native-modal';
// import Tabs from Commman folder

import Tabs from '../common/Tabs';

class VisitFlipbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      carouselItems: [
        'https://images.unsplash.com/photo-1540304651506-82165588b4ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
        'https://images.unsplash.com/photo-1541079033018-63489731598f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        'https://images.unsplash.com/photo-1541718366506-c16ed9459a7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjQzMzEwfQ&auto=format&fit=crop&w=1050&q=80',
        'https://images.unsplash.com/photo-1541616615104-405a4fffe382?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjQzMzEwfQ&auto=format&fit=crop&w=1050&q=80',
      ],
      FlipBookProperties: [
        {
          index: 0,
          name: '360 View',
          ImageIcons: require('../../assets/Icons/Iconawes.png'),
        },
        {
          index: 1,
          name: 'Virtual Tour',
          ImageIcons: require('../../assets/Icons/Iconmap.png'),
        },
        {
          index: 2,
          name: 'View Flor Plan',
          ImageIcons: require('../../assets/Icons/IconEye.png'),
        },
        {
          index: 3,
          name: 'Map View',
          ImageIcons: require('../../assets/Icons/Icon-awesome.png'),
        },
        {
          index: 4,
          name: 'Similar Properties',
          ImageIcons: require('../../assets/Icons/Group3482.png'),
        },
      ],
    };
  }

  toggleModal = (name) => {
    // alert(name)
    this.setState({isModalVisible: !this.state.isModalVisible, name});
  };
  _renderItem({item, index}) {
    return (
      <View
        style={{
          // position:'absolute',

          height: 300,
          width: '100%',
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}>
        <Image
          source={{uri: item}}
          style={{
            width: '100%',
            height: '100%',
            // borderBottomRightRadius: 50,
            // overflow: 'visible',
            // resizeMode: 'contain',
          }}
        />
      </View>
    );
  }

  get pagination() {
    const {carouselItems, activeIndex} = this.state;
    return (
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeIndex}
        // containerStyle={{marginTop: -60}}
        dotStyle={{
          width: 20,
          height: 20,
          borderRadius: 10,
          marginHorizontal: 8,
          borderWidth: 1,
          borderColor: '#fff',
          // backgroundColor:""
          backgroundColor: 'rgba(0,0,0,0)',
        }}
        inactiveDotStyle={{
          // backgroundColor:'red'
          backgroundColor: '#f2f2f2',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    // console.log(this.state.activeIndex)
    return (
      <View style={styles.container}>
        <ScrollView>
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

          {/* Carousel view */}
          <View style={{width: '100%', height: 280}}>
            <View style={{width: '100%', position: 'absolute', top: -35}}>
              <Carousel
                autoplay
                loop
                // autoplayDelay={1000}
                layout={'default'}
                ref={(ref) => (this.carousel = ref)}
                data={this.state.carouselItems}
                autoplayLoop={true}
                sliderWidth={440}
                itemWidth={440}
                renderItem={this._renderItem}
                onSnapToItem={(index) => this.setState({activeIndex: index})}
              />

              {this.pagination}
            </View>
          </View>

          <View style={{padding: 10}}>
            <View style={{height: 50}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                Properties in the Neighbouhood
              </Text>
              <Text style={{opacity: 0.5}}>Lore Epsum</Text>
            </View>
          </View>

          <View style={{paddingVertical: 10, flexDirection: 'row', height: 80}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('SubscriptionPage')
                }
                style={styles.VillaBtn}>
                <Image
                  style={styles.BtnIcons}
                  source={require('../../assets/Icons/Home.png')}
                />
                <Text style={{marginLeft: 10}}>5Bhk Villa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('SubscriptionPage')
                }
                style={styles.VillaBtn}>
                <Image
                  style={styles.BtnIcons}
                  source={require('../../assets/Icons/Group3.png')}
                />
                <Text style={{marginLeft: 10}}>$3000 </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('SubscriptionPage')
                }
                style={styles.VillaBtn}>
                <Image
                  style={styles.BtnIcons}
                  source={require('../../assets/Icons/Iconmateria.png')}
                />
                <Text style={{marginLeft: 10}}>2500 sq/ft</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View>
            <Tabs />
          </View>

          <View style={styles.bottomBtnView}>
            <FlatList
              data={this.state.FlipBookProperties}
              numColumns={5}
              renderItem={({item}) => (
                <View
                  style={{width: '18%', marginHorizontal: '1%', height: 70}}>
                  <TouchableOpacity
                    onPress={() => this.toggleModal(item.name)}
                    style={{
                      // padding: 10,
                      // marginHorizontal: '1%',
                      width: '100%',
                      height: 60,
                      alignItems: 'center',
                      borderRadius: 10,
                      justifyContent: 'center',
                      backgroundColor: '#F6D600',
                      shadowColor: '#FFD700',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,

                      elevation: 5,
                    }}>
                    <Image
                      style={styles.Icons}
                      //  source={item.imageurl}
                      source={item.ImageIcons}
                    />
                    <Text style={{fontSize: 8}}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View style={{paddingHorizontal: 20, top: 10}}>
            <View style={styles.CheckBtnView}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('SubscriptionPage')
                }
                style={styles.checkBtn}>
                <Text>Check Availability</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('SubscriptionPage')
                }
                style={styles.checkBtn}>
                <Text>Contact seller</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{height: 80, alignItems: 'center', marginTop: 30}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ThanksPage')}
              style={styles.NextPageBtn}>
              <Image
                style={{width: 30, height: 30, resizeMode: 'contain'}}
                source={require('../../assets/Icons/Rightarrow.png')}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Modals */}
        <Modal
          style={{margin: 0}}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          animationInTiming={400}
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
                height: '80%',
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
                <Text>{this.state.name}</Text>
                <TouchableOpacity onPress={() => this.toggleModal()}>
                  <Text>Close</Text>
                </TouchableOpacity>
                {/* <Button title="close" onPress={() => this.toggleModal()} /> */}
              </View>
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: '#cccccc',
                }}></View>
            </View>
          </View>
        </Modal>
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
    height: 80,
    padding: 20,
    backgroundColor: '#000',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    zIndex: 100,
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
    fontWeight: 'bold',
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
  CheckBtnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 10
  },
  checkBtn: {
    width: 150,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
  VillaBtn: {
    width: 130,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    shadowColor: '#FFD700',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    backgroundColor: '#FFD700',
  },
  BtnIcons: {
    width: 20,
    height: 20,
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
  bottomBtnView: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginTop: 40,
    // padding: 10,
    // top: 10,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  BottomBtns: {
    padding: 10,
    // marginLeft: 9,
    width: '17%',
    height: 60,

    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#F6D600',
    shadowColor: '#FFD700',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  Icons: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default VisitFlipbook;
