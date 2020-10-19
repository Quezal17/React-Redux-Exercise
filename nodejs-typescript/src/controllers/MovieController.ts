import { Request, Response} from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../middlewares/responseMethods';
import {IMovie} from '../models/movies/interface'
import {MovieService} from '../models/movies/service'
import express from 'express';

export class MovieController {

    private movieService: MovieService = new MovieService();

    public createMovie(req: Request, res: Response) {
        const newMovie: IMovie = {
            title: req.body.title,
            director: req.body.director
        }
        this.movieService.createMovie(newMovie, (err: any, data: IMovie) => {
            if(err) mongoError(err, res);
            else successResponse('Movie created successfully', data, res);
        });
    }

    public getMovie(req: Request, res: Response) {
        if (req.params.id) {
            const movieFilter = { _id: req.params.id };
            this.movieService.filterMovie(movieFilter, (err: any, data: IMovie) => {
                if(err) mongoError(err, res);
                else if(data) successResponse('Get movie successful', data, res);
                else failureResponse('Movie not found', null, res);
            });
        } else {
            insufficientParameters(res);
        }
    }

    public updateMovie(req: Request, res: Response) {
        if (req.params.id) {
            const movieFilter = { _id: req.params.id };
            this.movieService.filterMovie(movieFilter, (err: any, data: IMovie) => {
                if(err) mongoError(err, res);
                else if(data) {
                    const updatedMovie: IMovie = {
                        title: req.body.title,
                        director: req.body.director
                    }
                    this.movieService.updateMovie(updatedMovie, (err: any) => {
                        if(err) mongoError(err, res);
                        else successResponse('Updated movie successfully', updatedMovie, res);
                    });
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public deleteMovie(req: Request, res: Response) {
        if (req.params.id) {
            const movieFilter = { _id: req.params.id };
            this.movieService.filterMovie(movieFilter, (err: any, data: IMovie) => {
                if(err) mongoError(err, res);
                else if(data) {
                    this.movieService.deleteMovie(req.params.id, (err: any) => {
                        if(err) mongoError(err, res);
                        else successResponse('Deleted movie successfully', null, res);
                    });
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}