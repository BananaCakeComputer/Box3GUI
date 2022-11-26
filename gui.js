var guiSpace = {1:false ,2:false ,3:false ,4:false ,5:false}//玩家私有GUI房间字典
var guiBackground = 0
var guiPublicItems = {}
var guiPublicItemsNames = []
var publicIsPress = false;
class Box3GUI {
    constructor(entity){
        this.entity = entity
        if(entity!='world'){
            for(let i in guiSpace){
                if(!guiSpace[i]){
                    guiSpace[i] = entity.player.name
                    break
                }
            }
        }
    }
    enterPublicGUI(){
        if(this.entity=='world'){
            world.say('无法给世界使用GUI')
            return;
        }
        this.entity.guiBtnI = 0
        this.entity.isGuiMode = true;
        this.entity.guiSpace = 'public';
        this.entity.player.cameraMode = "fixed";
        this.entity.player.cameraPosition = new Box3Vector3(6.8, 4, 6.5)
        this.entity.player.cameraTarget = new Box3Vector3(1, 4, 6.5)
    }
    exitPublicGUI(){
        if(this.entity=='world'){
            world.say('无法给世界使用GUI')
            return;
        }
        this.entity.guiSpace = false;
        this.entity.isGuiMode = false;
        this.entity.player.cameraMode = "follow";
    }
    publicBackground(meshID){
        if(guiBackground == 0){
            guiBackground = world.createEntity({
                mesh: meshID,
                position:new Box3Vector3(2,4,6.5),
                meshScale:new Box3Vector3(0.065, 0.065, 0.065),
                collides:false,
                fixed:true,
                gravity:false,
            })
        }else{
            guiBackground.destroy()
            guiBackground = world.createEntity({
                mesh: meshID,
                position:new Box3Vector3(2.1,4,6.5),
                meshScale:new Box3Vector3(0.065, 0.065, 0.065),
                collides:false,
                fixed:true,
                gravity:false,
            })
        }
    }
    publicItemAdd(name, position, meshID, type){
        guiPublicItems[name] = [
            position,
            world.createEntity({
                mesh: meshID,
                position:new Box3Vector3(2.1,5-(position[1]/16),10-(position[0]/16)),
                meshScale:new Box3Vector3(0.065, 0.065, 0.065),
                collides:false,
                fixed:true,
                gravity:false,
            }),
            type
        ]
        guiPublicItemsNames.push(name)
    }
    publicItemDelete(name){
        guiPublicItems[name][1].destroy()
        delete guiPublicItems[name]
        for(var i = 0;i < guiPublicItemsNames.length;i++){
            if(guiPublicItemsNames[i] == name){
                delete guiPublicItemsNames[i]
                return
            }
        }
    }
    publicOnPress(button){
        for(let entity of world.querySelectorAll('player')){
            if(button === entity.buttonPress){
                return true
            }
        }
        return false
    }
    publicItemScale(item,x,y,z){
        guiPublicItems[item][1].meshScale = new Box3Vector3(x*0.065, y*0.065, z*0.065);
    }
    publicTint(color){
        for(var z = 3;z <= 9;z++){
            voxels.setVoxel(2,1,z,color+'_light');
            voxels.setVoxel(2,6,z,color+'_light');
        }
        for(var y = 2;y <= 5;y++){
            voxels.setVoxel(2,y,1,color+'_light');
            voxels.setVoxel(2,y,11,color+'_light');
        }
    }
}
world.gui = new Box3GUI('world')
world.onPlayerJoin(({entity})=>{
    entity.isGuiMode = false;
    entity.gui = new Box3GUI(entity)
    entity.guiSpace = false
    entity.buttonPress = false;
    entity.guiOnPressHasBeenFinish = false
    world.onTick(()=>{
        if(entity.guiSpace!='public'){
            return
        }
        if(entity.guiBtnI==0){
            entity.guiOnPressHasBeenFinish = false
            for(var i = entity.guiBtnI;i <= guiPublicItemsNames.length;i++){
                entity.guiBtnI += 1
                //console.log(guiPublicItems[guiPublicItemsNames[i]])
                if(guiPublicItems[guiPublicItemsNames[i]][2]==='btn'){
                    entity.guiOnPressHasBeenFinish = true
                    entity.guiBtnI -= 1
                    break
                }
            }
            if(!entity.guiOnPressHasBeenFinish){
                entity.guiBtnI = 0
            }
        }else{
            for(var i = 0;i <= (guiPublicItemsNames.length-1);i++){
                //console.log(guiPublicItems[guiPublicItemsNames[i]])
                guiPublicItems[guiPublicItemsNames[i]][1].meshColor = new Box3RGBAColor(1, 1, 1, 1)
            }
            if(!entity.buttonPress){
                guiPublicItems[guiPublicItemsNames[entity.guiBtnI]][1].meshColor = new Box3RGBAColor(1, 1, 0, 1)
            }else{
                guiPublicItems[guiPublicItemsNames[entity.guiBtnI]][1].meshColor = new Box3RGBAColor(0.7, 0.7, 0, 1)
            }
        }
    })
})
world.onPress(({button, entity})=>{
    if(entity.isGuiMode){
        if(button==='action0'){
            entity.guiOnPressHasBeenFinish = false
            for(var i = entity.guiBtnI;i < (guiPublicItemsNames.length - 1);i++){
                entity.guiBtnI += 1
                if(guiPublicItems[guiPublicItemsNames[i]][2]==='btn'){
                    entity.guiOnPressHasBeenFinish = true
                    break
                }
            }
            if(!entity.guiOnPressHasBeenFinish){
                entity.guiBtnI = 0
            }
        }else if(button==='action1'){
            entity.buttonPress = guiPublicItemsNames[entity.guiBtnI]
        }
    }
})
world.onRelease(({button, entity}) => {
    if(button == 'action1'){
        entity.buttonPress = false;
    }
})
