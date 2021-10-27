const userService = require("../services/UserService");

userService.getUsers = jest.fn();

const {getUsers} = require("./controller");

describe('Controller Test Case', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe("getUsers()", () => {
        test('Should call without email ', async function () {
            const mockResult = [
                {
                    "id": 1,
                    "email": "g@gmail.com",
                    "givenName": "MARUCO",
                    "familyName": "Neves",
                    "created": "2021-08-19T20:00:33.948Z"
                }
            ];
            userService.getUsers.mockResolvedValue(mockResult);
            const {req , res} = defaultReqRes();
            await getUsers(req, res);
            expect(res.json).toHaveBeenCalled();
        })
    })
})

function defaultReqRes() {
    const req = {
        params:{},
        query:{},
        body:{}
    }

    const res = {
        json: jest.fn(),
        status: jest.fn()
    }
    return {req, res};
}