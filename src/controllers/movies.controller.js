import movies from "../models/movies";

// creating a movie
export const createMovies = async (req, res) => {
   const { name, director, year, genere, imgURL } = req.body;
   const newMovies = new movies({ name, director, year, genere, imgURL });
   const moviesSaved = await newMovies.save();
   res.status(201).json(moviesSaved);
};

//getting a movie
export const getMovies = async (req, res) => {
   const movie = await movies.find();
   res.json(movie);
};

//getting a movie by its ID
export const getMoviesID = async (req, res) => {
   const { movieID } = req.params;
   const movie = await movies.findById(movieID);
   res.status(200).json(movie);
};

//updating a movie by its ID
export const updateMoviesID = async (req, res) => {
   const movieUpdate = await movies.findByIdAndUpdate(req.params.movieID, req.body, { new: true, });
   res.status(204).json(movieUpdate);
};

//deleting a movie by its ID
export const deleteMoviesID = async (req, res) => {
   const { movieID } = req.params;
   await movies.findByIdAndDelete(movieID);
   res.status(204).json();
};