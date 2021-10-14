import { 

    addOneDish, 
    getRecipes, 
    getOneRecipe, 
    getRecipeAuthor 

} from '../controllers/dishController.js';

import {

	createAccount,
	getAllAccounts,
	loginAccount,
	authAccount,
	logoutAccount,
	saveRecipe,
	getSavedRecipes,
	deleteRecipe,

} from '../controllers/accountController.js';

import {

	getAllFavoriteRecipes,
	saveOneFavoriteRecipe,
	deleteOneFavoriteRecipe,

} from '../controllers/favoriteRecipesController.js';

import { getComments, createComment } from '../controllers/commentsControler.js';
import { verifyToken } from '../middleware/verifyToken.js';

import express from 'express';

export const dishesRouter = express.Router();
export const accountsRouter = express.Router();

dishesRouter.get('/recipes', getRecipes);
dishesRouter.post('/recipes/author', getRecipeAuthor);
dishesRouter.get('/recipes/1/:id', getOneRecipe);
dishesRouter.get('/recipes/comments/:id', getComments);
dishesRouter.post('/recipes/comments', verifyToken, createComment);
dishesRouter.post('/recipes', verifyToken, addOneDish);

accountsRouter.get('/accounts', getAllAccounts);
accountsRouter.post('/accounts', createAccount);

accountsRouter.post('/accounts/recipes', verifyToken, saveRecipe);
accountsRouter.delete('/accounts/recipes', verifyToken, deleteRecipe);
accountsRouter.get('/accounts/recipes', verifyToken, getSavedRecipes);

accountsRouter.get('/accounts/recipes/favorites', verifyToken, getAllFavoriteRecipes);
accountsRouter.post('/accounts/recipes/favorites', verifyToken, saveOneFavoriteRecipe);
accountsRouter.delete('/accounts/recipes/favorites', verifyToken, deleteOneFavoriteRecipe);

accountsRouter.post('/accounts/login', loginAccount);
accountsRouter.post('/accounts/logout', verifyToken, logoutAccount);
accountsRouter.post('/accounts/auth', verifyToken, authAccount);
