import { createContext, useContext, useMemo } from "react";
import { VrViewerContext } from "../..";
import Pinpoint from "./pinpoint";
import { Asset } from 'expo-asset';

type PinpointsContextType = {
    mapPinpointTexture:any
}
export const PinpointsContext = createContext<PinpointsContextType>({} as PinpointsContextType)

const Pinpoints = () => {
    const {currentView, textureLoader} = useContext(VrViewerContext)
    const mapPinpointTexture = useMemo(()=>{
        return textureLoader.load(require('../../../../assets/images/icons/map_pinpoint.png'))
    },[])
    return (  
        <PinpointsContext.Provider
            value={{
                mapPinpointTexture
            }}
        >
            {currentView.pinpoints.map((pinpoint,index)=>
                <Pinpoint
                    key={pinpoint._id}
                    index={index}
                    pinpoint={pinpoint}
                />
            )}
        </PinpointsContext.Provider>
    );
}
 
export default Pinpoints;