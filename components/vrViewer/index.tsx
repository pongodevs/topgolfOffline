import { THREE, TextureLoader } from 'expo-three';
import { Dispatch, SetStateAction, createContext, useEffect, useRef, useState } from "react";
import { MapType, PlayerType, SceneType, TouchType, ViewListType, VrProjectType, mapObject, playerObject, sceneObject, touchObject, viewListObject, vrProjectObject } from "../../types/vrProjectType";
import Ui from "./ui";
import Gl from "./gl";
import PanningContainer from './panningContainer';
import { Easing, EasingStatic, View } from 'react-native';
import gsap from 'gsap';

// @ts-ignore
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader'
import fontJson from '../../assets/json/fonts/helvetiker_regular_typeface.json'
import WindowEvent from './windowEvent';

const fontLoader = new FontLoader()
const font = fontLoader.parse(fontJson as any)



type VrViewerContextType = {
    touch:TouchType, 
    setTouch:Dispatch<SetStateAction<TouchType>>,
    camera:any,
    setCamera:Dispatch<SetStateAction<any>>,
    cameraRig:any,
    setCameraRig:Dispatch<SetStateAction<any>>,
    selectedScene:SceneType, 
    setSelectedScene:Dispatch<SetStateAction<SceneType>>,
    currentView:ViewListType, 
    setCurrentView:Dispatch<SetStateAction<ViewListType>>
    nextView:ViewListType, 
    setNextView:Dispatch<SetStateAction<ViewListType>>,
    scene:any,
    setScene:Dispatch<SetStateAction<any>>,
    gl:any,
    setGl:Dispatch<SetStateAction<any>>,
    material360:any, 
    setMaterial360:Dispatch<SetStateAction<any>>,
    selectedProject:VrProjectType,
    setSelectedProject:Dispatch<SetStateAction<VrProjectType>>,
    enableOrbitControl:boolean, 
    setEnableOrbitControl:Dispatch<SetStateAction<boolean>>,
    mainMeshRef:any,
    player:PlayerType, 
    setPlayer:Dispatch<SetStateAction<PlayerType>>,
    selectedMap:MapType,
    setSelectedMap:Dispatch<SetStateAction<MapType>>,
    teleport:Function,
    textureLoader:any,
    font:any,
    lightBlueColor:string,
    selectedBlueColor:string,
    unselectedDarkBlueColor:string,
    enableDeviceMotion:boolean, 
    setEnableDeviceMotion:Dispatch<SetStateAction<boolean>>,
    easing:any
}

const easing = Easing.out(Easing.exp)

export const VrViewerContext = createContext<VrViewerContextType>({} as VrViewerContextType)
const VrViewer = () => {
    
    // Texture loader
    const textureLoader = new TextureLoader()
    //  Touch state
    const [touch, setTouch] = useState(touchObject)
    const [camera, setCamera] = useState({
        fov:0,
        updateProjectionMatrix:()=>{}
    })
    const [cameraRig, setCameraRig] = useState(new THREE.Group())

    // THREE
    const [scene, setScene]= useState('' as any)
    const [gl, setGl]= useState('' as any)

    // Material 360
    const [material360, setMaterial360] = useState(new THREE.MeshBasicMaterial())

    // Project
    const [selectedProject, setSelectedProject] = useState(vrProjectObject)

    // Scene
    const [selectedScene, setSelectedScene] = useState(sceneObject)

    // View
    const [currentView, setCurrentView] = useState(viewListObject)
    const [nextView, setNextView] = useState(viewListObject)

    // Orbit Control
    const [enableOrbitControl, setEnableOrbitControl] = useState(true)

    // Main mesh ref
    const mainMeshRef = useRef<any>(null)

    // Player
    const [player, setPlayer] = useState(playerObject)

    // Map
    const [selectedMap, setSelectedMap] = useState(mapObject)

    // Device
    const [enableDeviceMotion, setEnableDeviceMotion] = useState(false)


    // Teleport function
    const teleport = (view:ViewListType, transition='fade')=>{
        if(!player.isTeleport){
            const finalDuration = 1
            // Fade transtiion
            if(transition === 'fade'){
                const tween1 = gsap.to(camera,{
                    fov:camera.fov,
                    duration:finalDuration,
                    delay:0,
                    onStart:()=>{
                        player.isViewTransition = true
                        mainMeshRef.current.material.uniforms.nextTexture.value = view.texture
                        
                        setNextView(view)
                        setCurrentView(view)
                    },
                    onUpdate:(e)=>{
                        camera.updateProjectionMatrix()
                        player.isTeleport = true
                        mainMeshRef.current.material.uniforms.mixColor.value = Math.pow(tween1.progress(),1)
                    },
                    onComplete:()=>{
                        setPlayer(prev=>{return {...prev,
                            isTeleport:false,
                            isViewTransition:false
                        }})
    
                        mainMeshRef.current.material.uniforms.currentTexture.value = view.texture
                        mainMeshRef.current.material.uniforms.mixColor.value = 0
                    }
                    
                })
            }
        }
    }

    const lightBlueColor = `rgba(22,36,49,0.9)`
    const selectedBlueColor = `rgba(63,146,209,0.9)`
    const unselectedDarkBlueColor = `rgba(12,19,25,0.9)`
    
    return (  
        <VrViewerContext.Provider
            value={{
                touch, setTouch,
                camera, setCamera,
                cameraRig, setCameraRig,
                selectedScene, setSelectedScene,
                currentView, setCurrentView,
                nextView, setNextView,
                scene, setScene,
                gl, setGl,
                material360, setMaterial360,
                selectedProject, setSelectedProject,
                enableOrbitControl, setEnableOrbitControl,
                mainMeshRef,
                player, setPlayer,
                selectedMap, setSelectedMap,
                teleport,
                textureLoader,
                font,
                lightBlueColor,
                selectedBlueColor,
                unselectedDarkBlueColor,
                enableDeviceMotion, setEnableDeviceMotion,
                easing
            }}
        >
            <WindowEvent/>
            <View
                style={{
                    width:`100%`,
                    height:`100%`,
                    backgroundColor:`black`,
                    display:`flex`
                }}
            >
                <Ui/>
                <PanningContainer>
                    <Gl/>
                </PanningContainer>
            </View>
        </VrViewerContext.Provider>

    );
} 
 
export default VrViewer;