import { Animated, Easing, StatusBar, TouchableHighlight, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from "react";
import { VrViewerContext } from "../../..";
import { THREE } from "expo-three";
import { TabletUiContext } from "..";

const NavigationLogo = () => {
    const {camera, easing} = useContext(VrViewerContext)
    const statusBarHeight = Number(StatusBar.currentHeight?.toString())
    const {
        viewNavigationContainerRef, 
        viewNavigationLogoWidth, 
        viewNavigationLogoSize, 
        viewNavigationContainerTranslateY,
        headerRef,
        headerTranslateY
    } = useContext(TabletUiContext)

    if(viewNavigationContainerRef.current){
        viewNavigationContainerRef.current.measure((x:any, y:any, width:any, height:any, pageX:any, pageY:any) => {
            setTranslateY(height)
        })
    }

    const [translateY, setTranslateY] = useState(0)
    return (  
        <View
            style={{
                zIndex:1,
                position:`absolute`,
                bottom:0,
                right:0,
                transform:`translateX(${viewNavigationLogoSize/2}px) translateY(${viewNavigationLogoSize/2}px)`
            }}
            
        >
            <View
                style={{
                    transform:`translateX(${-viewNavigationLogoWidth/2}px) translateY(${-translateY/2}px)`
                }}
            >
                <TouchableHighlight
                    onPress={()=>{
                        if(Number.parseInt(JSON.stringify(viewNavigationContainerTranslateY)) === 0){
                            viewNavigationContainerRef.current.measure((x:any, y:any, width:any, height:any, pageX:any, pageY:any) => {
                                Animated.timing(viewNavigationContainerTranslateY,{
                                    toValue:height + 50,
                                    duration:1000,
                                    useNativeDriver:true,
                                    easing:easing
                                }).start()
                            })
                            headerRef.current.measure((x:any, y:any, width:any, height:any, pageX:any, pageY:any) => {
                                Animated.timing(headerTranslateY,{
                                    toValue: -(height * 3),
                                    duration:1000,
                                    useNativeDriver:true,
                                    easing:easing
                                }).start()
                            })
                        }
                        else{
                            Animated.timing(viewNavigationContainerTranslateY,{
                                toValue:0,
                                duration:1000,
                                useNativeDriver:true,
                                easing: easing,
                            }).start()
                            Animated.timing(headerTranslateY,{
                                toValue:0,
                                duration:1000,
                                useNativeDriver:true,
                                easing: easing,
                            }).start()
                        }
                    }}
                >
                    <Ionicons
                        name="reorder-three" 
                        size={50} 
                        color="white" 
                    />
                </TouchableHighlight>
            </View>
        </View>
    );
}
 
export default NavigationLogo;