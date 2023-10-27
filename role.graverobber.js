
function findFurthest(creep, sources) {
    var furthest = 0;
    var furthestIndex = 0;
    for (var i = 0; i < sources.length; i++) {
        var path = Game.spawns['Spawn1'].pos.findPathTo(sources[i]);
        if (path.length > furthest) {
            furthest = path.length;
            furthestIndex = i;
        }
    }
    return furthestIndex;
}


var roleGraverobber = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_TOMBSTONES);
            var furthestIndex = findFurthest(creep, sources);
            if (creep.harvest(sources[furthestIndex]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[furthestIndex], {
                    visualizePathStyle: {
                        stroke: '#ffaa00'
                    }
                });
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        
    }
};

module.exports = roleGraverobber;