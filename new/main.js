const spawning = require('new/spawning')
const runCreeps = require('new/runCreeps')
const firstTime = require('new/firstTime')


module.exports.loop = function () {
    // firstTime.run();
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        console.log("test");
        spawning.run(creep);
        runCreeps.run(creep);
    }
}


