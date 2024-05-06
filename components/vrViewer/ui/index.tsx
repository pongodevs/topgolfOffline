import { ScrollView, Text, TouchableHighlight, View, Platform, Dimensions, Pressable, Animated } from "react-native";
import PinpointsUi from "./pinpointsUi";
import MobileUi from "./mobileUi";
import TabletUi from "./tabletUi";
import { createContext, useRef, useState } from "react";

type UiContextType = {
}
export const UiContext = createContext<UiContextType>({} as UiContextType)
const Ui = () => {
    const {height, width} = Dimensions.get('window')
    const aspectRatio = height /width
    const isTablet = aspectRatio < 1.6
    const isMobile = !isTablet && Platform.OS == 'android' || !isTablet && Platform.OS == 'ios'

    return (  
        <UiContext.Provider
            value={{
            }}
        >
            {isMobile?
                <MobileUi/>
            :null}
            {isTablet?
                <TabletUi/>
            :null}
        </UiContext.Provider>
    );
}
 
export default Ui;