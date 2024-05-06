import { useContext, useEffect } from "react";
import { VrViewerContext } from "../..";
import { projectInfo } from "../../../../assets/json/projectInfo";
import { THREE, TextureLoader } from "expo-three";


const textureLoader = new TextureLoader()
const InitProject = () => {
    
    const {setCurrentView, selectedProject, setSelectedScene, setSelectedProject, setSelectedMap} = useContext(VrViewerContext)
    useEffect(()=>{
        const init = async()=>{
            // Get Project Info
            const newScenes = projectInfo.scenes.map((scene)=>{
                return {...scene,
                    viewList:scene.viewList.map((view)=>{
                        // if()
                        const parentFolder = "../../../../assets/images/views"
                        const targetFolder = `${parentFolder}/${view.imageUrl}`
                        const texture = textureLoader.load(view.imageUrl)
                        texture.magFilter = THREE.LinearFilter
                        texture.minFilter = THREE.LinearFilter
                        if(targetFolder){
                            return {...view,
                                texture: texture
                            }
                        }
                        else{
                            return view
                        }
                    })
                }
            })
            const newProject = {...projectInfo,
                scenes:newScenes
            }

            // Set Project
            setSelectedProject(newProject)

            // Set Scene
            setSelectedScene(newProject.scenes[0])

            // Set View
            setCurrentView(newProject.scenes[0].viewList[0])

            // Set Selected Map
            setSelectedMap(newProject.maps[0])
        }

        init()
    },[])
    
    return (  
        null
    );
}
 
export default InitProject;