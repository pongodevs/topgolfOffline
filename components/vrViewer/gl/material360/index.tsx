import { THREE } from "expo-three";
import { useContext, useEffect } from "react";
import { VrViewerContext } from "../..";

const Material360 = () => {
    const {currentView, nextView, setMaterial360, selectedProject} = useContext(VrViewerContext)
    useEffect(()=>{
        if(selectedProject._id !== ''){
            const equirectangularMaterial = new THREE.RawShaderMaterial({
                side:THREE.DoubleSide,
                uniforms:{
                    currentTexture: { value: currentView?.texture},
                    nextTexture: { value: nextView?.texture},
                    mixColor: {value: 0},
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
                    uniform sampler2D currentTexture;
                    uniform sampler2D nextTexture;
                    uniform float mixColor;
                    
                    varying vec2 vUv;
                    
                    void main()
                    {   
                        vec4 currentColor = texture2D(currentTexture, vUv);
                        vec4 nextColor = texture2D(nextTexture, vUv);
                        vec4 mixColor = mix(currentColor, nextColor, mixColor);
        
                        gl_FragColor = mixColor;
                    }
                `
            })
            setMaterial360(equirectangularMaterial)
        }
    },[selectedProject])
    return (  
        null
    );
}
 
export default Material360;