class FeastTeam {
    constructor(username, psw, tname = '未命名团队', teampic = 'http://www.lixiandong.top/feast/user_pic/default.jpg', team_scale = null, team_price = null, business_license = null, address = null) {
        this.username = username;
        this.psw = psw;
        this.tname = tname;
        this.teampic = teampic;
        this.team_price = team_price;
        this.business_license = business_license;
        this.address = address;
        this.create_time = new Date();
    }
}

module.exports = { FeastTeam };