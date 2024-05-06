import { THREE } from "expo-three";
import { PinpointsContext } from "../../..";
import { useContext } from "react";
import { PinpointContext } from "../..";

const Icon = () => {
    const {mapPinpointTexture} = useContext(PinpointsContext)
    const {size} = useContext(PinpointContext)
    return (  
        <mesh
            position={[0,0,-0.05]}
            geometry={new THREE.PlaneGeometry( size * 4 , size * 4)}
            material={new THREE.MeshBasicMaterial({
                map:mapPinpointTexture,
                transparent:true,
            })}
        />
    );
}
 
export default Icon;