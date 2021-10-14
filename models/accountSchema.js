import mongoose from 'mongoose'
import isEmail from 'validator/lib/isEmail.js';

/* const savedRecipesSchema = new mongoose.Schema({

  monday: {
    type: Array,
  },

  tuesday: {
    type: Array,
  },

  wednesday: {
    type: Array,
  },

  thursday: {
    type: Array,
  },

  friday: {
    type: Array,
  },

  saturday: {
    type: Array,
  },

  sunday: {
    type: Array,
  },


 
})
 */



const accountSchema = new mongoose.Schema({

  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true 
  },

  avatar: {
    type: String,
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
  },

  firstname: {
    type: String,

  },

  lastname: {
    type: String,

  },


  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (email) {
          return isEmail(email);
      },
      message: 'Please provide a valid email address'
  }

  },

  role: {
    type: String,
  },

  favoriteRecipes: {
    type: Array,
  },

  savedRecipes: {

      monday: Array,
      tuesday: Array,
      wednesday: Array,
      thursday: Array,
      friday: Array,
      saturday: Array,
      sunday: Array
      
  }

 
})

export default mongoose.model('Account', accountSchema)



