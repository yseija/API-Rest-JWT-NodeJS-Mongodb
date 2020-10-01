import {Router} from 'express'
const router = Router();

import * as moviescontroller from '../controllers/movies.controller';
import {authjwtoken} from "../middlewares";


router.post('/', [authjwtoken.verifyToken,authjwtoken.isModerator,authjwtoken.isAdmin], moviescontroller.createMovies)
router.get('/', moviescontroller.getMovies)
router.get('/:movieID', moviescontroller.getMoviesID)
router.put('/:movieID', [authjwtoken.verifyToken, authjwtoken.isModerator, authjwtoken.isAdmin], moviescontroller.updateMoviesID)
router.delete('/:movieID', [authjwtoken.verifyToken, authjwtoken.isAdmin], moviescontroller.deleteMoviesID)


export default router;
