const User = require('../models/userModel');

let usersCreated = [];

class UserService {

    static getUsers() {
        return usersCreated;
    }

    static getUserByEmail(email) {
        return usersCreated.find(user => user.email === email);
    }

    static createUser(user) {
        const userId = usersCreated.length + 1;
        
        user.email = this.validateEmail(user.email);
        usersCreated.push(new User(user, userId));
    }

    static updateUser(email, newUser) {
        const userIndex = this.findIndexByEmail(email);
        usersCreated[userIndex] = {
            ...usersCreated[userIndex],
            email: newUser.email || usersCreated[userIndex].email,
            givenName: newUser.givenName || usersCreated[userIndex].givenName,
            familyName: newUser.familyName || usersCreated[userIndex].familyName
        };
    }

    static deleteUser(email) {
        const userIndex = this.findIndexByEmail(email);
        usersCreated.splice(userIndex, 1);
    }

    static findIndexByEmail(email) {
        const userIndex = usersCreated.findIndex(user => user.email === email);
        if (userIndex < 0) {
            throw "404";
        }
        return userIndex;
    }

    static validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (this.getUserByEmail(email)) {
            throw {
                status: 409,
                message: 'User already created'
            };
        } else if (!re.test(String(email).toLowerCase())) {
            throw {
                status: 412,
                message: 'Email invalid'
            };
        }
        return email;
    }

}

module.exports = UserService;