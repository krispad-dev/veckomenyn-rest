
import mongoose from 'mongoose'

export async function connectDb(){

  try {

    await mongoose.connect('//mongodb://localhost/veckomenyn', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })

    console.log({
      message: 'connected to DB',
      success: true
    })

  } catch (error) {

    console.log({
      sucsess: false,
      message: 'Could not connect to DB',
      error: error
    })
  }

}
