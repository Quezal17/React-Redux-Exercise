import {IMovie} from './interface';
import Movie from './schema';

export class MovieService {
    
    public createMovie(movie_params: IMovie, callback: any) {
        const _session = new Movie(movie_params);
        _session.save(callback);
    }

    public filterMovie(query: any, callback: any) {
        Movie.findOne(query, callback);
    }

    public updateMovie(movie_params: IMovie, callback: any) {
        const query = { _id: movie_params._id };
        Movie.findOneAndUpdate(query, movie_params, callback);
    }
    
    public deleteMovie(_id: String, callback: any) {
        const query = { _id: _id };
        Movie.deleteOne(query, callback);
    }

}
