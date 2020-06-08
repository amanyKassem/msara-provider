import React from "react";
import {
    View,
    Image,
    TouchableOpacity
} from "react-native";
import {Container, Content} from 'native-base'
import styles from '../../assets/styles'
import { WebView } from 'react-native-webview';
import domain from "../consts/domain";


function EditService({navigation , route}) {

    const id = route.params.id;

    function _onLoad(state, navigation) {
        console.log(state.url);
        if(state.url === domain + 'provider/services'){
            navigation.navigate('details', {service_id:id})
        }
    }

    return (
        <Container>

            <Content contentContainerStyle={{ flexGrow: 1 }} style={{padding:15}}>
                <View style={[styles.directionRowSpace , styles.marginTop_25]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.marginBottom_25, styles.transform , styles.alignStart]}>
                        <Image source={require('../../assets/images/back.png')} style={[styles.smImage]} resizeMode={'contain'} />
                    </TouchableOpacity>
                </View>
                <WebView
                    source = {{uri: 'http://masarah.aait-sa.com/provider/services/'+id+'/edit' }}
                    style  = {{flex:1 , width:'100%' , height:'100%'}}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    scalesPageToFit={false}
                    scrollEnabled={true}
                    javaScriptEnabled={true}
                    onNavigationStateChange={(state) => _onLoad(state, navigation)}
                />
            </Content>

        </Container>
    );
}

export default EditService;


