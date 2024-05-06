import { useContext, useMemo, useRef, useState } from "react";
import { PanResponder, Text, TouchableHighlight, View, Dimensions } from "react-native";
import { VrViewerContext } from "..";

const PanningContainer = ({children}:{children:any}) => {
    const {touch, camera} = useContext(VrViewerContext)
    const {width} = Dimensions.get('screen')

    const zoomState = {
        previousFov:0,
        startTouchDistance:0
    }
    // Panning event
    const pan = PanResponder.create({
        // Ask to be the responder:
        // onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => {
            touch.isTouchStart = true

            touch.location.x = gestureState.x0
            touch.location.y = gestureState.y0
            
        },
        onPanResponderMove: (evt, gestureState) => {
            if(touch.isTouchStart && gestureState.numberActiveTouches === 1 && zoomState.previousFov === 0 && zoomState.startTouchDistance === 0){
                const divider = 15
                touch.movement.x += (gestureState.moveX - touch.location.x)/divider
                touch.movement.y += (gestureState.moveY - touch.location.y)/divider
                
                touch.location.x = gestureState.moveX
                touch.location.y = gestureState.moveY
            }

            // Handle Zoom
            if(gestureState.numberActiveTouches >= 2){
                const dx = evt.nativeEvent.touches[0].pageX - evt.nativeEvent.touches[1].pageX;
                const dy = evt.nativeEvent.touches[0].pageY - evt.nativeEvent.touches[1].pageY;
                const currentTouchDistance = Math.sqrt(dx * dx + dy * dy);
                
                if(zoomState.startTouchDistance == 0){
                    // setStartTouchDistance(currentTouchDistance)
                    // setPreviousFov(camera.fov)
                    zoomState.startTouchDistance = currentTouchDistance
                    zoomState.previousFov = camera.fov
                }
                
                if(zoomState.startTouchDistance != 0){
                    const finalTouchDistance = (currentTouchDistance - zoomState.startTouchDistance) / 6
                    camera.fov =  Math.max(60, Math.min(125, zoomState.previousFov - finalTouchDistance))
                    camera.updateProjectionMatrix()
                }

            }
        },
        // onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
            touch.isTouchStart = false
            zoomState.previousFov = 0
            zoomState.startTouchDistance = 0
        },
    })
    const panResponder = useMemo(()=>pan,[camera]);
    return (  
        <View
            {...panResponder.panHandlers}
            
            style={{
                width:`100%`,
                height:`100%`,
                display:`flex`,
                position:`absolute`,
            }}
        >
            {children}
        </View>
    );
}
 
export default PanningContainer;