class FeastTeam {
    constructor(username, psw, tname = '未命名团队', teampic = null, team_scale = null, team_price = null, business_license = null, address = null) {
        this.username = username;
        this.psw = psw;
        this.tname = tname;
        this.teampic = teampic;
        this.team_price = team_price;
        this.business_license = business_license;
        this.address = address;
    }
}

module.exports = { FeastTeam };