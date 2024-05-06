import { useContext } from "react";
import Text from "./text";
import TextOverlay from "./textOverlay";
import { PinpointContext } from "..";

const TextContainer = () => {
    const {xDistance, yDistance, size} = useContext(PinpointContext)
    return (  
        <group
            position={[
                -xDistance/2,
                -(yDistance + (size * 3)),
                0
            ]}
        >
            <Text/>
            <TextOverlay/>
        </group>
    );
}
 
export default TextContainer;