import { Dispatch, SetStateAction, createContext, useRef, useState } from "react";
import Logo from "../common/logo";
import { Animated, Image, View } from "react-native";
import MapContainer from "./mapContainer";
import ViewNavigationContainer from "./viewNavigationContainer";
import NavigationLogo from "./navigationLogo";

type TabletUiContextType = {
    isHideUi:boolean, 
    setIsHideUi:Dispatch<SetStateAction<boolean>>,
    viewNavigationContainerRef:any,
    viewNavigationLogoWidth:number,
    viewNavigationLogoSize:number,
    viewNavigationContainerTranslateY:Animated.Value,
    headerRef:any,
    headerTranslateY:Animated.Value
}
export const TabletUiContext = createContext<TabletUiContextType>({} as TabletUiContextType)
const TabletUi = () => {

    // Logo Related
    const logoRef = useRef(null)
    const [logoTranslateY] = useState(new Animated.Value(0))
    const logoSize = 160
    const logoMargin = 20

    //
    const [isHideUi, setIsHideUi] = useState(false)

    

    // View Navigation
    const viewNavigationContainerRef = useRef()
    const [viewNavigationContainerTranslateY] = useState(new Animated.Value(0))
    const viewNavigationLogoWidth = 90
    const viewNavigationLogoSize = 50

    // Header 
    const headerRef = useRef(null)
    const [headerTranslateY] = useState(new Animated.Value(0))
    return (  
        <TabletUiContext.Provider
            value={{
                isHideUi, setIsHideUi,
                viewNavigationContainerRef,
                viewNavigationLogoWidth,
                viewNavigationLogoSize,
                viewNavigationContainerTranslateY,
                headerRef,
                headerTranslateY
            }}
        >
            <Animated.View
                ref={headerRef}
                style={{
                    transform:[{translateY:headerTranslateY}],
                    zIndex:1,
                    position:`absolute`,
                    width:`100%`,
                }}
            >
                <Logo
                    logoRef={logoRef}
                    logoTranslateY={logoTranslateY}
                    size={logoSize}
                    style={{
                        left: (logoSize/2) + logoMargin,
                        top: logoMargin
                    }}
                />
                <MapContainer/>
            </Animated.View>
            <ViewNavigationContainer/>
            <NavigationLogo/>

        </TabletUiContext.Provider>
    );
}
 
export default TabletUi;