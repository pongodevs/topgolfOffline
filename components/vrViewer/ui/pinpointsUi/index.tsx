import { useContext } from "react";
import { VrViewerContext } from "../..";
import { View } from "react-native";
import Pinpoint from "./pinpoint";

const PinpointsUi = () => {
    const {selectedProject, currentView} = useContext(VrViewerContext)
    return (  
        <>
            {currentView.pinpoints.map((pinpoint,index)=>
                <Pinpoint
                    key={index}
                    pin={pinpoint}
                />
            )}
        </>
    );
}
 
export default PinpointsUi;