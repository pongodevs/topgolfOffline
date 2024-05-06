import { THREE } from "expo-three";
import { useContext, useMemo } from "react";
import { PinpointContext } from "../..";
import { VrViewerContext } from "../../../../..";

const Thumbnail = () => {
    const {textureLoader, selectedProject} = useContext(VrViewerContext)
    const {size, pinpoint} = useContext(PinpointContext)
    const texture = useMemo(()=>{
        return textureLoader.load(pinpoint.thumbnailUrl !== ''? pinpoint.thumbnailUrl : "../assets/images/thumbnails/lift.jpg")
    },[selectedProject])

    const material = new THREE.RawShaderMaterial({
        uniforms:{
            texture: { value: texture},
        },
        vertexShader: `
            uniform mat4 projectionMatrix;
            uniform mat4 viewMatrix;
            uniform mat4 modelMatrix;
            
            attribute vec3 position;
            attribute vec3 normal;
            attribute vec2 uv;
            
            varying vec3 vPosition;
            varying vec2 vUv;
            
            void main()
            {   
                vUv = uv;
                vPosition = position;
                gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            precision highp float;
            uniform sampler2D texture;
            
            varying vec2 vUv;
            
            void main()
            {   
                vec4 color = texture2D(texture, vUv);
                gl_FragColor = color;
            }
        `
    })
    return (  
        <mesh
            position={[0,0.55,0]}
            geometry={new THREE.CircleGeometry( size, 32 )}
            material={material}
        />
    );
}
 
export default Thumbnail;