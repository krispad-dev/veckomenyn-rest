import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({

    userId: {
      type: String,
    },

    recipeId: {
      type: String,
    },

    initials: {
      type: String,
    },

    username: {
      type: String,
    },
    
    comment: {
      type: String,
    },
    
    rating: {
      type: Number,
    },

    postedAt: {
      type: String,
    },

    avatar: {
      type: String,
    }
  })

  export default mongoose.model('Comment', commentSchema)
