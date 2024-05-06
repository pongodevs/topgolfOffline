import { useContext } from "react";
import { VrViewerContext } from "../../..";
import FloorList from "./floorList";

const Floors = () => {
    const {selectedProject} = useContext(VrViewerContext)
    return (  
        <>
            {selectedProject.maps.map((map,index)=>
                <FloorList
                    key={map._id}
                    map={map}
                />
            )}
        </>
    );
}
 
export default Floors;