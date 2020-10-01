import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
import { createAdmin, createRoles } from "./libs/initialSetup";
import moviesroutes from "./routes/movies.routes";
import authroutes from "./routes/auth.routes";
import userroutes from "./routes/users.routes";


const app = express()
createRoles();
createAdmin();

//settings
app.set('pkg', pkg);


//middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    });
});


app.use('/movies', moviesroutes);
app.use('/auth', authroutes);
app.use('/users', userroutes);


export default app;




