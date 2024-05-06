import { createContext, useRef, useState } from "react";
import Logo from "../common/logo";
import NavigationContainer from "./navigationContainer";
import NavigationLogo from "./navigationLogo";
import { Animated, Dimensions, StatusBar } from "react-native";

type MobileUicontextType = {
    navigationContainerRef:any,
    containerTranslateY:Animated.Value,
    navigationLogoSize:number,
    logoRef:any,
    logoTranslateY:Animated.Value
}
export const MobileUiContext = createContext<MobileUicontextType>({} as MobileUicontextType)
const MobileUi = () => {
    const navigationContainerRef = useRef(null)
    const [containerTranslateY] = useState(new Animated.Value(0))

    // Logo Related
    const logoRef = useRef(null)
    const [logoTranslateY] = useState(new Animated.Value(0))
    const logoSize = 160

    const navigationLogoSize = 60
    const statusBarHeight = Number(StatusBar.currentHeight?.toString())

    const {height:wHeight, width:wWidth, scale} = Dimensions.get('screen')
    return (  
        <MobileUiContext.Provider
            value={{
                navigationContainerRef,
                containerTranslateY,
                navigationLogoSize,
                logoRef,
                logoTranslateY
            }}
        >
            <Logo
                logoRef={logoRef}
                logoTranslateY={logoTranslateY}
                size={logoSize}
                style={{
                    top:(statusBarHeight + 10),
                    left: wWidth/2,
                }}
            />       
            <NavigationContainer/>
            <NavigationLogo/>
        </MobileUiContext.Provider>
    );
}
 
export default MobileUi;