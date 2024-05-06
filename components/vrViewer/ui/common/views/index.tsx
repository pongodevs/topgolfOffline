import { useContext } from "react";
import { VrViewerContext } from "../../..";
import ViewList from "./viewList";
import { View } from "react-native";

const Views = () => {
    const {selectedScene, selectedMap} = useContext(VrViewerContext)
    const filteredViewList = selectedScene.viewList.filter((view)=>{
        return view.mapId === selectedMap._id
    })
    return (  
        <>
            <View
                style={{
                    display:`flex`,
                    flexDirection:`row`,
                    flexWrap:`wrap`,
                    justifyContent:`center`,
                    alignItems:`center`,
                    margin:10,
                }}
            >
                {filteredViewList.map((view,index)=>
                    <ViewList
                        key={view._id}
                        view={view}
                    />
                )}
            </View>
        </>
    );
}
 
export default Views;