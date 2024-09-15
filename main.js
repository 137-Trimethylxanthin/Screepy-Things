var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairUnit = require('role.repairUnit');
var roleFharvester = require('role.furthestHarvester');
var roleGraverobber = require('role.graverobber');
const firstTime = require('firstTime');

module.exports.loop = function () {
    //firstTime.run();



    for(var name in Game.creeps) {
        //clean memory
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
            break;
        }

        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'repairUnit') {
            roleRepairUnit.run(creep);
        }
        if (creep.memory.role == 'Fharvester') {
            roleFharvester.run(creep);
        }
        if (creep.memory.role == 'graverobber') {
            roleGraverobber.run(creep);
        }
        //spawn if less than 2 harvesters
        if (Game.spawns['Spawn1'].room.energyAvailable >= 200) {
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            if (harvesters.length < 3) {
                var newName = 'Harvester' + Game.time;
                console.log('Spawning new harvester: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                    {memory: {role: 'harvester'}});
            } else {
                //spawn if less than 2 upgraders
                var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
                if (upgraders.length < 4) {
                    var newName = 'Upgrader' + Game.time;
                    console.log('Spawning new upgrader: ' + newName);
                    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                        {memory: {role: 'upgrader'}});
                } else {
                    //spawn if less than 2 builders
                    
                    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
                    if (builders.length < 2) {
                        var newName = 'Builder' + Game.time;
                        console.log('Spawning new builder: ' + newName);
                        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                            {memory: {role: 'builder'}});
                    } else {
                    //spawn if less than 1 repair units
                    
                        var repairUnits = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairUnit');
                        if (repairUnits.length < 1) {
                            var newName = 'Repair Unit' + Game.time;
                            console.log('Spawning new repair unit: ' + newName);
                            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                                {memory: {role: 'repairUnit'}});
                        } else {
                                    
                            var Fharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'Fharvester');
                            if (Fharvesters.length < 4) {
                                var newName = 'Fharvester' + Game.time;
                                console.log('Spawning new furthest harvester: ' + newName);
                                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                                    {memory: {role: 'Fharvester'}});
                            } else {
                                /*
                                if (Game.spawns['Spawn1'].room.energyAvailable >= 200) {
                                    var graverobbers = _.filter(Game.creeps, (creep) => creep.memory.role == 'graverobber');
                                    if (graverobbers.length < 1) {
                                        var newName = 'Graverobber' + Game.time;
                                        console.log('Spawning new graverobber: ' + newName);
                                        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                                            {memory: {role: 'graverobber'}});
                                    }
                                }
                                    */
                            }
                        }
                            
                    }
                }
            }

        }
    }

    
}