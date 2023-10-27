const spawnName = 'Spawn1';

const roleUpgrader = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.upgrading && creep.store.energy === 0) {
            creep.memory.upgrading = false;
            creep.say('🐝 gather');
        }
        if (!creep.memory.upgrading && creep.store.energy === creep.store.getCapacity()) {
            creep.memory.upgrading = true;
            creep.memory.mining = false;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
                creep.say('⚡ upgrade');
            }

        }
        else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION ||
                        structure.structureType === STRUCTURE_SPAWN ||
                        structure.structureType === STRUCTURE_TOWER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) >= 100;
                }
            });
            if (targets.length > 0 && !creep.memory.mining) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    creep.say('🚚 transfer');
                }

            }else if (targets.length === 0 || creep.memory.mining ) {
                creep.memory.mining = true;
                const sources = creep.room.find(FIND_SOURCES);
                const finalSource = sources[Game.spawns[spawnName].memory.sources[0]];
                if (creep.harvest(finalSource) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(finalSource);
                    creep.say('⛏ harvest');
                }
            }

        }
    }
}