const userRouter = require('../route/user');
const indexRouter = require('../route/index');
const feastRouter =require('../route/feast');
const teamRouter = require('../route/team')

exports.useRouter = (app) => {
    app.use('/user',userRouter);
    app.use('/index',indexRouter);
    app.use('/feast',feastRouter);
    app.use('/team',teamRouter);
}