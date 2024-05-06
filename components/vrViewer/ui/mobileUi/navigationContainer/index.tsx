import { Animated, Dimensions, TouchableHighlight, View } from "react-native";
import Maps from "../../common/maps";
import Views from "../../common/views";
import Floors from "../../common/floors";
import { useContext, useState } from "react";
import { VrViewerContext } from "../../..";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MobileUiContext } from "..";

const NavigationContainer = () => {
    const {lightBlueColor, setEnableDeviceMotion, enableDeviceMotion} = useContext(VrViewerContext)
    const {navigationContainerRef, containerTranslateY, navigationLogoSize}= useContext(MobileUiContext)
    const {width:originalWidth} = Dimensions.get('window')
    return (  
        <Animated.View
            ref={navigationContainerRef}
            style={{
                width:`100%`,
                backgroundColor:lightBlueColor,
                zIndex:1,
                position:`absolute`,
                bottom:0,
                transform:[{translateY:containerTranslateY}]
            }}
        >
            <Maps
                originalWidth={originalWidth}
            />
            <Views/>
            <View
                style={{
                    display:`flex`,
                    flexDirection:`row`,
                    justifyContent:`space-between`
                }}
            >
                <View
                    style={{
                        width:navigationLogoSize,
                        height:navigationLogoSize,
                        justifyContent:`center`,
                        alignItems:`center`
                    }}
                >
                    <TouchableHighlight
                        onPress={()=>{
                            setEnableDeviceMotion(prev=>{return !prev})
                        }}
                    >
                        <MaterialCommunityIcons 
                            style={{
                                backgroundColor:`black`,
                                padding:4,
                                borderRadius:4,
                                opacity:enableDeviceMotion? 1 : 0.5
                            }}
                            name="rotate-orbit" 
                            size={navigationLogoSize/2} 
                            color="white" 
                        />
                    </TouchableHighlight>
                </View>
                <Floors/>
                <View
                    style={{
                        width:navigationLogoSize,
                        height:navigationLogoSize,
                    }}
                />
            </View>
            
        </Animated.View>
    );
}
 
export default NavigationContainer;