import { useContext } from "react";
import { MapsContext } from "..";
import { View } from "react-native";
import { VrViewerContext } from "../../../..";
import Pin from "./pin";
import DropShadow from "./dropShadow";
import ViewFinder from "./viewFinder";

const Player = () => {
    const {currentView, selectedMap, cameraRig}= useContext(VrViewerContext)
    const {size, mapHeight, mapWidth, originalWidth} = useContext(MapsContext)

    const pin = selectedMap.pinpoints.find((pin)=>{return pin.toViewId === currentView._id})
    const top = ((pin? pin.position.y : 0) / 100) * ((originalWidth / mapWidth) * mapHeight)
    const left = ((pin? pin.position.x : 0) / 100) * originalWidth
    
    return (  
        <>
            {pin?
                <View
                    style={{
                        transform:`translateX(-${size/2}px) translateY(-${size/2}px)`,
                        top:top,
                        left:left,
                        position:`absolute`,
                        pointerEvents:`none`,
                        zIndex:1
                    }}
                >
                    <Pin/>
                    <DropShadow/>
                    <ViewFinder/>
                </View>
            :null}
        </>
    );
}
 
export default Player;