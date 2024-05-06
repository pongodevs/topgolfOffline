import { Text, TouchableHighlight, View } from "react-native";
import { ViewListType } from "../../../../../../types/vrProjectType";
import { useContext } from "react";
import { VrViewerContext } from "../../../..";

const ViewList = ({view}:{view:ViewListType}) => {
    const {selectedBlueColor, unselectedDarkBlueColor, currentView, setCurrentView, teleport} = useContext(VrViewerContext)
    return (  
        <>
            <View
                style={{
                    display:`flex`,
                    justifyContent:`center`,
                    alignItems:`center`
                }}
            >
                <TouchableHighlight
                    onPress={()=>{
                        teleport(view)
                    }}
                    style={{
                        margin:4,
                    }}
                >
                    <Text
                        style={{
                            color:`white`,
                            padding:8,
                            // margin:4,
                            borderRadius:4,
                            backgroundColor:currentView._id === view._id? selectedBlueColor : unselectedDarkBlueColor
                        }}
                    >
                        {view.labelName}
                    </Text>
                </TouchableHighlight>
            </View>
        </>
    );
}
 
export default ViewList;