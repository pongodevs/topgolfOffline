import { useFrame, useThree } from '@react-three/fiber/native';
import React, { useContext, useEffect } from 'react';
import {THREE} from 'expo-three'
import { VrViewerContext } from '../..';


const InitCamera = () => {
    const {camera, scene, gl} = useThree()
    const {setScene, setCamera, setGl,  cameraRig} = useContext(VrViewerContext)

    useEffect(()=>{
        if(gl && setGl){
            setGl(gl)
        }
        if(setScene){
            setScene(scene)
        }
        if(setCamera){
            setCamera(camera)
        }
        cameraRig.add(camera)
        scene.add(cameraRig)

        if(true){
            (camera as any).fov = 100
        }
        
        camera.near = 0.01;
        camera.updateProjectionMatrix()

        camera.position.x = 0
        camera.position.y = 0
        camera.position.z = 0
        camera.rotation.order = 'YXZ';
        
        // gl.outputEncoding = THREE.sRGBEncoding

        gl.xr.addEventListener( 'sessionend', function ( event:any ) {
            cameraRig.position.x = 0
            cameraRig.position.y = 0
            cameraRig.position.z = 0
    
        } );
    },[])

    useFrame(()=>{
        camera.updateMatrixWorld()
    })

    return ( 
        null
    );
}
 
export default InitCamera;