import {spawningCreeps} from './spawning';
import {runRolesOfCreeps} from "./runCreeps";

module.exports = function () {
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];

        runRolesOfCreeps(creep)
        spawningCreeps(creep);
    }
}


