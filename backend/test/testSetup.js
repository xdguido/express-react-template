/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* global beforeAll beforeEach afterEach afterAll */
const mongoose = require('mongoose');
const { seedDatabase } = require('./seeds/seeds');

const removeAllCollections = async () => {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection.deleteMany();
    }
};

const dropAllCollections = async () => {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        try {
            await collection.drop();
        } catch (error) {
            if (error.message === 'ns not found') return;
            if (error.message.includes('a background operation is currently running')) return;
            console.log(error.message);
        }
    }
};

module.exports = {
    setupDB(databaseName, runSaveMiddleware = false) {
        // Connect to Mongoose
        beforeAll(async () => {
            const url = `mongodb://127.0.0.1:27017/${databaseName}`;
            await mongoose.connect(url);
        });

        // Seeds database before each test
        beforeEach(async () => {
            await seedDatabase(runSaveMiddleware);
        });

        // Cleans up database between each test
        afterEach(async () => {
            await removeAllCollections();
        });

        // Disconnect Mongoose
        afterAll(async () => {
            await dropAllCollections();
            await mongoose.connection.close();
        });
    }
};
