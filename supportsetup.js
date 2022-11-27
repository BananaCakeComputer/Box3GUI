for(var x = 2;x<=6;x++){
    for(var z = 2;z<=10;z++){
        for(var y = 2;y<=5;y++){
            voxels.setVoxel(x,y,z);
        };
    };
};
for(var x = 3;x<=6;x++){
    for(var z = 2;z<=10;z++){
        voxels.setVoxel(x,1,z,'white');
        voxels.setVoxel(x,6,z,'white');
    };
};
for(var y = 2;y<=5;y++){
    voxels.setVoxel(2,y,1,'white_light');
    voxels.setVoxel(2,y,11,'white_light');
};
for(var z = 2;z<=10;z++){
    for(var y = 2;y<=5;y++){
        voxels.setVoxel(7,y,z,'white');
        voxels.setVoxel(1,y,z,'black');
    };
};
for(var z = 2;z<=10;z++){
    voxels.setVoxel(2,1,z,'white_light');
    voxels.setVoxel(2,6,z,'white_light');
}
for(var x = 3;x<=6;x++){;
    for(var y = 2;y<=5;y++){;
        voxels.setVoxel(x,y,1,'white');
        voxels.setVoxel(x,y,11,'white');
    };
};
