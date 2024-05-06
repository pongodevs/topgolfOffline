import { createContext, useContext } from "react";
import MapImage from "./mapImage";
import Pinpoints from "./pinpoints";
import Player from "./player";
import { VrViewerContext } from "../../..";
import { Dimensions, Image, View } from "react-native";

type MapsContextType = {
    size:number
    originalWidth:number,
    mapHeight:number,
    mapWidth:number,
    uri:any
}
export const MapsContext = createContext<MapsContextType>({} as MapsContextType)
const Maps = ({originalWidth}:{originalWidth:number}) => {
    const {selectedMap} = useContext(VrViewerContext)
    const uri = selectedMap.imageUrl
    const mapHeight = uri !== ''? Image.resolveAssetSource(uri as any).height : 0
    const mapWidth = uri !== ''? Image.resolveAssetSource(uri as any).width : 0

    const size = 20
    return (  
        <MapsContext.Provider
            value={{
                size,
                originalWidth,
                mapHeight,
                mapWidth,
                uri
            }}
        >
            <View
                style={{
                    overflow:`hidden`
                }}
            >
                <MapImage/>
                <Pinpoints/>
                <Player/>
            </View>
        </MapsContext.Provider>
    );
}
 
export default Maps;