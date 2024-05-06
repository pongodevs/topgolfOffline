import { useFrame, useThree } from '@react-three/fiber/native';
import { useContext} from 'react';
import { VrViewerContext } from '../..';

const OrbitControls = () => {
    const {camera} = useThree()
    const {touch, player} = useContext(VrViewerContext)

    useFrame(()=>{
        const multiplier = 0.005;
        // Yaw
        touch.movement.x *= 0.92;
        camera.rotation.y += touch.movement.x * multiplier

        // Roll
        touch.movement.y *= 0.92;
        camera.rotation.x = Math.max(Math.min( (camera.rotation.x + (touch.movement.y * multiplier)) , 1.2),-1.2)
    })
    return (
        null
    );
}
 
export default OrbitControls;