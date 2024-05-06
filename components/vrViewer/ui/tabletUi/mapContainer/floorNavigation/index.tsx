import { View } from "react-native";
import Floors from "../../../common/floors";
import HiddenIcon from "./hiddenIcon";
import { useContext } from "react";
import { VrViewerContext } from "../../../..";

const FloorNavigation = () => {
    const {lightBlueColor} = useContext(VrViewerContext)
    return (  
        <View
            style={{
                display:`flex`,
                flexDirection:`row`,
                justifyContent:`center`,
                padding:8,
                gap:8,
                backgroundColor:lightBlueColor,
                zIndex:1
            }}
        >
            <Floors/>
            <HiddenIcon/>
        </View>
    );
}
 
export default FloorNavigation;