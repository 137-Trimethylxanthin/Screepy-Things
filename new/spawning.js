const {
    Harvester,
    Upgrader,
    Builder,
    Repairer,
    WallRepairer,
    LongDistanceHarvester,
    Defender,
    GraveRobber
} = require('creepTypes');


const minSpawnEnergy = 200;
const spawnName = 'Spawn1';


const spawning = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (Game.spawns[spawnName].spawning) {
            let spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
            Game.spawns[spawnName].room.visual.text(
                '️🛠' + spawningCreep.memory.role,
                Game.spawns[spawnName].pos.x + 1,
                Game.spawns[spawnName].pos.y,
                { align: 'left', opacity: 0.8 });
        }
        else if(Game.spawns[spawnName].room.energyAvailable >= minSpawnEnergy) {
            let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
            if (harvesters.length < Harvester.max) {
                let newName = 'Harvester' + Game.time;
                console.log('Spawning new harvester: ' + newName);
                Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], newName,
                    { memory: { role: Harvester.memory } });
            } else {
                let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
                if (upgraders.length < Upgrader.max) {
                    let newName = 'Upgrader' + Game.time;
                    console.log('Spawning new upgrader: ' + newName);
                    Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], newName,
                        {memory: {role: Upgrader.memory}});
                } else {
                    let builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
                    if (builders.length < Builder.max) {
                        let newName = 'Builder' + Game.time;
                        console.log('Spawning new builder: ' + newName);
                        Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], newName,
                            {memory: {role: Builder.memory}});
                    } else {
                        let repairers = _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer');
                        if (repairers.length < Repairer.max) {
                            let newName = 'Repairer' + Game.time;
                            console.log('Spawning new repairer: ' + newName);
                            Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], newName,
                                {memory: {role: Repairer.memory}});
                        } else {
                            let wallRepairers = _.filter(Game.creeps, (creep) => creep.memory.role === 'wallRepairer');
                            if (wallRepairers.length < WallRepairer.max) {
                                let newName = 'WallRepairer' + Game.time;
                                console.log('Spawning new wall repairer: ' + newName);
                                Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], newName,
                                    {memory: {role: WallRepairer.memory}});
                            } else {
                                let longDistanceHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'longDistanceHarvester');
                                if (longDistanceHarvesters.length < LongDistanceHarvester.max) {
                                    let newName = 'LongDistanceHarvester' + Game.time;
                                    console.log('Spawning new long distance' +
                                        ' harvester: ' + newName);
                                    Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], newName,
                                        {memory: {role: LongDistanceHarvester.memory}});
                                } else{
                                    let defenders = _.filter(Game.creeps, (creep) => creep.memory.role === 'defender');
                                    if (defenders.length < Defender.max){
                                        let newName = 'Defender' + Game.time;
                                        console.log('Spawning new defender: ' + newName);
                                        Game.spawns[spawnName].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName,
                                            {memory: {role: Defender.memory}});
                                    } else {
                                        let graveRobbers = _.filter(Game.creeps, (creep) => creep.memory.role === 'graveRobber');
                                        if (graveRobbers.length < GraveRobber.max){
                                            let newName = 'GraveRobber' + Game.time;
                                            console.log('Spawning new graveRobber: ' + newName);
                                            Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], newName,
                                                {memory: {role: GraveRobber.memory}});
                                        } else {
                                            console.log('No new creeps to spawn All creeps are at max');
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        else {
            console.log('Not enough energy to spawn new creep');
        }
    }
}


module.exports = spawning;