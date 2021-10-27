const User = require("../models/userModel");
const {
    updateUser
} = require("./userService");
const UserService = require("./userService");
// const {getUsers, getUserByEmail, createUser,updateUser, deleteUser, findIndexByEmail, validateEmail} = require("./userService");

// UserService.validateEmail = jest.fn();
// jest.mock('userService', () => jest.fn());

describe('UserService Test Case', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getUsers', () => {
        const val = UserService.getUsers()
        expect(val).toStrictEqual([])
    })

    test('getUsersByEmail', () => {
        const val = UserService.getUserByEmail('email@email.com')
        expect(val).toStrictEqual(undefined)
    })

    describe('ValidateEmail()', () => {
        test('Should validate correctly', () => {

            UserService.getUserByEmail('email@email.com')
            expect(UserService.validateEmail('email@email.com')).toStrictEqual('email@email.com')
        })
    })

    describe('createUser()', () => {
        test('should create correctly', () => {
            const user = {
                email: 'email@email.com',
                givenName: 'E',
                familyName: 'Mail'
            };

            const DateReal = global.Date;
            const mockDate = new Date("2020-11-01T00:00:00.000Z");
            const spy = jest
                .spyOn(global, 'Date')
                .mockImplementation((...args) => {
                    if (args.length) {
                        return new DateReal(...args);
                    }
                    return mockDate;
                });

            const response = new User({
                ...user,
                "created": mockDate
            }, 1);

            UserService.createUser(user);
            const result = UserService.getUsers();
            expect(result).toStrictEqual([response]);

            spy.mockRestore();
        })

        test('should throw error Email invalid', () => {
            const user = {
                email: 'email',
                givenName: 'E',
                familyName: 'Mail'
            };

            try {
                UserService.createUser(user)
            } catch (error) {
                expect(error).toStrictEqual({
                    status: 412,
                    message: 'Email invalid'
                });
            }
           
        })
    })
    describe('updateUser()', () => {
        test('Should update correctly', () => {
            const user = {
                email: 'email@email.com',
                givenName: 'E',
                familyName: 'Mail'
            };

            const DateReal = global.Date;
            const mockDate = new Date("2020-11-01T00:00:00.000Z");
            const spy = jest
                .spyOn(global, 'Date')
                .mockImplementation((...args) => {
                    if (args.length) {
                        return new DateReal(...args);
                    }
                    return mockDate;
                });

            const response = {
                ...user,
                "created": mockDate,
                "id": 1
            };

            UserService.updateUser('email@email.com', user);
            const result = UserService.getUsers();
            expect(result).toStrictEqual([response]);
        })
    })
})