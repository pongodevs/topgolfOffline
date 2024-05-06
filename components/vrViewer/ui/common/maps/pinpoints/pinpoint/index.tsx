import { Dimensions, Image, TouchableHighlight, View } from "react-native";
import { ViewListType } from "../../../../../../../types/vrProjectType";
import { useContext } from "react";
import { VrViewerContext } from "../../../../..";
import { MapsContext } from "../..";

const Pinpoint = ({view}:{view:ViewListType}) => {
    const {selectedMap, currentView, teleport} = useContext(VrViewerContext)
    const {size, uri, originalWidth, mapHeight, mapWidth} = useContext(MapsContext)
    
    const pin = selectedMap.pinpoints.find((pin)=>{return pin.toViewId === view._id})
    const top = ((pin? pin.position.y : 0) / 100) * ((originalWidth /mapWidth) * mapHeight)
    const left = ((pin? pin.position.x : 0) / 100) * originalWidth
    return (  
        <>
            {currentView._id !== view._id?
                <TouchableHighlight
                    style={{
                        transform:`translateX(-${size/2}px) translateY(-${size/2}px)`,
                        top:top,
                        left:left,
                        position:`absolute`,
                        zIndex:2
                    }}
                    onPress={()=>{
                        teleport(view)
                    }}
                >
                    <View
                        style={{
                            width:size,
                            height:size,
                            backgroundColor:`green`,
                            borderRadius:size,
                            borderWidth:size/8,
                            borderColor:`white`,
                        }}
                    />
                </TouchableHighlight>
            :null}
        </>
    );
}
 
export default Pinpoint;