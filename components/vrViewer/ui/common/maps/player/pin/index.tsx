import { useContext } from "react";
import { View } from "react-native";
import { MapsContext } from "../..";

const Pin = () => {
    const {size} = useContext(MapsContext)
    return (  
        <>
            <View
                style={{
                    width:size,
                    height:size,
                    backgroundColor:`white`,
                    borderRadius:size,
                    zIndex:2,
                }}
            />
        </>
    );
}
 
export default Pin;