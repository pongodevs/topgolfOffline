import { useContext } from "react";
import { Animated, Easing, Text, TouchableHighlight, View } from "react-native";
import { VrViewerContext } from "../../../../..";
import { TabletUiContext } from "../../..";
import { MapContainerContext } from "../..";

const HiddenIcon = () => {
    const {unselectedDarkBlueColor} = useContext(VrViewerContext)
    const {isHideUi, setIsHideUi, } = useContext(TabletUiContext)
    const {mapContainerRef, mapContainerTranslateY} = useContext(MapContainerContext)
    const easing = Easing.out(Easing.exp)
    return (  
        <TouchableHighlight
            style={{
                justifyContent:`center`,
                alignItems:`center`,
                borderRadius:8,
                backgroundColor:unselectedDarkBlueColor,
                paddingHorizontal:8
            }}
            onPress={()=>{
                // setIsHideUi(prev=>{return !prev})
                if(Number.parseInt(JSON.stringify(mapContainerTranslateY)) === 0){
                    setIsHideUi(true)
                    mapContainerRef.current.measure((x:any, y:any, width:any, height:any, pageX:any, pageY:any) => {
                        Animated.timing(mapContainerTranslateY,{
                            toValue:-height,
                            duration:1000,
                            useNativeDriver:true,
                            easing:easing
                        }).start()
                    })
                }
                else{
                    setIsHideUi(false)
                    Animated.timing(mapContainerTranslateY,{
                        toValue:0,
                        duration:1000,
                        useNativeDriver:true,
                        easing:easing
                    }).start()
                }
            }}
        >
            <View
                style={{
                    borderWidth:1,
                    borderColor:`white`,
                    borderRadius:8,
                    paddingHorizontal:8,
                    paddingVertical:3,
                    display:`flex`,
                    flexDirection:!isHideUi?`row`:`row-reverse`,
                    alignItems:`center`,
                    justifyContent:`center`,
                    gap:4,
                }}
            >
                <Text
                    style={{
                        color:`white`,
                        backgroundColor:unselectedDarkBlueColor,
                        fontSize:9,
                        fontWeight:'700'
                    }}
                >
                    {!isHideUi? `HIDE` : `SHOW`}
                </Text>
                <View
                    style={{
                        width:8,
                        height:8,
                        borderWidth:1.5,
                        borderRadius:4,
                        borderColor:`white`,
                        padding:2
                    }}
                >

                </View>
            </View>
        </TouchableHighlight>
    );
}
 
export default HiddenIcon;