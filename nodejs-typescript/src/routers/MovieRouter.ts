import express, {IRouter, Request, Response} from 'express';
import {MovieController} from '../controllers/MovieController';
import {checkInput} from '../middlewares/inputValidation';
import {check} from 'express-validator';

export class MovieRouter {
    private movieController: MovieController = new MovieController();

    public route(): IRouter {
        const router = express.Router();

        router.post('/movies', [
            check('title')
            .isString().isLength({min: 4, max: 20}).withMessage('Movie name must be 4 chars long at least')
        ], checkInput, (req: Request, res: Response) => {
            this.movieController.createMovie(req, res);
        });

        router.get('/movies/:id', (req: Request, res: Response) => {
            this.movieController.getMovie(req, res);
        });

        router.put('/movies/:id', [
            check('title')
            .isString().isLength({min: 4, max: 20}).withMessage('Movie name must be 4 chars long at least')
        ], checkInput, (req: Request, res: Response) => {
            this.movieController.updateMovie(req, res);
        });

        router.delete('/movies/:id', (req: Request, res: Response) => {
            this.movieController.deleteMovie(req, res);
        });

        return router;
    }
}