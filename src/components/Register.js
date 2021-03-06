import React, { useState , useEffect } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, KeyboardAvoidingView, I18nManager, ActivityIndicator} from "react-native";
import {Container, Content, Form, Input, Item, Label, Toast } from 'native-base'
import  Modal  from "react-native-modal";
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import {useSelector, useDispatch} from 'react-redux';
import {register, getCategories} from '../actions';

function Register({navigation}) {

	const lang          = useSelector(state => state.lang.lang);
	const dispatch      = useDispatch();
	const categories    = useSelector(state => state.categories.categories);

    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [usernameStatus, setUsernameStatus] = useState(0);
    const [phoneStatus, setPhoneStatus] = useState(0);
    const [emailStatus, setEmailStatus] = useState(0);
    const [passwordStatus, setPasswordStatus] = useState(0);
    const [confirmPassStatus, setConfirmPassStatus] = useState(0);

    const [spinner, setSpinner] = useState(false);

    const [serviceType, setServiceType] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [serviceID, setServiceId] = useState(null);
    const [showModalService, setShowModalService] = useState(false);


    function toggleModalService () {
        setShowModalService(!showModalService);
    }

    function selectService (name , id) {
        setServiceName(name)
        setServiceId(id)
    }

    function confirmService () {
        setShowModalService(!showModalService);
        setServiceType(serviceName)
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(getCategories(lang, true));
            setSpinner(false)
        });
        dispatch(getCategories(lang, true));
        setSpinner(false)
        return unsubscribe;
    }, [navigation , spinner]);

	function activeInput(type) {
		if (type === 'username' || username !== '') setUsernameStatus(1);
		if (type === 'phone' || phone !== '')  setPhoneStatus(1);
		if (type === 'email' || email !== '') setEmailStatus(1);
		if (type === 'password' || password !== '') setPasswordStatus(1);
		if (type === 'confirmPass' || confirmPass !== '') setConfirmPassStatus(1)
	}

	function unActiveInput(type) {
		if (type === 'username' && username === '')  setUsernameStatus(0);
		if (type === 'phone' && phone === '') setPhoneStatus(0);
		if (type === 'email' && email === '') setEmailStatus(0);
		if (type === 'password' && password === '') setPasswordStatus(0);
		if (type === 'confirmPass' && confirmPass === '') setConfirmPassStatus(0);
	}

	const validate = () => {
		let isError         = false;
		let msg             = '';

		if (username.length <= 0) {
			isError     = true;
			msg         = i18n.t('name');
		} else if (serviceName.length <= 0) {
			isError     = true;
			msg         = i18n.t('categoryRequired');
		} else if (phone.length <= 0 || phone.length !== 10) {
			isError     = true;
			msg         = i18n.t('phoneValidation');
		} else if (phone.length !== 10) {
			isError     = true;
			msg         = i18n.t('namereq');
		} else if (email.length <= 0 || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
			isError     = true;
			msg         = i18n.t('emailNotCorrect');
		} else if (password.length < 6){
			isError     = true;
			msg         = i18n.t('passreq');
		} else if (password !== confirmPass){
			isError     = true;
			msg         = i18n.translate('notmatch');
		}

		if (msg !== '') {
			Toast.show({
				text        : msg,
				type        : "danger",
				duration    : 3000,
				textStyle   	: {
					color       	: "white",
					fontFamily  	: 'sukar',
					textAlign   	: 'center'
				}
			});
		}

		return isError;
	};

	function onRegister(){
		const err = validate();

		if (!err){
			setSpinner(true);
			const data = { username, phone, email, password, lang, serviceID };
			dispatch(register(data, navigation));
		}

	}

	function renderLoader(){
		if (spinner){
			return(
				<View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
					<ActivityIndicator size="large" color={COLORS.blue} style={{ alignSelf: 'center' }} />
				</View>
			);
		}
	}


    return (
        <Container>
            { renderLoader() }
            <ImageBackground source={  I18nManager.isRTL ? require('../../assets/images/bg_languge.png') :  require('../../assets/images/bg_inverse.png')} style={[styles.bgFullWidth]}>
                <Content contentContainerStyle={[styles.bgFullWidth , styles.paddingTop_50]}>

                    <View style={[styles.position_R , styles.bgFullWidth, styles.marginVertical_15,
                        styles.marginVertical_25, styles.Width_100, styles.flexCenter]}>

                        <View style={[styles.Width_100 , styles.paddingHorizontal_30 , styles.marginBottom_50]}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.marginBottom_25 , styles.transform , styles.alignStart]}>
                                <Image source={require('../../assets/images/back.png')} style={[styles.smImage]} resizeMode={'contain'} />
                            </TouchableOpacity>

                            <Text style={[styles.textBold , styles.text_black , styles.textSize_18 , styles.marginBottom_5, styles.alignStart]}>{ i18n.t('register') }</Text>
                            {/*<Text style={[styles.textRegular , styles.text_gray , styles.textSize_13]}>{ i18n.t('loginText') }</Text>*/}
                        </View>

                        <KeyboardAvoidingView behavior={'absolute'} style={[styles.keyboardAvoid]}>
                            <Form style={[ styles.flexCenter, styles.marginVertical_10, styles.Width_90]}>
                                <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_5 ]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R, { right: 5 }]}>
                                        <Label style={[styles.label, styles.textRegular ,{ color:usernameStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('username') }</Label>
                                        <Input style={[styles.input, styles.height_50, (usernameStatus === 1 ? styles.Active : styles.noActive)]}
                                               onChangeText={(username) => setUsername(username)}
                                               onBlur={() => unActiveInput('username')}
                                               onFocus={() => activeInput('username')}
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_5 ]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R, { right: 5 }]}>
                                        <Label style={[styles.label, styles.textRegular ,{ color:phoneStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('phone') }</Label>
                                        <Input style={[styles.input, styles.height_50, (phoneStatus === 1 ? styles.Active : styles.noActive)]}
                                               onChangeText={(phone) => setPhone(phone)}
                                               onBlur={() => unActiveInput('phone')}
                                               onFocus={() => activeInput('phone')}
                                               keyboardType={'number-pad'}
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.position_R, styles.height_70, styles.flexCenter, styles.marginBottom_5]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R, { right: 5 }]}>
                                        <Label style={[styles.label, styles.textRegular ,{ color:emailStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('email') }</Label>
                                        <Input style={[styles.input, styles.height_50, (emailStatus === 1 ? styles.Active : styles.noActive)]}
                                               onChangeText={(email) => setEmail(email)}
                                               onBlur={() => unActiveInput('email')}
                                               onFocus={() => activeInput('email')}
                                               keyboardType={'email-address'}
                                        />
                                    </Item>
                                </View>

                                <TouchableOpacity onPress={toggleModalService} style={[styles.Width_95, styles.marginBottom_25 , {left:2}]}>
                                    <Text style={[styles.labelText, styles.textRegular
                                        ,{ color:serviceType !== '' ?  COLORS.blue :  COLORS.gray , top : serviceType !== '' ? -10 : 15}]}>{ i18n.t('serviceType') }</Text>
                                    <View style={[styles.directionRowSpace , styles.input, styles.height_50, styles.Width_100 , (serviceType !== '' ? styles.Active : styles.noActive)]}>
                                        <Text style={[styles.textRegular , styles.text_black]}>
                                            {serviceType}
                                        </Text>
                                        <Image source={require('../../assets/images/balck_dropdown.png')}
                                               style={[styles.icon15]}
                                               resizeMode={'contain'} />
                                    </View>
                                </TouchableOpacity>

                                <View style={[styles.position_R,  styles.height_70, styles.flexCenter, styles.marginBottom_5]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R, { right: 5 }]}>
                                        <Label style={[styles.label ,{ color:passwordStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('password') }</Label>
                                        <Input
                                            style={[styles.input, styles.height_50, (passwordStatus === 1 ? styles.Active : styles.noActive)]}
                                            onChangeText={(password) => setPassword(password)}
                                            onBlur={() => unActiveInput('password')}
                                            onFocus={() => activeInput('password')}
                                            secureTextEntry
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.position_R,  styles.height_70, styles.flexCenter, styles.marginBottom_5]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R, { right: 5 }]}>
                                        <Label style={[styles.label ,{ color:confirmPassStatus === 1 ?  COLORS.blue :  COLORS.gray}]}>{ i18n.t('confirmPass') }</Label>
                                        <Input
                                            style={[styles.input, styles.height_50, (confirmPassStatus === 1 ? styles.Active : styles.noActive)]}
                                            onChangeText={(confirmPass) => setConfirmPass(confirmPass)}
                                            onBlur={() => unActiveInput('confirmPass')}
                                            onFocus={() => activeInput('confirmPass')}
                                            secureTextEntry
                                        />
                                    </Item>
                                </View>

                                <View>
                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13]}>{ i18n.t('agreeTo') }</Text>
                                </View>

                                <TouchableOpacity onPress={() => onRegister()} style={[styles.blueBtn , styles.Width_95]}>
                                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('register') }</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => navigation.push('login')} style={[styles.rowCenter , styles.marginVertical_25]}>
                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13]}>{ i18n.t('haveAcc') } </Text>
                                    <Text style={[styles.textRegular , styles.text_blue , styles.textSize_13]}>{ i18n.t('loginNow') }</Text>
                                </TouchableOpacity>

                            </Form>
                        </KeyboardAvoidingView>
                    </View>

                    <Modal
                        onBackdropPress                 ={toggleModalService}
                        onBackButtonPress               = {toggleModalService}
                        isVisible                       = {showModalService}
                        style                           = {styles.bgModel}
                        avoidKeyboard                    = {true}
                    >

                        <View style={[{borderTopLeftRadius:30,
                            borderTopRightRadius:30},styles.bg_White, styles.overHidden, styles.Width_100, styles.paddingVertical_10 , styles.paddingHorizontal_10]}>
                            <View style={[styles.overHidden, styles.Width_100 , styles.paddingHorizontal_25]}>

                                <View style={[styles.modalBorder]}/>

                                <View style={[styles.rowRight]}>
                                    {
                                        categories.map((category, i) => (
											<TouchableOpacity key={i} onPress={() => selectService(category.name, category.id)} style={[{marginRight:15} , styles.marginBottom_15 , styles.paddingHorizontal_10 , styles.paddingVertical_5 , styles.Radius_5 , {backgroundColor:serviceID == category.id ?COLORS.orange:'#EBEDF0'}]}>
												<Text style={[styles.textRegular ,serviceID == category.id ? styles.text_White : styles.text_gray , styles.textSize_16]}>{ category.name }</Text>
											</TouchableOpacity>
                                        ))
                                    }
                                </View>

                                <TouchableOpacity onPress={() => confirmService()} style={[styles.blueBtn , styles.Width_100 , styles.marginBottom_35]}>
                                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('choose') }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </Modal>

                </Content>
            </ImageBackground>
        </Container>
    );
}

export default Register;


