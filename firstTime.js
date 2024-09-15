

const firstTime = {


    run: function() {
        const spawnName = 'Spawn1';
        console.log("Welcome to my New Room, I hope you like it!");
        console.log("starting to spawn the first creep")
        //Game.spawns[spawnName].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1' , { memory: { role: 'harvester' } } );
        console.log("first creep spawned")
        console.log("starting to search and index sources")
        const sources = Game.spawns[spawnName].room.find(FIND_SOURCES);
        console.log("sources found")
        console.log("ranking sources")
        const distances = [];
        const sourcesId = [];
        for (let i = 0; i < sources.length; i++) {
            distances.push(Game.spawns[spawnName].pos.findPathTo(sources[i]).length);
            sourcesId.push(i);
            console.log("source " + i + " distance: " + distances[i] + ".")

        }
        console.log("sources saved...")
        console.log("starting to sort sources via distance")

        for (let i = 0; i < sources.length; i++) {
            for (let j = 0; j < sources.length; j++) {
                if (distances[i] < distances[j]) {
                    const temp = distances[i];
                    distances[i] = distances[j];
                    distances[j] = temp;
                    const temp2 = sourcesId[i];
                    sourcesId[i] = sourcesId[j];
                    sourcesId[j] = temp2;
                }
            }
        }
        console.log("sources sorted")
        console.log("saving index of sources")
        Memory.sources = sourcesId;
        console.log("index saved")
        console.log("done...")

        if (Game.spawns['Spawn1'].room.energyAvailable >= 200) {
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            if (harvesters.length < 3) {
                var newName = 'Harvester' + Game.time;
                console.log('Spawning new harvester: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                    {memory: {role: 'harvester'}});
            }
        }

    }
}

module.exports = firstTime;