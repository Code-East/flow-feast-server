const userRouter = require('../route/user');


exports.useRouter = (app) => {
    app.use('/user',userRouter);
}