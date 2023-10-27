/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
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


var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else if (Game.spawns['Spawn1'].room.energyAvailable >= 200) {
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN)
                }
            });
            if (sources.length > 0) {
                if (creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            var shortestPathIndex = findShortestPath(creep, sources);
            if (creep.harvest(sources[shortestPathIndex]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[shortestPathIndex], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
	}
};

module.exports = roleUpgrader;