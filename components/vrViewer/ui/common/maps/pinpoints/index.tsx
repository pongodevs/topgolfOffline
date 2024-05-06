import { useContext } from "react";
import { VrViewerContext } from "../../../..";
import Pinpoint from "./pinpoint";

const Pinpoints = () => {
    const {selectedProject, selectedScene, selectedMap} = useContext(VrViewerContext)
    const filteredViewList = selectedScene.viewList.filter((view)=>{
        return view.mapId === selectedMap._id
    })
    return (  
        <>
            {filteredViewList.map((view,index)=>
                <Pinpoint
                    key={view._id}
                    view={view}
                />
            )}
        </>
    );
}
 
export default Pinpoints;