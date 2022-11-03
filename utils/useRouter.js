const userRouter = require('../route/user');
const indexRouter = require('../route/index');
const feastRouter =require('../route/feast');

exports.useRouter = (app) => {
    app.use('/user',userRouter);
    app.use('/index',indexRouter);
    app.use('/feast',feastRouter);
}