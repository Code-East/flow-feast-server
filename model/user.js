class User {
    constructor(username, psw, nickname = '未命名用户', userpic = null, address = null) {
        this.username = username;
        this.psw = psw;
        this.nickname = nickname;
        this.userpic = userpic;
        this.address = address;
    }
}

module.exports = {
    User
};