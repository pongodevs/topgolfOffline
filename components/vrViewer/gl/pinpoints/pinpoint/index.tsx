import { THREE, TextureLoader, } from "expo-three";
import { PinpointType } from "../../../../../types/vrProjectType";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { VrViewerContext } from "../../..";
import ThumbnailContainer from "./thumbnailContainer";
import TextContainer from "./textContainer";
import gsap from "gsap";


type PinpointContextType = {
    pinpoint:PinpointType,
    xDistance:number,
    yDistance:number,
    size:number,
    textRef:any,
}
export const PinpointContext = createContext<PinpointContextType>({} as PinpointContextType)

const Pinpoint = ({pinpoint, index}:{pinpoint:PinpointType, index:number}) => {
    const {selectedScene, teleport,  currentView,  player} = useContext(VrViewerContext)    
    const distance = new THREE.Vector3(pinpoint.position.x, pinpoint.position.y, pinpoint.position.z).distanceTo(new THREE.Vector3(0,0,0))
    const multiplier = 0.04
    
    const size = distance * multiplier
    
    // Text related
    const [bbox, setBbox]= useState(new THREE.Box3())

    const textRef = useRef(null)

    useEffect(()=>{
        if(textRef.current){
            const bbox = new THREE.Box3().setFromObject(textRef.current);
            setBbox(bbox)
        }
    },[pinpoint.labelName])

    useEffect(()=>{
        setXDistance(Math.abs(bbox.max.x - bbox.min.x))
        setYDistance(Math.abs(bbox.max.y - bbox.min.y))
    },[bbox])

    const [xDistance, setXDistance] = useState(0)
    const [yDistance, setYDistance] = useState(0)
    
    const groupRef = useRef(null as any)
    
    return (  
        <PinpointContext.Provider
            value={{
                size,
                pinpoint,
                xDistance,
                yDistance,
                textRef,
            }}
        >
            {/* Group for rotation */}
            <group
                rotation={[0,Math.PI * currentView.rotation/180,0]}
            >
                {/* Mesh Group */}
                <group
                    position={[
                        pinpoint.position.x,
                        pinpoint.position.y,
                        pinpoint.position.z - (index * 0.01)
                    ]}
                    onUpdate={(self:any) =>{
                        self.lookAt(new THREE.Vector3(0,0,0))
                    }}
                    ref={groupRef}
                    onClick={()=>{
                        if(groupRef.current && !player.isTeleport){
                            // Animation feedback
                            const scale = 1.1
                            const duration = 0.1
                            gsap.to(groupRef.current.scale,{
                                x:scale,
                                y:scale,
                                z:scale,
                                duration:duration,
                                ease:`power1`
                            })
                            gsap.to(groupRef.current.scale,{
                                x:1,
                                y:1,
                                z:1,
                                duration:duration,
                                delay: duration,
                                ease:`power1`,
                                onComplete:()=>{
                                    // Then teleport
                                    // First find the view
                                    const findView = selectedScene.viewList.find((view)=>{
                                        return view._id == pinpoint.toViewId
                                    })
                                    if(findView){
                                        teleport(findView)
                                    }
                                }
                            })
    
                        }
                    }}
                >
                    <ThumbnailContainer/>
                    <TextContainer/>
                </group>
            </group>  
        </PinpointContext.Provider>
    );
}
 
export default Pinpoint;