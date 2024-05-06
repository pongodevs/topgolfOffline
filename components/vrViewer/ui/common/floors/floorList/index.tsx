import { Text, TouchableHighlight, View } from "react-native";
import { MapType } from "../../../../../../types/vrProjectType";
import { useContext } from "react";
import { VrViewerContext } from "../../../..";

const FloorList = ({map}:{map:MapType}) => {
    const {lightBlueColor, selectedBlueColor, unselectedDarkBlueColor, setSelectedMap, selectedMap, teleport, selectedScene} = useContext(VrViewerContext)
    return (  
        <View
            style={{
                justifyContent:`center`,
                alignItems:`center`,
                borderRadius:8,
                overflow:`hidden`
            }}
        >
            <TouchableHighlight
                onPress={()=>{
                    const filteredViews = selectedScene.viewList.filter((view)=>{return view.mapId === map._id})
                    setSelectedMap(map)
                    teleport(filteredViews[0])
                }}
            >
                <Text
                    style={{
                        color:`white`,
                        backgroundColor:selectedMap._id === map._id? selectedBlueColor: unselectedDarkBlueColor,
                        padding:8,
                        borderRadius:4
                    }}
                >
                    {map.mapName}
                </Text>
            </TouchableHighlight>
        </View>
    );
}
 
export default FloorList;