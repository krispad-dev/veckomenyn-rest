import { format } from 'date-fns'
import Dish from '../models/dishSchema.js'
import Account from '../models/accountSchema.js'
import Comment from '../models/commentSchema.js'

export async function createComment(req, res, next) {

	try {

		const date = format(new Date(), 'yyyy-MM-dd')
        
 		const { id } = req.verifiedAccount.tokenData; 
		const { comment, rating, _id, initials, average } = req.body;


		const newComment = await new Comment({
            userId: id,
            recipeId: _id,
			initials: initials,
			comment: comment,
			rating: rating,
			postedAt: date,
		})

        const updateRecipe = await Dish.findByIdAndUpdate({_id: _id,}, { rating: average })

		const updatedComment = await newComment.save()
	
		res.status(201).json({ success: true, message: `Comment created` });

	} catch (err) {
		next(err);
	}
}

export async function getComments(req, res, next) {

	try {

        const comments = await Comment.find({ recipeId: req.params.id})
        const users = await Account.find()
      
        const newComments = comments.map((comment) => {
       
            return {
                username: users.find(user => comment.userId == user._id).username,
                avatar: users.find(user => comment.userId == user._id).avatar,
                comment
            }

        })

		res.status(201).json(newComments);

	} catch (err) {
		next(err);
	}
}

export async function getAllComments(req, res, next) {
	try {
        const comments = await Comment.find()
		res.status(201).json(comments);

	} catch (err) {
		next(err);
	}
}