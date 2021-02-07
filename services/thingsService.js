const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

class ThingService {
    constructor() {
        this.dbFileName = 'things.json';
        this.init();
    }

    async init() {
        try {
            await fs.readFile(this.dbFileName);
            console.info(`Db with fileName: ${this.dbFileName} already exists`);
        } catch (error) {
            try {
                await fs.writeFile(this.dbFileName, JSON.stringify([]));
                console.info(`Db with fileName: ${this.dbFileName} was initialized`);
            } catch (error) {
                throw error;
            }
        }
    }

    async getAll() {
        try {
            const things = await fs.readFile(this.dbFileName);
            return JSON.parse(things);
        } catch (error) {
            console.log(`Error during getAll operation`);
            throw error;
        }
    }

    async getById(id) {
        try {
            const things = await this.getAll();
            const result = things.find(item => item.id === id);
            return result;

        } catch (error) {
            console.log(`Error during getById operation for id:${id}`);
            throw error;
        }
    }

    async create(thing) {
        try {
            const things = await this.getAll();

            thing.id = uuidv4();
            things.push(thing);

            await fs.writeFile(this.dbFileName, JSON.stringify(things));

            return thing.id;
        } catch (error) {
            console.log(`Error during create operation for id: ${thing.id} and entity ${JSON.stringify(thing)}`);
            throw error;
        }
    }

    async update(thing, id) {
        try {
            const thingsArray = await this.getAll();

            let foundItem = false;
            for (let i = 0; i < thingsArray.length; i++) {
                if (id === thingsArray[i].id) {
                    foundItem = true;
                    thingsArray[i] = thing;
                    thingsArray[i].id = id;
                    break;
                }

            }
            if (!foundItem) {
                return null;
            }

            await fs.writeFile(this.dbFileName, JSON.stringify(thingsArray));

            return thing;
        } catch (error) {
            console.log(`Error during create operation for id: ${thing.id} and entity ${JSON.stringify(thing)}`);
            throw error;
        }
    }

    async delete(id) {
        try {
            const thingsArray = await this.getAll();

            const index = thingsArray.findIndex(item => item.id === id);

            if (index < 0) {
                return null;
            }
            thingsArray.splice(index, 1);

            await fs.writeFile(this.dbFileName, JSON.stringify(thingsArray));

            return id;
        } catch (error) {
            console.log(`Error during create operation for id: ${thing.id} and entity ${JSON.stringify(thing)}`);
            throw error;
        }
    }
}


module.exports = ThingService;