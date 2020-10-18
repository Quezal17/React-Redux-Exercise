import express, {IRouter, Request, Response} from 'express';
import {MovieController} from '../controllers/MovieController';

export class MovieRouter {
    private movieController: MovieController = new MovieController();

    public route(): IRouter {
        const router = express.Router();

        router.post('/movies', (req: Request, res: Response) => {
            this.movieController.createMovie(req, res);
        });

        router.get('/movies/:id', (req: Request, res: Response) => {
            this.movieController.getMovie(req, res);
        });

        router.put('/movies/:id', (req: Request, res: Response) => {
            this.movieController.updateMovie(req, res);
        });

        router.delete('/movies/:id', (req: Request, res: Response) => {
            this.movieController.deleteMovie(req, res);
        });

        return router;
    }
}