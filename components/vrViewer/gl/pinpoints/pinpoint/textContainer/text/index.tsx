import { useContext, useEffect, useState } from "react";
import { PinpointContext } from "../..";
// @ts-ignore
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { VrViewerContext } from "../../../../..";
import { THREE } from "expo-three";

const Text = () => {
    const {textRef, pinpoint} = useContext(PinpointContext)
    const {font} = useContext(VrViewerContext)
    const textGeometry = new TextGeometry(pinpoint.labelName, {
        font: font,
        size: 50000,
        depth: 5,
        curveSegments: 3,
        bevelEnabled: false,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
    } );

    return (  
        <mesh
            ref={textRef}
            scale={0.000010}
            geometry={textGeometry}
            position={[
                0,
                0,
                0.02
            ]}
            material={new THREE.MeshBasicMaterial({
                color:`white`,
                side:THREE.DoubleSide
            })}
        />
    );
}
 
export default Text;