/* eslint-disable no-undef */
const { isValidEmail, isValidPassword, isValidName } = require('./userValidator');

const testEmails = [
    ['example@mail.com', true],
    ['my.example@g.mail.com', true],
    ['example@you.me.com', true],
    ['mysite.example.com', false],
    ['mysite@.com.my', false],
    ['@you.me.net', false],
    ['mysite123@gmail.b', false],
    ['mysite@.org.org', false],
    ['.mysite@mysite.org', false],
    ['mysite()*@gmail.com', false],
    ['mysite..1234@yahoo.com ', false]
];

const testPasswords = [
    ['Mypass1234', true],
    ['mypass1234', false],
    ['MYPASS1234', false],
    ['Mypassword', false],
    ['My12345', false],
    ['Mypassdasdasdasd123133131', false],
    ['My pass1234', false]
];

const testNames = [
    ['John', true],
    ['example', true],
    ['GOD', true],
    ['Guido Gennari', true],
    ['Ali', true],
    ['Ai', false],
    ['Ai()', false],
    ['best_name', false],
    ['John123', false]
];

describe('(Email Validation)', () => {
    test.each(testEmails)('%j is a valid email direction', (fixture, result) =>
        expect(isValidEmail(fixture)).toBe(result)
    );
});

describe('(Password Validation)', () => {
    test.each(testPasswords)('%j is a valid password', (fixture, result) =>
        expect(isValidPassword(fixture)).toBe(result)
    );
});

describe('(Name Validation)', () => {
    test.each(testNames)('%j is a valid name', (fixture, result) =>
        expect(isValidName(fixture)).toBe(result)
    );
});
