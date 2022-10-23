/* eslint-disable no-undef */
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../server');
const User = require('../models/User');

const request = supertest(app);
const { setupDB } = require('../test/testSetup');

const { JWT_PASS_SECRET } = process.env;

setupDB('endpoint-testing', true);

describe('Login Endpoint //POST', () => {
    it('Should Return Session Data', async () => {
        const res = await request.post('/api/auth/login').send({
            email: 'testing1@gmail.com',
            password: 'Mypass1234'
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('John');
        expect(res.body.email).toBe('testing1@gmail.com');
        expect(res.body.token).toBeTruthy();
    });
    it('Should throw error 400 status', async () => {
        const res = await request.post('/api/auth/login').send({
            email: 'testing_none@gmail.com',
            password: 'Mypass1234'
        });

        expect(res.statusCode).toBe(400);
    });
});

describe('Sign up Endpoint //POST', () => {
    it('Should save user to database', async () => {
        const res = await request.post('/api/auth/').send({
            name: 'Cacho',
            email: 'example@gmail.com',
            password: 'Mypass1234'
        });

        expect(res.statusCode).toBe(201);

        const user = await User.findOne({ email: 'example@gmail.com' });
        expect(user.name).toBeTruthy();
        expect(user.email).toBeTruthy();
    });
    it('Should throw error. Email already registered', async () => {
        const res = await request.post('/api/auth/').send({
            name: 'John',
            email: 'testing1@gmail.com',
            password: 'Mypass1234'
        });

        expect(res.statusCode).toBe(400);
    });
});

describe('Reset Password Endpoint //PUT', () => {
    it('Should Update User Password', async () => {
        const email = { email: 'testing1@gmail.com' };
        const newPassword = 'Newpass1234';

        const user = await User.findOne(email);
        const token = jwt.sign({ id: user._id }, JWT_PASS_SECRET, {
            expiresIn: '15m'
        });
        const res = await request.put('/api/auth/reset-password').send({
            token,
            password: newPassword
        });
        expect(res.statusCode).toBe(200);

        const updatedUser = await User.findOne(email);
        const isCorrectlyHashed = await updatedUser.verifyPassword(newPassword);
        expect(isCorrectlyHashed).toBe(true);
    });
});
