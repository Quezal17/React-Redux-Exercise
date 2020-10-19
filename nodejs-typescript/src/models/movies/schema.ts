import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    director: {type: String, required: true, unique: true}
});

export default mongoose.model('Movie', movieSchema);
