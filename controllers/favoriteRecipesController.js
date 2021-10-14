import Account from '../models/accountSchema.js';
import Dish from '../models/dishSchema.js';

export async function getAllFavoriteRecipes(req, res) {

	try {
        
        const userId = req.verifiedAccount.tokenData.id;
		const { favoriteRecipes } = await Account.findOne({ _id: userId });

        const favoriteRecipesArr = await Dish.find({_id: {$in: [...favoriteRecipes] }}) 

		res.status(201).json({ success: true, favoriteRecipes: favoriteRecipesArr });
	} catch (err) {
		res.status(400).json({ success: false, message: err });
	}
}

export async function saveOneFavoriteRecipe(req, res) {

	try {

        const userId = req.verifiedAccount.tokenData.id;
        const recipeId = req.body.recipeId
		const activeAccount = await Account.findOne({ _id: userId });

        activeAccount.favoriteRecipes.push(recipeId)

        await activeAccount.save()

		res.status(201).json({ success: true });
	} catch (err) {
		res.status(400).json({ success: false, message: err });
	}
}


export async function deleteOneFavoriteRecipe(req, res) {

	try {

        const userId = req.verifiedAccount.tokenData.id;
        const recipeId = req.body.recipeId

		await Account.findOneAndUpdate({ _id: userId }, 
			{ $pull: { 'favoriteRecipes' : recipeId } });


		res.status(201).json({ success: true });
	} catch (err) {
		res.status(400).json({ success: false, message: err });
	}
}
