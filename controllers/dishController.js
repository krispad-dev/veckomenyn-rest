import Dish from '../models/dishSchema.js';
import Account from '../models/accountSchema.js'
import cloudinary from 'cloudinary'






export async function addOneDish(req, res) {

	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});

	
	try {

		const userId = req.verifiedAccount.tokenData.id;

		const { recipeTitle, recipeDescription, recipeImage, recipeIngredients, recipeSteps,
			recipeDifficulty, recipeTags, recipetagline, recipeServing, recipeCookingTime, } = req.body;

		const uploadedResponse = await cloudinary.uploader.upload(recipeImage)

		const dish = await new Dish({

			title: recipeTitle,
			tagline: recipetagline,
 			description: recipeDescription,
			image: uploadedResponse.secure_url,
			ingredients: [...recipeIngredients],
			steps: recipeSteps,
			difficulty: recipeDifficulty,
			tags: recipeTags,
			portionSize: recipeServing,
			cookingTime: recipeCookingTime,
			author: userId,
		});

		await dish.save();

		res.status(201).json({
			success: true,
			message: `Dish added to list`,
		}); 
	} catch (err) {
		console.log(err);
	}
}

export async function getRecipes(req, res, next) {


	try {
		function paginateCalc(page) {
			return page * 10 * 2;
		}

		const queryString = req.query.string;
		let pageLimit = paginateCalc(parseInt(req.query.page));

		if (pageLimit < 20) pageLimit = 20;

		if (queryString !== undefined) {
			const recipes = await Dish.fuzzySearch(queryString).limit(pageLimit);

			res.status(200).json(recipes);
		} else {
			const recipes = await Dish.find().limit(pageLimit);

			res.status(200).json(recipes);
		}
	} catch (err) {
		next(err);
	}
}

export async function getOneRecipe(req, res, next) {
	try {
		const id = req.params.id;
		const oneDish = await Dish.findOne({ _id: id });
		res.json(oneDish);
	} catch (err) {
		next(err);
	}
}

export async function getRecipeAuthor(req, res, next) {
	try {
		const recipeId = req.body.recipeId;

		const foundRecipe = await Dish.findOne({ _id: recipeId })
		const authorData = await Account.findOne({ _id: foundRecipe.author })

		const { username, avatar } = authorData;

		res.status(200).json({ success: true, username: username, avatar: avatar }); 
	} catch (err) {
		next(err);
	}
}
