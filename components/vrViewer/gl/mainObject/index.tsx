import { useContext, useMemo } from "react";
import { VrViewerContext } from "../..";
import { THREE } from "expo-three";

const MainObject = () => {
    const { material360, mainMeshRef, currentView} = useContext(VrViewerContext)
    const mainGeometry =  useMemo(()=>{
        return new THREE.SphereGeometry(200,64,64)
    },[])
    const rotation = ((currentView.rotation / 360) * (Math.PI * 2)) + (Math.PI * 1/2)
    return (  
        <mesh
            ref={mainMeshRef}
            geometry={mainGeometry}
            material={material360}
            scale={[1,1,-1]}
            rotation={[0,rotation,0]}
        >
            
        </mesh>
    );
}
 
export default MainObject;