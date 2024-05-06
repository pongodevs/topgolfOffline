import { useContext } from "react";
import { View } from "react-native";
import { MapsContext } from "../..";

const DropShadow = () => {
    const {size} = useContext(MapsContext)
    
    return (  
        <>
            <View
                style={{
                    width:size,
                    height:size,
                    backgroundColor:`black`,
                    borderRadius:size,
                    position:`absolute`,
                    transform:`translateX(5px) translateY(5px)`,
                }}
            />
        </>
    );
}
 
export default DropShadow;