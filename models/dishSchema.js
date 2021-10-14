import mongoose from 'mongoose';
import mongooseFuzzySearching from 'custom-mongoose-fuzzy-searching'


const dishSchema = new mongoose.Schema({

	title: {
		type: String,
	},

	description: {
		type: String,
	},

	tagline: {
		type: String,
	},

	author: {
		type: String,
	},

	image: {
		type: String,
	},

	ingredients: {
		type: Array,
	},

	steps: {
		type: Array,
	},

	difficulty: {
		type: String,	
	},

	tags: {
		type: Array, 
	},

	cookingTime: {
		type: Number
	}

});

dishSchema.index({ 'title': 'text', 'tags': 'text',  });
dishSchema.plugin(mongooseFuzzySearching, { fields: ['title', 'tags'] })

export default mongoose.model('Dish', dishSchema);
