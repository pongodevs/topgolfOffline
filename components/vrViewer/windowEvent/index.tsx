import { DeviceMotion } from 'expo-sensors';
import { useContext, useEffect, useState } from 'react';
import { VrViewerContext } from '..';


const WindowEvent = () => {
    const {camera, enableDeviceMotion} = useContext(VrViewerContext)

    useEffect(()=>{
        const handleDevicemotion = (e:any)=>{
            if(enableDeviceMotion && camera.rotation){
                // Rotate camera using device orientation
                const rotationMultiplier = 0.000295
                if(e.orientation === 0){
                    camera.rotation.x += e.rotationRate.alpha * rotationMultiplier
                    camera.rotation.y += e.rotationRate.beta * rotationMultiplier
                }
                if(e.orientation === 90){
                    camera.rotation.x -= e.rotationRate.beta * rotationMultiplier
                    camera.rotation.y += e.rotationRate.alpha * rotationMultiplier
                }
                if(e.orientation === -90){
                    camera.rotation.x += e.rotationRate.beta * rotationMultiplier
                    camera.rotation.y -= e.rotationRate.alpha * rotationMultiplier
                }
                if(e.orientation === 180){
                    camera.rotation.x -= e.rotationRate.alpha * rotationMultiplier
                    camera.rotation.y -= e.rotationRate.beta * rotationMultiplier
                }
            }
        }

        const subscription = DeviceMotion.addListener(handleDevicemotion)

        return()=>{
            DeviceMotion.removeSubscription(subscription)
        }


    },[enableDeviceMotion, camera])
    return (  
        <>
        </>
    );
}
 
export default WindowEvent;