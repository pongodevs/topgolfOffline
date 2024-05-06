import { useContext } from "react";
import { Animated, Dimensions, Image, StatusBar } from "react-native";
import { UiContext } from "../..";

const Logo = ({size, logoRef, logoTranslateY, style}:{size:number, logoRef:any, logoTranslateY:any, style?:any}) => {
    
    return (  
        <Animated.View
            ref={logoRef}
            style={{
                width:size,
                height:size,
                zIndex:1,
                transform:[{translateY:logoTranslateY}]
            }}
        >
            <Image
                source={require('../../../../../assets/images/logo/topgolf_logo.png')}
                style={[{
                    width:size,
                    height:size,
                    position:`absolute`,
                    transform:`translateX(-${size/2}px)`,
                },style]}
            />  
        </Animated.View>
    );
}
 
export default Logo;