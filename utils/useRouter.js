const userRouter = require('../route/user');
const indexRouter = require('../route/index');

exports.useRouter = (app) => {
    app.use('/user',userRouter);
    app.use('/index',indexRouter);
}