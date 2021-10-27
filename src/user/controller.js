const userService = require("../services/UserService");

class UserController {

    static async getUsers(req, res) {
        const email = req.query.email;

            if (email) {
                const userFound = userService.getUserByEmail(email);
                if(!userFound){
                    res.status(404).json({
                        status: 404,
                        message: 'User not found'
                    });
                }
                res.json(userFound);
            } else {
                res.json(userService.getUsers());
            }

    }

    static async createUser(req, res) {
        try {
            userService.createUser(req.body);
            res.status(201).json();
        } catch (error) {
            res.status(error.status).json(error);
        }

    }

    static async updateUser(req, res) {
        const email = req.query.email;
        try {
            userService.updateUser(email, req.body);
            res.status(200).json();
        } catch (error) {
            res.status(200).json();
        }
    }

    static async deleteUser(req, res) {
        const email = req.query.email;
        try {
            userService.deleteUser(email);
            res.status(200).json();
        } catch (error) {
            res.status(error).json();
        }
    }

}

module.exports = UserController;