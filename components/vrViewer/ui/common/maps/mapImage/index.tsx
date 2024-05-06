import { useContext } from "react";
import { Dimensions, Image } from "react-native";
import { MapsContext } from "..";

const MapImage = () => {
    const {mapHeight, mapWidth, originalWidth,uri} = useContext(MapsContext)
    return (  
        <>
            {uri !== ''?
                <Image
                    source={uri}
                    style={{
                        width:originalWidth,
                        height:(originalWidth/mapWidth) * mapHeight,
                        resizeMode:`contain`,
                    }}
                />
            :null}
        </>
    );
}
 
export default MapImage;