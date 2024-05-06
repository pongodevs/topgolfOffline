import { useContext } from "react";
import { Animated, View } from "react-native";
import { VrViewerContext } from "../../..";
import Views from "../../common/views";
import { TabletUiContext } from "..";

const ViewNavigationContainer = () => {
    const {lightBlueColor} = useContext(VrViewerContext)
    const {viewNavigationContainerRef, viewNavigationLogoWidth, viewNavigationContainerTranslateY} = useContext(TabletUiContext)
    return (  
        <Animated.View
            ref={viewNavigationContainerRef}
            style={{
                width:`100%`,
                display:`flex`,
                flexDirection:`row`,
                justifyContent:`space-between`,
                alignItems:`center`,
                position:`absolute`,
                bottom:0,
                zIndex:1,
                backgroundColor:lightBlueColor,
                transform:[{translateY:viewNavigationContainerTranslateY}]
            }}
        >
            {/* Left Logo */}
            <View
                style={{
                    width:viewNavigationLogoWidth,
                    height:`100%`,
                    justifyContent:`center`,
                    alignItems:`flex-end`
                }}
            >
                <View
                    style={{
                        width:1,
                        height:`80%`,
                        backgroundColor:`white`
                    }}  
                />
            </View>
            {/* View Navigation */}
            <View
                style={{
                    flexShrink:1,
                }}
            >
                <Views/>
            </View>
            {/* Right Logo */}
            <View
                style={{
                    width:viewNavigationLogoWidth,
                    height:`100%`,
                    justifyContent:`center`,
                }}
            >
                {/* Separator */}
                <View
                    style={{
                        width:1,
                        height:`80%`,
                        backgroundColor:`white`
                    }}  
                />

            </View>
        </Animated.View>
    );
}
 
export default ViewNavigationContainer;