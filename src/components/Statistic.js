import React, { useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions, ScrollView,
} from "react-native";
import {Container, Content,} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import StarRating from "react-native-star-rating";
import {BarChart} from "react-native-chart-kit";
import {useDispatch, useSelector} from "react-redux";
import {getStatistics ,logout, tempAuth} from '../actions';

function Statistic({navigation}) {
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const user  = useSelector(state => state.auth.user ? state.auth.user.data : { avatar: ''});

    const statistics = useSelector(state => state.statistics.statistics);
    const statisticsLoader = useSelector(state => state.statistics.loader);

    const dispatch = useDispatch();

    function fetchData(){
        dispatch(getStatistics(lang , token));
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , statisticsLoader]);

    function logoutFunc(){
        dispatch(logout(lang , token));
        dispatch(tempAuth(token));
    }

    const screenWidth = Dimensions.get("window").width;

    // const data = {
    //     labels: ["M1", "M1" , "M3" , "M4" , "M5" , "M6"],
    //     // legend: ["L1", "L2", "L3", "L4"],
    //     data: [[10, 30, 70, 100], [20, 40, 50, 40] ,[30, 30, 70, 100], [40, 30, 70, 100], [20, 40, 50, 40] ,[20, 40, 50, 40]],
    //     barColors: ["#00858A", "#19BBC1", "#85DDE1" , "#BFFDFF"]
    // };
    //
    //


    const data = {
        labels: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
        datasets: [
            {
                data: statistics.monthly_sales ? statistics.monthly_sales : []
            }
        ]
    };

    const chartConfig = {
        backgroundColor: "#fff",
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        barPercentage: 0.41,
        color: (opacity = 1) => '#00858A',
        labelColor: (opacity = 1) => COLORS.gray,
    };

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth]}>
                <View style={[styles.position_R , styles.bgFullWidth, styles.Width_100]}>
                    <View style={[styles.Width_100 , styles.topNav , {borderBottomWidth:2 , borderLeftWidth:2 , borderColor:'#f0f0f0'}]}>
                        <ScrollView style={{}} contentContainerStyle={[styles.directionRowSpace , styles.Width_100 , styles.paddingHorizontal_15 , {
                            paddingTop:15
                        }]} horizontal={true} showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity onPress={() =>
                                navigation.navigate('home', {
                                    screen: 'home',
                                    // params: { user: 'jane' },
                                })
                            }>
                                <Image source={require('../../assets/images/menu_home.png')} style={[styles.iconImg]} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('profile')} style={[styles.iconImg , {borderRadius:50 , overflow:'hidden', borderColor:COLORS.gray, borderWidth:2}]}>
                                <Image source={{uri:user.avatar}} style={[styles.Width_100 , styles.heightFull]} resizeMode={'cover'} />
                            </TouchableOpacity>
                            <View>
                                <Image source={require('../../assets/images/blue_statistic.png')} style={[styles.iconImg]} resizeMode={'contain'} />
                            </View>
                            <TouchableOpacity onPress={() => navigation.push('about')}>
                                <Image source={require('../../assets/images/menu_about.png')} style={[styles.iconImg]} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.push('settings')}>
                                <Image source={require('../../assets/images/setting.png')} style={[styles.iconImg]} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => logoutFunc()} style={[styles.transformReverse]}>
                                <Image source={require('../../assets/images/menu_logout.png')} style={[styles.iconImg]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    <View style={[styles.Width_100 , styles.paddingHorizontal_20 , styles.marginTop_25]}>
                        <Text style={[styles.textBold , styles.text_black , styles.textSize_18 , styles.marginBottom_15 , styles.alignStart]}>{ i18n.t('statistics')}</Text>

                        <Text style={[styles.textBold , styles.text_black , styles.textSize_15 , styles.marginBottom_5 , styles.alignStart]}>{ i18n.t('servAmount')}</Text>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15 , styles.marginBottom_10 , styles.alignStart]}>{statistics.total_sales} { i18n.t('RS')}</Text>

                        <Text style={[styles.textBold , styles.text_black , styles.textSize_15 , styles.marginBottom_5 , styles.alignStart]}>{ i18n.t('rate')}</Text>
                        <View style={[ styles.directionRow, styles.marginBottom_10]}>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={statistics.rate}
                                fullStarColor={COLORS.orange}
                                starSize={14}
                                starStyle={{marginHorizontal:2}}
                            />
                            <Text style={[styles.textRegular , styles.text_orange , styles.textSize_14 , styles.marginHorizontal_5 ]}>
                                {statistics.rate}</Text>
                        </View>

                        <Text style={[styles.textBold , styles.text_black , styles.textSize_15 , styles.marginBottom_15 , styles.alignStart]}>{ i18n.t('profitRate')}</Text>

                        {/*<View style={[styles.directionRow, styles.marginBottom_5]}>*/}
                            {/*<View style={[styles.box , {backgroundColor:'#00858A'}]} />*/}
                            {/*<Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , styles.marginHorizontal_5]}>{ i18n.t('exProfitRate')}</Text>*/}
                        {/*</View>*/}
                        {/*<View style={[styles.directionRow, styles.marginBottom_5]}>*/}
                            {/*<View style={[styles.box , {backgroundColor:'#19BBC1'}]} />*/}
                            {/*<Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , styles.marginHorizontal_5]}>{ i18n.t('avProfitRate')}</Text>*/}
                        {/*</View>*/}
                        {/*<View style={[styles.directionRow, styles.marginBottom_5]}>*/}
                            {/*<View style={[styles.box , {backgroundColor:'#85DDE1'}]} />*/}
                            {/*<Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , styles.marginHorizontal_5]}>{ i18n.t('smProfitRate')}</Text>*/}
                        {/*</View>*/}
                        {/*<View style={[styles.directionRow, styles.marginBottom_5]}>*/}
                            {/*<View style={[styles.box , {backgroundColor:'#BFFDFF'}]} />*/}
                            {/*<Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , styles.marginHorizontal_5]}>{ i18n.t('zeProfitRate')}</Text>*/}
                        {/*</View>*/}


                        {/*<StackedBarChart*/}
                            {/*style={[styles.marginTop_25]}*/}
                            {/*data={data}*/}
                            {/*width={screenWidth-40}*/}
                            {/*height={220}*/}
                            {/*chartConfig={chartConfig}*/}
                            {/*showLegend={false}*/}
                            {/*segments={4}*/}
                        {/*/>*/}

                        <BarChart
                            style={[styles.marginTop_25]}
                            data={data}
                            width={screenWidth-35}
                            height={250}
                            // yAxisLabel="RS "
                            chartConfig={chartConfig}
                            verticalLabelRotation={30}
                            fromZero={true}
                        />

                    </View>

                </View>
            </Content>
        </Container>
    );
}

export default Statistic;
