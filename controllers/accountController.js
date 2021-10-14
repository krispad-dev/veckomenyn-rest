import Account from '../models/accountSchema.js';
import Dish from '../models/dishSchema.js';
import jwt from 'jsonwebtoken';
import { hashPassword, compareHashed } from '../utils/helpers.js';

export async function createAccount(req, res) {
	
	try {

		const { username, password, firstname, lastname, email, avatar, role } = req.body;

		const newAccount = await new Account({
			username: username,
			avatar: avatar,
			password: await hashPassword(password),
			firstname: firstname,
			lastname: lastname,
			email: email,
			role: role,
			favoriteRecipes: [],

			savedRecipes: {

				monday: [],
				tuesday: [],
				wednesday: [],
				thursday: [],
				friday: [],
				saturday: [],
				sunday: [] 

			}
		});

		await newAccount.save();
		res.status(201).json({ success: true, message: 'Account successfully created' });
	} catch (err) {
		res.status(400).json({ success: false, message: err });
	}
}

export async function getAllAccounts(req, res) {

	try {

		const allAccounts = await Account.find();
		res.status(201).json({ success: true, allAccounts });
	} catch (err) {
		res.status(400).json({ success: false, message: err });
	}
}

export async function loginAccount(req, res) {

	try {

		const { username, password } = req.body;

		const account = await Account.findOne({ username: username });
		if (!account) throw new Error('Username does not exist');

		const passwordHash = account.password;
		const isAMatch = await compareHashed(password, passwordHash);
		if (!isAMatch) throw new Error('Wrong password');

		const { _id, role, initials } = account;

		const authToken = jwt.sign(

			{
				username: username,
				id: _id,
				role: role,
				initials: initials,
			},

			process.env.SECRET_KEY, { expiresIn: '1h' }

		);

		res.cookie('authToken', authToken, { sameSite: 'Strict', httpOnly: true }).json({ success: true });
	} catch (err) {
		res.status(400).json({ success: false, message: err });
	}
}

export async function logoutAccount(req, res) {

	try {

		res.clearCookie('authToken').json({ success: true, message: 'Cookie removed' });
	} catch (err) {
		res.status(400).json({ success: false, message: err });
	}
}

export async function authAccount(req, res) {

	try {

		const { id } = req.verifiedAccount.tokenData;
		const accountInfo = await Account.findById(id);

		const { firstname, lastname, username, email, role, avatar, savedRecipes } = accountInfo;

		const accountData = { firstname, lastname, username, email, role, avatar, savedRecipes };
		const currentUser = { loggedIn: true, message: 'Authorized', ...accountData };

		res.status(200).json({ ...currentUser });
	} catch (err) {
		res.status(400).json({ success: false, message: err });
	}
}


export async function updateAccount() {

	try {
		
		const fieldsToUpdate = req.body;
		const { passwordInput, newPassword, newPasswordRepeat } = fieldsToUpdate;

		const { id } = req.verifiedAccount.tokenData;

		const account =  await Account.findOne({ _id: id }) 


		const passwordIsAMatch = await compareHashed(passwordInput, account.password)

	/* 	if (!passwordIsAMatch) throw new Error('Invalid password')

		if (!newPassword || !newPassword === newPasswordRepeat ) {

			throw new Error('Password does not match')

		} */

		const accountToUpdate = await Account.findOneAndUpdate(

			
			{_id: id }, 

			{
				username: fieldsToUpdate.username ? fieldsToUpdate.username : account.username,
				avatar: fieldsToUpdate.avatar ? fieldsToUpdate.avatar : account.avatar,
/* 				password: hashPassword() */
			}
			
			)

		res.status(200).json({ success: true });

	} catch (err) {

		res.status(400).json({ success: false, message: err });
		
	}
}


export async function saveRecipe(req, res) {

	try {

		const { recipeId, day } = req.body;
		
		const { id: userId } = req.verifiedAccount.tokenData;
		const user = await Account.findOne({ _id: userId });

		const savedUser = user.savedRecipes[day].push(recipeId)
		await user.save()
	
		res.status(200).json({ success: true });
	} catch (err) {
		res.status(400).json({ success: false, message: err });
	}

}

export async function deleteRecipe(req, res) {


	try {

		const { recipeId, day } = req.body;
		let dayQuery = `savedRecipes.${day}`
		console.log(dayQuery);

		
		
		const { id: userId } = req.verifiedAccount.tokenData;
		const user = await Account.findOneAndUpdate({ _id: userId }, 
			{$pull: { [dayQuery] : recipeId } });
			
		res.status(200).json({ success: true });
	} catch (err) {
		res.status(400).json({ success: false, message: err });
	}

}


export async function getSavedRecipes(req, res) {

	try {

		const { id: userId } = req.verifiedAccount.tokenData;
		const user = await Account.findOne({ _id: userId })

		const mondayId = [...user.savedRecipes.monday]
		const tuesdayId = [...user.savedRecipes.tuesday]
		const wednesdayId = [...user.savedRecipes.wednesday]
		const thursdayId = [...user.savedRecipes.thursday]
		const fridayId = [...user.savedRecipes.friday]
		const saturdayId = [...user.savedRecipes.saturday]
		const sundayId = [...user.savedRecipes.sunday]

		const mondayRecipes = await Dish.find({_id: {$in: mondayId }}) 
		const tuesdayRecipes = await Dish.find({_id: {$in: tuesdayId }}) 
		const wednesdayRecipes = await Dish.find({_id: {$in: wednesdayId }}) 
		const thursdayRecipes = await Dish.find({_id: {$in: thursdayId }}) 
		const fridayRecipes = await Dish.find({_id: {$in: fridayId }}) 
		const saturdayRecipes = await Dish.find({_id: {$in: saturdayId }}) 
		const sundayRecipes = await Dish.find({_id: {$in: sundayId }}) 


		res.status(200).json(
			{ 
				success: true, 

				allRecipes: 
				[
					...mondayRecipes, 
					...tuesdayRecipes, 
					...wednesdayRecipes, 
					...thursdayRecipes, 
					...fridayRecipes, 
					...saturdayRecipes,
					...sundayRecipes,

				],
				
				monday: mondayRecipes, 
				tuesday: tuesdayRecipes, 
				wednesday: wednesdayRecipes, 
				thursday: thursdayRecipes, 
				friday: fridayRecipes, 
				saturday: saturdayRecipes, 
				sunday: sundayRecipes, 
			});

	} catch (err) {
		res.status(400).json({ success: false, message: err });
		
	}

}