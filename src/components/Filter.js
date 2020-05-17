import React, { useState , useEffect } from "react";
import {View, Text, Image, TouchableOpacity, Slider,} from "react-native";
import {Container, Content, Form,} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import StarRating from "react-native-star-rating";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import  Modal  from "react-native-modal";

function Filter({navigation}) {


    const [value, setValue] = useState(null);
    const [minValue, setMinValue] = useState(null);
    const [maxValue, setMaxValue] = useState(null);

    const [cityName, setCityName] = useState('');
    const [cityID, setCityId] = useState(null);
    const [city, setCity] = useState('');
    const [showModalCity, setShowModalCity] = useState(false);

    const [capacityName, setCapacityName] = useState('');
    const [capacityID, setCapacityId] = useState(null);
    const [capacity, setCapacity] = useState('');
    const [showModalCapacity, setShowModalCapacity] = useState(false);

    const [isDatePickerVisible , setIsDatePickerVisible ] = useState(false);
    const [date , setDate ] = useState('');
    const [offer, setOffer] = useState(false);

    function toggleModalCity () {
        setShowModalCity(!showModalCity);
    }

    function selectCity (name , id) {
        setCityName(name)
        setCityId(id)
    }

    function confirmCity () {
        setShowModalCity(!showModalCity);
        setCity(cityName)
    }


    function toggleModalCapacity () {
        setShowModalCapacity(!showModalCapacity);
    }

    function selectCapacity (name , id) {
        setCapacityName(name)
        setCapacityId(id)
    }

    function confirmCapacity () {
        setShowModalCapacity(!showModalCapacity);
        setCapacity(capacityName)
    }

    useEffect(() => {

    }, []);

    function changeMaxValue(value){
        alert(value)
        setValue(value)
    }

    function changeMinValue(value){
        alert(value)
        setMinValue(value)
    }

    function change(value){
        // alert(value)
        setMaxValue(value)
    }

    const showDatePicker = () => {
        setIsDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setIsDatePickerVisible(false);
    };

    const handleConfirm = myDate => {
        // console.warn("A date has been picked: ", myDate);
        let formatted_date = myDate.getFullYear() + "-" + ("0"+(myDate.getMonth() + 1)).slice(-2) + "-" + ("0" +myDate.getDate()).slice(-2);
        hideDatePicker();
        setDate(formatted_date);
    };

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth ]}>

                <View style={[styles.position_R , styles.bgFullWidth,
                    styles.marginVertical_25 , styles.marginTop_55, styles.Width_100]}>

                    <View style={[styles.Width_100 , styles.directionRowCenter , styles.paddingHorizontal_30 , styles.marginBottom_25
                    , {borderBottomWidth:1 , borderBottomColor:'#ddd' , paddingBottom:15}]}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={[{position:'absolute' , right:30 , top:0}]}>
                            <Image source={require('../../assets/images/close-icon.png')} style={[styles.smImage]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[styles.textBold , styles.text_blue , styles.textSize_18 ]}>{ i18n.t('filters') }</Text>
                    </View>

                    <View style={[styles.Width_100, styles.paddingHorizontal_25]}>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_16 , styles.marginBottom_5]}>{ i18n.t('offers') }</Text>
                        <TouchableOpacity onPress={() => setOffer(!offer)} style={[styles.marginBottom_15]}>
                            <Image source={offer ? require('../../assets/images/offer_color.png') : require('../../assets/images/gray_offers.png')} style={[styles.iconImg]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_16 , styles.marginBottom_5]}>{ i18n.t('rate') }</Text>
                        <View style={[styles.marginBottom_15]}>
                            <Image source={require('../../assets/images/rating_active.png')} style={[styles.iconImg]} resizeMode={'contain'} />
                        </View>

                        <View style={[styles.Width_100 ,styles.marginBottom_15]}>
                            <View style={[styles.directionRow , {alignSelf:'flex-end'}]}>
                                <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    rating={value}
                                    fullStarColor={COLORS.blue}
                                    starSize={14}
                                    starStyle={{marginHorizontal:2}}
                                />
                            </View>
                            <Slider
                                step={1}
                                maximumValue={5}
                                onValueChange={(value) => change(value)}
                                // value={value}
                                thumbTintColor={COLORS.blue}
                                style={[styles.slider , styles.transformReverse , styles.Width_100]}
                                maximumTrackTintColor={COLORS.gray}
                                minimumTrackTintColor={COLORS.blue}
                            />
                        </View>

                        <View style={[styles.Width_100 , styles.directionRowSpace]}>

                            <TouchableOpacity onPress={toggleModalCity} style={[styles.flexCenter]}>
                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_16]}>{ i18n.t('city') }</Text>
                                <Image source={require('../../assets/images/city_acttive.png')} style={[styles.iconImg , styles.marginVertical_10]} resizeMode={'contain'} />
                                <View style={[styles.marginBottom_15 , styles.paddingHorizontal_10 , styles.paddingVertical_5 , styles.Radius_5 , {backgroundColor:city !== ''?'#EBEDF0':'transparent'}]}>
                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_16]}>{city}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={showDatePicker} style={[styles.flexCenter]}>
                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_16]}>{ i18n.t('date') }</Text>
                                <Image source={require('../../assets/images/calender_active.png')} style={[styles.iconImg , styles.marginVertical_10]} resizeMode={'contain'} />
                                <View style={[styles.marginBottom_15 , styles.paddingHorizontal_10 , styles.paddingVertical_5 , styles.Radius_5 , {backgroundColor:date !== ''?'#EBEDF0':'transparent'}]}>
                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_16]}>{date}</Text>
                                </View>
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={toggleModalCapacity} style={[styles.flexCenter]}>
                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_16 ]}>{ i18n.t('capacity') }</Text>
                                <Image source={require('../../assets/images/capacity_active.png')} style={[styles.iconImg , styles.marginVertical_10]} resizeMode={'contain'} />
                                <View style={[styles.marginBottom_15 , styles.paddingHorizontal_10 , styles.paddingVertical_5 , styles.Radius_5 , {backgroundColor:capacity !== ''?'#EBEDF0':'transparent'}]}>
                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_16]}>{capacity}</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_16 , styles.marginBottom_5]}>{ i18n.t('price') }</Text>
                        <View style={[styles.marginBottom_15]}>
                            <Image source={require('../../assets/images/pricing_active.png')} style={[styles.iconImg]} resizeMode={'contain'} />
                        </View>

                        <View style={[styles.Width_100 ,styles.marginBottom_15 , styles.directionRowCenter]}>
                            <Slider
                                step={500}
                                maximumValue={6000}
                                minimumValue={3000}
                                onValueChange={(maxValue) => changeMaxValue(maxValue)}
                                // value={maxValue}
                                thumbTintColor={'#E873B1'}
                                style={[styles.slider , styles.transform , styles.Width_60 ,{right:-6}]}
                                maximumTrackTintColor={COLORS.gray}
                                minimumTrackTintColor={'#E873B1'}
                            />
                            <View style={[styles.bg_pink ,{height:2 , width:22 , position:"absolute" , zIndex:-1 }]}/>
                            <Slider
                                step={500}
                                maximumValue={3000}
                                minimumValue={0}
                                onValueChange={(minValue) => changeMinValue(minValue)}
                                // value={mimValue}
                                thumbTintColor={'#E873B1'}
                                style={[styles.slider , styles.transformReverse , styles.Width_60,{right:6}]}
                                maximumTrackTintColor={COLORS.gray}
                                minimumTrackTintColor={'#E873B1'}
                            />
                        </View>

                        <TouchableOpacity style={[styles.blueBtn , styles.Width_100 , styles.marginBottom_15]}>
                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('search') }</Text>
                        </TouchableOpacity>

                    </View>
                    <Modal
                        onBackdropPress                 ={toggleModalCity}
                        onBackButtonPress               = {toggleModalCity}
                        isVisible                       = {showModalCity}
                        style                           = {styles.bgModel}
                        avoidKeyboard                    = {true}
                    >

                        <View style={[{borderTopLeftRadius:30,
                            borderTopRightRadius:30},styles.bg_White, styles.overHidden, styles.Width_100, styles.paddingVertical_10 , styles.paddingHorizontal_10]}>
                            <View style={[styles.overHidden, styles.Width_100 , styles.paddingHorizontal_25]}>

                                <View style={[styles.modalBorder]}/>

                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_16]}>{ i18n.t('city') }</Text>
                                <Image source={require('../../assets/images/city_acttive.png')} style={[styles.iconImg , styles.marginVertical_10]} resizeMode={'contain'} />

                                <View style={[styles.rowRight]}>
                                    <TouchableOpacity onPress={() => selectCity('القاهره', 0)} style={[{marginRight:15} , styles.marginBottom_15 , styles.paddingHorizontal_10 , styles.paddingVertical_5 , styles.Radius_5 , {backgroundColor:cityID === 0 ?COLORS.blue:'#EBEDF0'}]}>
                                        <Text style={[styles.textRegular ,cityID === 0 ? styles.text_White : styles.text_gray , styles.textSize_16]}>القاهره</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => selectCity('اسكندرية', 1)} style={[{marginRight:15} , styles.marginBottom_15 , styles.paddingHorizontal_10 , styles.paddingVertical_5 , styles.Radius_5 , {backgroundColor:cityID === 1 ?COLORS.blue:'#EBEDF0'}]}>
                                        <Text style={[styles.textRegular ,cityID === 1 ? styles.text_White : styles.text_gray , styles.textSize_16]}>اسكندرية</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => selectCity('المنصوره', 2)} style={[{marginRight:15} , styles.marginBottom_15 , styles.paddingHorizontal_10 , styles.paddingVertical_5 , styles.Radius_5 , {backgroundColor:cityID === 2 ?COLORS.blue:'#EBEDF0'}]}>
                                        <Text style={[styles.textRegular ,cityID === 2 ? styles.text_White : styles.text_gray , styles.textSize_16]}>المنصوره</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => selectCity('شرم الشيخ', 3)} style={[{marginRight:15} , styles.marginBottom_15 , styles.paddingHorizontal_10 , styles.paddingVertical_5 , styles.Radius_5 , {backgroundColor:cityID === 3 ?COLORS.blue:'#EBEDF0'}]}>
                                        <Text style={[styles.textRegular ,cityID === 3 ? styles.text_White : styles.text_gray , styles.textSize_16]}>شرم الشيخ</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => selectCity('الغردقة', 4)} style={[{marginRight:15} , styles.marginBottom_15 , styles.paddingHorizontal_10 , styles.paddingVertical_5 , styles.Radius_5 , {backgroundColor:cityID === 4 ?COLORS.blue:'#EBEDF0'}]}>
                                        <Text style={[styles.textRegular ,cityID === 4 ? styles.text_White : styles.text_gray , styles.textSize_16]}>الغردقة</Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity onPress={() => confirmCity()} style={[styles.blueBtn , styles.Width_100 , styles.marginBottom_35]}>
                                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('confirm') }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </Modal>


                    <Modal
                        onBackdropPress                 ={toggleModalCapacity}
                        onBackButtonPress               = {toggleModalCapacity}
                        isVisible                       = {showModalCapacity}
                        style                           = {styles.bgModel}
                        avoidKeyboard                    = {true}
                    >

                        <View style={[{borderTopLeftRadius:30,
                            borderTopRightRadius:30},styles.bg_White, styles.overHidden, styles.Width_100, styles.paddingVertical_10 , styles.paddingHorizontal_10]}>
                            <View style={[styles.overHidden, styles.Width_100 , styles.paddingHorizontal_25]}>

                                <View style={[styles.modalBorder]}/>

                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_16]}>{ i18n.t('capacity') }</Text>
                                <Image source={require('../../assets/images/capacity_active.png')} style={[styles.iconImg , styles.marginVertical_10]} resizeMode={'contain'} />

                                <View style={[styles.rowRight]}>
                                    <TouchableOpacity onPress={() => selectCapacity('100', 0)} style={[{marginRight:15} , styles.marginBottom_15 , styles.paddingHorizontal_10 , styles.paddingVertical_5 , styles.Radius_5 , {backgroundColor:capacityID === 0 ?COLORS.blue:'#EBEDF0'}]}>
                                        <Text style={[styles.textRegular ,capacityID === 0 ? styles.text_White : styles.text_gray , styles.textSize_16]}>100</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => selectCapacity('200', 1)} style={[{marginRight:15} , styles.marginBottom_15 , styles.paddingHorizontal_10 , styles.paddingVertical_5 , styles.Radius_5 , {backgroundColor:capacityID === 1 ?COLORS.blue:'#EBEDF0'}]}>
                                        <Text style={[styles.textRegular ,capacityID === 1 ? styles.text_White : styles.text_gray , styles.textSize_16]}>200</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => selectCapacity('300', 2)} style={[{marginRight:15} , styles.marginBottom_15 , styles.paddingHorizontal_10 , styles.paddingVertical_5 , styles.Radius_5 , {backgroundColor:capacityID === 2 ?COLORS.blue:'#EBEDF0'}]}>
                                        <Text style={[styles.textRegular ,capacityID === 2 ? styles.text_White : styles.text_gray , styles.textSize_16]}>300</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => selectCapacity('400', 3)} style={[{marginRight:15} , styles.marginBottom_15 , styles.paddingHorizontal_10 , styles.paddingVertical_5 , styles.Radius_5 , {backgroundColor:capacityID === 3 ?COLORS.blue:'#EBEDF0'}]}>
                                        <Text style={[styles.textRegular ,capacityID === 3 ? styles.text_White : styles.text_gray , styles.textSize_16]}>400</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => selectCapacity('500', 4)} style={[{marginRight:15} , styles.marginBottom_15 , styles.paddingHorizontal_10 , styles.paddingVertical_5 , styles.Radius_5 , {backgroundColor:capacityID === 4 ?COLORS.blue:'#EBEDF0'}]}>
                                        <Text style={[styles.textRegular ,capacityID === 4 ? styles.text_White : styles.text_gray , styles.textSize_16]}>500</Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity onPress={() => confirmCapacity()} style={[styles.blueBtn , styles.Width_100 , styles.marginBottom_35]}>
                                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('confirm') }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </Modal>
                </View>
            </Content>
        </Container>
    );
}

export default Filter;


