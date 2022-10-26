exports.getHeadList = (req, res) => {
    const userinfo = req.auth;
    let headerList;
    if (userinfo.userType === '0') {
        headerList = [
            { path: '/index/feast_list', name: '首页', icon: 'House' },
            { path: '/index/chat', name: '联系', icon: 'ChatSquare' },
            { path: '/index/public_feast', name: '发布宴席', icon: 'Dish' },
            { path: '/index/personal', name: '个人中心', icon: 'User' },
        ]
    } else if (userinfo.userType === '1') {
        headerList = [
            { path: '/index/feast', name: '首页', icon: 'House' },
            { path: '/index/chat', name: '联系', icon: 'ChatSquare' },
            { path: '/feast_team_admin', name: '团队管理', icon: 'User' },
        ]
    } else {
        return res.err('用户类型有误！');
    }
    res.send({
        code: 0,
        data:headerList,
        message: 'success'
    })
}