import { Dimensions, Image, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { PinpointType, ViewListType } from "../../../../../types/vrProjectType";
import {FontAwesome} from '@expo/vector-icons'
import { useContext, useEffect, useRef } from "react";
import { VrViewerContext } from "../../..";
import { THREE } from "expo-three";
import * as NTHREE from 'three'

const Pinpoint = ({pin}:{pin:PinpointType}) => {
    const innerWidth = Dimensions.get('window').width
    const innerHeight = Dimensions.get('window').height
    const screenFactor = Dimensions.get('screen').scale
    const pinpointRef = useRef<View>(null)
    const {camera, currentView, cameraRig, selectedScene, teleport} = useContext(VrViewerContext)

    // Render pinpoint to 3D view
    let animationFrameId:any
    useEffect(()=>{
        const render = () => {
            if(camera.fov > 0){
                // Rotated value
                const quaternion = new THREE.Quaternion()
                const radians = currentView.rotation * (Math.PI/180)
                quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), radians)
                // 
                const currentPosition = new THREE.Vector3(pin.position.x, pin.position.y, pin.position.z)
                // Get dot product
                const cameraToPoint = new THREE.Vector3().subVectors(cameraRig.position,currentPosition).normalize()
                const rotatedCameraToPoint = cameraToPoint.applyQuaternion(quaternion)
                const cameraDir = camera.getWorldDirection(new THREE.Vector3())

                const dotProduct = cameraDir.dot(rotatedCameraToPoint)

                // Translate UI according to 2D space
                const screenPosition = currentPosition.clone()
                const rotatedScreenPosition = screenPosition.applyQuaternion(quaternion)
                rotatedScreenPosition.project(camera as any)
                const translateX =  dotProduct > 0? 999999 : (rotatedScreenPosition.x * innerWidth * 0.5) 
                const translateY =  dotProduct > 0? 999999 : (-rotatedScreenPosition.y * innerHeight * 0.5)
                if(pinpointRef.current){
                    pinpointRef.current.setNativeProps({
                        left:translateX ,
                        top:translateY
                    })
                }
            }
            
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    },)

    const size = 100

    return (  
        <TouchableHighlight
            onPress={()=>{
                // First find the view
                const findView = selectedScene.viewList.find((view)=>{
                    return view._id == pin.toViewId
                })
                if(findView){
                    teleport(findView)
                }
            }}
            style={{
                zIndex:100
            }}
        >
            <View
                ref={pinpointRef}
                style={{
                    width:size,
                    height:size,
                    position:`absolute`,
                    justifyContent:`center`,
                    transform:`translateX(${-(size/2) + (innerWidth/2)}px) translateY(${-(size/2) + (innerHeight/2)}px)`,
                    alignItems:`center`,
                }}
            >
                {/* <Image
                    source={pin.thumbnailUrl as any}
                    style={{
                        position:`absolute`,
                        width:size/2,
                        height:size/2,
                        zIndex:1,
                        borderRadius:100,
                        transform:`translateY(-${size/7}px)`
                    }}
                />
                <FontAwesome 
                    name="map-marker" 
                    size={size} 
                    color="white" 
                /> */}
                <Text
                    style={{
                        backgroundColor:`rgba(0,0,0,0.5)`,
                        color:`white`,
                        transform:`translateY(50px)`,
                        padding:10,
                        borderRadius:5,
                        fontSize:10,
                        textAlign:`center`
                    }}
                >
                    {pin.labelName}
                </Text>

            </View>
        </TouchableHighlight>
    );
}
 
export default Pinpoint;