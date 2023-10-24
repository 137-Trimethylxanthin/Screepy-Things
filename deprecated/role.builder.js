

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

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
            creep.say('🚧 build');
	    }

        if (creep.memory.building)
        {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
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

module.exports = roleBuilder;