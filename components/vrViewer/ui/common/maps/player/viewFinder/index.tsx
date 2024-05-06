import { useContext, useEffect, useState } from "react";
import { Image, View } from "react-native";
import { MapsContext } from "../..";
import { VrViewerContext } from "../../../../..";

const ViewFinder = () => {
    const {camera, player} = useContext(VrViewerContext)
    const {size} = useContext(MapsContext)
    const width = 130
    const height = 80

    // Render pinpoint to 3D view
    const [rotation, setRotation] = useState(0)

    let animationFrameId:any
    useEffect(()=>{
        const render = () => {
            if(camera.rotation){
                setRotation(camera.rotation.y)
                animationFrameId = requestAnimationFrame(render);
            }
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    },)
    return (  
        <>
            <View
                style={{
                    position:`absolute`,
                    height:size,
                    width:size,
                    justifyContent:`center`,
                    alignItems:`center`,
                    transform:`rotate(${(-(rotation * (180 / Math.PI) )) + 180}deg)`
                }}
            >
                <View
                    style={{
                        top:height/2,
                        width:width,
                        height:height,
                        // backgroundColor:`red`,
                    }}
                >
                    <Image
                        source={require('../../../../../../../assets/images/icons/viewfinder.png')}
                        style={{
                            width:width,
                            height:height,
                            resizeMode:`stretch`,
                            transform:`rotate(180deg)`,
                            opacity:0.7
                        }}
                    />
                </View>
            </View>
        </>
    );
}
 
export default ViewFinder;