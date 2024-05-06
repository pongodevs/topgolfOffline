import { Animated, Easing, StatusBar, TouchableHighlight, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from "react";
import { MobileUiContext } from "..";
import { VrViewerContext } from "../../..";
import { THREE } from "expo-three";

const NavigationLogo = () => {
    const {camera} = useContext(VrViewerContext)
    const {navigationContainerRef, containerTranslateY, logoRef, logoTranslateY,navigationLogoSize} = useContext(MobileUiContext)
    const easing = Easing.out(Easing.exp)
    const statusBarHeight = Number(StatusBar.currentHeight?.toString())
    return (  
        <View
            style={{
                width:navigationLogoSize,
                height:navigationLogoSize,
                justifyContent:`center`,
                alignItems:`center`,
                position:`absolute`,
                bottom:0,
                right:0,
                zIndex:1
            }}
        >
            <TouchableHighlight
                onPress={()=>{
                    if(Number.parseInt(JSON.stringify(containerTranslateY)) === 0){
                        navigationContainerRef.current.measure((x:any, y:any, width:any, height:any, pageX:any, pageY:any) => {
                            Animated.timing(containerTranslateY,{
                                toValue:height,
                                duration:1000,
                                useNativeDriver:true,
                                easing:easing
                            }).start()
                        })
                        logoRef.current.measure((x:any, y:any, width:any, height:any, pageX:any, pageY:any) => {
                            Animated.timing(logoTranslateY,{
                                toValue:-(height + statusBarHeight),
                                duration:1000,
                                useNativeDriver:true,
                                easing:easing
                            }).start()
                        })
                    }
                    else{
                        Animated.timing(containerTranslateY,{
                            toValue:0,
                            duration:1000,
                            useNativeDriver:true,
                            easing:easing
                        }).start()
                        Animated.timing(logoTranslateY,{
                            toValue:0,
                            duration:1000,
                            useNativeDriver:true,
                            easing:easing
                        }).start()
                    }
                }}
            >
                <Ionicons
                    style={{
                        backgroundColor:`black`,
                        padding:4,
                        borderRadius:4,
                    }}
                    name="reorder-three" 
                    size={navigationLogoSize/2} 
                    color="white" 
                />
            </TouchableHighlight>
        </View>
    );
}
 
export default NavigationLogo;