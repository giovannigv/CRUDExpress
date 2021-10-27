class User {

    id;
    email;
    givenName;
    familyName;
    created;

    constructor(user = {}, id) {
        this.id = id;
        this.email = user.email;
        this.givenName = user.givenName || '';
        this.familyName = user.familyName || '';
        this.created = new Date();
    }

}
module.exports = User;