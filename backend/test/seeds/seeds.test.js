/* globals expect it */
const User = require('../../models/User');
const { setupDB } = require('../testSetup');

setupDB('seed-test', true);

it('Seeding test', async () => {
    const users = await User.find({});
    expect(users.length).toBe(3);

    const firstUser = users[0];
    const isCorrectlyHashed = await firstUser.verifyPassword('Mypass1234');
    expect(isCorrectlyHashed).toBe(true);
});
