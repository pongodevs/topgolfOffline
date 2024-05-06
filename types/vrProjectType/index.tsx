import {THREE} from 'expo-three'

export type PointType ={
    x:number,
    y:number,
    z:number
}
export type PointsType = {
    _id:string,
    point1:PointType,
    point2:PointType
}


export const pointsObject:PointsType    = {
    _id:'',
    point1:{
        x:0,
        y:0,
        z:0,
    },
    point2:{
        x:0,
        y:0,
        z:0,
    },
}

export type MeasurementStateType = {
    points:PointsType,
    phase:number,
    indexSelection:number
}

export const measurementStateObject:MeasurementStateType = {
    points:pointsObject,
    phase:0,
    indexSelection:0
}

export type MeasurementType = PointsType[]

export const measurementObject = {
    point1:{
        x:0,
        y:0,
        z:0
    },
    point2:{
        x:0,
        y:0,
        z:0
    },
}

export type PlayerType = {
    isTeleport: boolean,
    canTeleport: boolean,
    canTurnOnTv: boolean,
    isZooming: boolean,
    isMoving: boolean,
    doResetPosition: boolean,
    isViewTransition: boolean,
}
export const playerObject:PlayerType = {
    isTeleport: false,
    canTeleport: true,
    canTurnOnTv: true,
    isZooming: false,
    isMoving: false,
    doResetPosition: false,
    isViewTransition: false
}

export type TouchesType = {
    startDistance:number,
    distance: number,
    movement: number,
    direction:'initial' | 'zoom-in' | 'zoom-out',
    finger:{
        startLocation:any,
        location:any,
        endLocation:any,
    }[],
    lastTouch:number,

}
export const touchesObject:TouchesType ={
    startDistance:0,
    distance: 0,
    movement: 0,
    direction:'initial',
    finger:[
        {
            startLocation:new THREE.Vector2(),
            location:new THREE.Vector2(),
            endLocation:new THREE.Vector2(),
        },
        {
            startLocation:new THREE.Vector2(),
            location:new THREE.Vector2(),
            endLocation:new THREE.Vector2(),
        },
    ],
    lastTouch:0,
}

export type PointerType = {
    position2d: any,
    position3d: any,
    normal: any,
    distance: number,
}

export const pointerObject:PointerType = {
    position2d: new THREE.Vector2(),
    position3d: new THREE.Vector3(),
    normal: new THREE.Vector3(),
    distance: 0,
}
export type MovementType = {
    value:{
        forward: number,
        backward: number,
        right: number,
        left: number
    },
    axis:{
        x:number,
        y:number,
        z:number
    }
    pressed:{
        forward: boolean,
        backward: boolean,
        right: boolean,
        left: boolean
    },
    interval:{
        forward: any,
        backward: any,
        right: any,
        left: any,
    },
    isHitObject: boolean,
}
export const movementObject:MovementType = {
    value:{
        forward: 0,
        backward: 0,
        right: 0,
        left: 0
    },
    axis:{
        x:0,
        y:0,
        z:0
    },
    pressed:{
        forward: false,
        backward: false,
        right: false,
        left: false
    },
    interval:{
        forward: null,
        backward: null,
        right: null,
        left: null,
        
    },
    isHitObject: false,
}

export type TouchType = {
    isTouchStart:boolean,
    location: THREE.Vector2
    movement: THREE.Vector2,
}

export const touchObject:TouchType = {
    isTouchStart: false,
    location: new THREE.Vector2(),
    movement: new THREE.Vector2(),
}

export type PinpointType = {
    _id:string,
    labelName:string,
    position:{
        x:number,
        y:number,
        z:number
    },
    redirectUrl:string,
    thumbnailUrl:string,
    toViewId:string,
    customPinpointId:string
}

export const pinpointObject:PinpointType = {
    _id:'',
    labelName:'',
    position:{
        x:0,
        y:0,
        z:0
    },
    redirectUrl:'',
    thumbnailUrl:'',
    toViewId:'',
    customPinpointId:''
}

export type ViewListType = {
    _id:string,
    imageUrl:string,
    imageUrl4000:string,
    imageUrl6000:string,
    position:{
        x:number,
        y:number,
        z:number
    },
    viewName:string,
    texture:any,
    thumbnailUrl:string,
    labelName:string,
    redirectUrl:string,
    rotation:number,
    pinpoints:PinpointType[],
    mapId:string,
    fov:number,
    lensflare:{
        position:{
            x:number,
            y:number,
            z:number
        }
    }
}

export const viewListObject:ViewListType = {
    _id:'',
    imageUrl:'',
    imageUrl4000:'',
    imageUrl6000:'',
    position:{
        x:0,
        y:0,
        z:0
    },
    viewName:'',
    texture:'',
    thumbnailUrl:'',
    labelName:'',
    redirectUrl:'',
    rotation:0,
    pinpoints:[pinpointObject],
    mapId:'',
    fov:0,
    lensflare:{
        position:{
            x:0,
            y:0,
            z:0
        }
    }
}
export type SceneType = {
    _id:string,
    sceneName:string,
    type:'primary' | 'secondary',
    viewList: ViewListType[],
}

export const sceneObject:SceneType= {
    _id:'',
    sceneName:'',
    type:'secondary',
    viewList:[],
}

export type MapType = {
    _id:string,
    mapName:string,
    imageUrl:string,
    pinpoints:PinpointType[],
    showViewfinder:boolean,
    sizePercentage:number
}
export const mapObject:MapType = {
    _id:'',
    mapName:'',
    imageUrl:'',
    pinpoints:[],
    showViewfinder:true,
    sizePercentage:100
}

export type CustomPinpointType = {
    _id:string,
    label:string,
    is3d:boolean,
    imageUrl:string,
    showThumbnail:boolean,
    thumbnailSize:number,
    thumbnailYPosition:number,
    thumbnailXPosition:number,
    sizePercentage:number
}
export const customPinpointObject:CustomPinpointType = {
    _id:'',
    label:'',
    is3d:false,
    imageUrl:'',
    showThumbnail:true,
    thumbnailSize:100,
    thumbnailXPosition:0,
    thumbnailYPosition:1,
    sizePercentage:100
}

export type InfoPinpointType={
    _id:string,
    position:{
        x:number,
        y:number,
        z:number
    },
    imageUrl:string,
    description:string,
}

export const infoPinpointObject = {
    _id:'',
    position:{
        x:0,
        y:0,
        z:0
    },
    imageUrl:'',
    description:'', 
}

export type SpatialAudioType = {
    _id:string,
    audioName:string,
    position:{
        x:number,
        y:number,
        z:number
    },
    source:string,
    refDistance:number,
    maxDistance:number,
    volume:number
}

export const spatialAudioObject:SpatialAudioType = {
    _id:'',
    audioName:'',
    position:{
        x:0,
        y:0,
        z:0
    },
    source:'',
    refDistance:0,
    maxDistance:0,
    volume:1,
}
export type VrProjectType={
    _id:string,
    email:string,
    glbUrl:string,
    projectThumbnail:string,
    dateCreated:number,
    projectName:string,
    creatorId:string,
    scenes:SceneType[],
    maps:MapType[],
    customPinpoints:CustomPinpointType[],
    isPublished:boolean,
    infoPinpoints:{
        isShow:boolean,
        pinpoints:InfoPinpointType[]
    },
    spatialAudio:{
        enable:boolean,
        volume:number,
        audios:SpatialAudioType[]
    },
    globalSettings:{
        customUi:'default' | 'topgolf',
        transition:{
            style:'zoom-in' | 'fade' | 'parallax',
            duration:number,
            enableZoomTransition:boolean,
        },
        teleportation:{
            isShow:boolean,
            minOpacity:number,
            maxOpacity:number,
        },
        music:{
            enable:boolean,
            url:string,
            label:string,
            volume:number,
        },
        map:{
            widthPercentage:number,
        },
        navigation:{
            onlyShownAsPerMap:boolean
        },
        camera:{
            enableZoom:boolean,

        },
        autoplay:{
            isPlay:boolean,
            timeout:number,
            speed:number,
            flipFlop:boolean 
        },
        loading:{
            autoLoad:boolean
        },
        instruction:{
            showInstruction:boolean
        },
        showLabel:{
            mapPinpoint:'hover'| 'on' | 'off',
            viewportPinpoint:'hover'| 'on' | 'off',
            imageNavigation:'hover'| 'on' | 'off'
        },
        logo:{
            showLogo:boolean,
            logoUrl:string,
            sizePercentage:number,
        },
        colorCorrection:{
            enable:boolean,
            contrast:number,
            saturation:number,
            brightness:number,
        },
        dollHouse:{
            enable:boolean,
            sectionHeight:number
        },
        measurement:{
            enable:boolean,
        }
    },
    info:{
        label:string,
        text:string
    },
    editStatus:{
        editedBy:string,
        loginIp:string
    },
    type:'not-set' | 'static' | 'dynamic',
}



export const vrProjectObject:VrProjectType= {
    _id:'',
    email:'',
    glbUrl:'',
    projectThumbnail:'',
    dateCreated:0,
    projectName:'',
    creatorId:'',
    scenes:[],
    maps:[],
    isPublished:false,
    infoPinpoints:{
        isShow:false,
        pinpoints:[]
    },
    spatialAudio:{
        enable:false,
        volume:100,
        audios:[]
    },
    globalSettings:{
        customUi:'default',
        transition:{
            style:'fade',
            duration:1,
            enableZoomTransition:false,
        },
        teleportation:{
            isShow:true,
            minOpacity:0.2,
            maxOpacity:1,
        },
        music:{
            enable:false,
            url:'',
            label:'',
            volume:100,
        },
        map:{
            widthPercentage:100
        },
        navigation:{
            onlyShownAsPerMap:false,
        },
        autoplay:{
            flipFlop:false,
            isPlay:false,
            speed:100,
            timeout:5,
        },
        camera:{
            enableZoom:false
        },
        loading:{
            autoLoad:false
        },
        instruction:{
            showInstruction:false
        },
        showLabel:{
            mapPinpoint:'hover',
            viewportPinpoint:'hover',
            imageNavigation:'hover'
        },
        logo:{
            showLogo:false,
            logoUrl:'',
            sizePercentage:100
        },
        colorCorrection:{
            enable:false,
            contrast:100,
            saturation:100,
            brightness:100,
        },
        dollHouse:{
            enable:true,
            sectionHeight:0
        },
        measurement:{
            enable:true,
        }
    },
    info:{
        label:'',
        text:''
    },
    customPinpoints:[],
    editStatus:{
        editedBy:'',
        loginIp:''
    },
    type:'not-set',
}