import { Canvas } from "@react-three/fiber/native";
import InitProject from "./initProject";
import InitCamera from "./initCamera";
import OrbitControls from "./orbitControls";
import Material360 from "./material360";
import MainObject from "./mainObject";
import Pinpoints from "./pinpoints";
import { useContext } from "react";
import { VrViewerContext } from "..";

const Gl = () => {
    return (  
        <Canvas
            onCreated={
                (state) => { 
                    const _gl = state.gl.getContext() as any
                    const pixelStorei = _gl.pixelStorei.bind(_gl) 
                    _gl.pixelStorei = function(...args:any) { 
                        const [parameter] = args 
                        switch(parameter) { 
                            case _gl.UNPACK_FLIP_Y_WEBGL: return pixelStorei(...args) 
                        } 
                    } 
                }
            }
        >
            <InitProject/>
            <InitCamera/>
            <OrbitControls/>
            <Material360/>
            <MainObject/>
            <Pinpoints/>
        </Canvas>
    );
}
 
export default Gl;