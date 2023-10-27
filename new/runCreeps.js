const roleHarvester = require('new/role.harvester');



const runCreeps = {
    /** @param {Creep} creep **/
    run: function (creep){
        const role = creep.memory.role;
        switch (role){
            case 'harvester':
                roleHarvester.run(creep);
                  break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            case 'repairer':
                roleRepairer.run(creep);
                break;
            case 'wallRepairer':
                roleWallRepairer.run(creep);
                break;
            case 'longDistanceHarvester':
                roleLongDistanceHarvester.run(creep);
                break;
            case 'defender':
                roleDefender.run(creep);
                break;
            case 'graveRobber':
                roleGraveRobber.run(creep);
                break;

        }
    }
}


module.exports = runCreeps;