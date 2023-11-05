const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 8080;

const homeroutes = require('./Routes/productRoute');
const contactroutes = require('./Routes/contactRoute');
const dashboarduser = require('./Routes/dashboarduserRoute')
const cookieParser = require('cookie-parser');
const userRouter = require('./Routes/userRoute');
const userProfile = require('./Routes/userProfileRoute');
const dashboardRoute = require('./Routes/dashboardRoute');
const shoppingRoute = require('./Routes/shoppingRoute');
const reactionRoute = require('./Routes/reactionRoute');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(cookieParser());

app.use('/', homeroutes);
app.use(contactroutes);
app.use(dashboarduser);
//mothana
app.use(userRouter);
app.use(userProfile);
//sanad
app.use(dashboardRoute)
app.use(shoppingRoute)
app.use(reactionRoute)


app.listen(port, ()=> {
    console.log(`server runnning in port ${port}`);
})


