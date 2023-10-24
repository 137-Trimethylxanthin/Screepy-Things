/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.repairUnit');
 * mod.thing == 'a thing'; // true
 */
function findShortestPath(creep, sources) {
    var shortestPath = 100;
    var shortestPathIndex = 0;
    for (var i = 0; i < sources.length; i++) {
        var path = creep.pos.findPathTo(sources[i]);
        if (path.length < shortestPath) {
            shortestPath = path.length;
            shortestPathIndex = i;
        }
    }
    return shortestPathIndex;
}

function checkIfNeedRepair(creep) {
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_ROAD ||
                structure.structureType == STRUCTURE_CONTAINER ||
                structure.structureType == STRUCTURE_WALL ||
                structure.structureType == STRUCTURE_RAMPART) &&
                structure.hits < structure.hitsMax;
            }
    });
    return targets.length > 0;
}



var roleRepairUnit = {

    /** @param {Creep} creep **/
    run: function (creep) {
        
        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('🚧 repair');
        }

        if (creep.memory.repairing) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_ROAD ||
                        structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_WALL ||
                        structure.structureType == STRUCTURE_RAMPART) &&
                        structure.hits < structure.hitsMax;
                }
            });
            if (targets.length > 0) {
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        }
                    });
                }
            }
        }
        else if (Game.spawns['its my first time (UwU)'].room.energyAvailable >= 200) {
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN)
                }
            });
            if (sources.length > 0) {
                if (creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        }
                    });
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            var shortestPathIndex = findShortestPath(creep, sources);
            if (creep.harvest(sources[shortestPathIndex]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[shortestPathIndex], {
                    visualizePathStyle: {
                        stroke: '#ffaa00'
                    }
                });
            }
        }

    }
};

module.exports = roleRepairUnit;