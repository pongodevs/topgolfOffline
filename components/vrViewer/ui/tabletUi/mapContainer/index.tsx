import { Animated, Dimensions, View } from "react-native";
import FloorNavigation from "./floorNavigation";
import Maps from "../../common/maps";
import { createContext, useContext, useRef, useState } from "react";
import { VrViewerContext } from "../../..";
import { TabletUiContext } from "..";

type MapContainerContextType = {
    mapContainerRef:any,
    mapContainerTranslateY:Animated.Value,
}
export const MapContainerContext = createContext<MapContainerContextType>({} as MapContainerContextType)
const MapContainer = () => {
    const {lightBlueColor} = useContext(VrViewerContext)
    const {width:originalWidth} = Dimensions.get('screen')
    const screenPercentageWidth = 55

    // Map Related
    const mapContainerRef = useRef(null)
    const [mapContainerTranslateY] = useState(new Animated.Value(0))
    return (  
        <MapContainerContext.Provider
            value={{
                mapContainerRef,
                mapContainerTranslateY
            }}
        >
            <View
                style={{
                    zIndex:1,
                    position:`absolute`,
                    top:0,
                    right:0,
                    width:`${screenPercentageWidth}%`,
                    
                }}
            >
                <FloorNavigation/>
                <View
                    style={{
                        overflow:`hidden`
                    }}
                >
                    <Animated.View
                        ref={mapContainerRef}
                        style={{
                            transform:[{translateY:mapContainerTranslateY}],
                            backgroundColor:lightBlueColor
                        }}
                    >
                        <Maps
                            originalWidth={originalWidth * (screenPercentageWidth/100)}
                        />
                    </Animated.View>
                </View>
            </View>
        </MapContainerContext.Provider>
    );
}
 
export default MapContainer;