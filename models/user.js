const userExample = {
  name: 'César Pintos',
  email: 'pintos.cesar01@gmail.com',
  password: 'hashedPassword',
  img: 'https://www.lavanguardia.com/files/article_main_microformat/uploads/2018/07/17/5e9984548c06a.jpeg',
  role: 'admin',
  active: true,
  google: false,
}

const { Schema, model } = require('mongoose')

const ErrorCodes = {
  name: {
    required: {
      code: 'error/name-required',
      message: 'El nombre es requerido'
    }
  },
  email: {
    required: {
      code: 'error/email-required',
      message: 'El email es requerido'
    }
  },
  password: {
    required: {
      code: 'error/password-required',
      message: 'El password es requerido'
    }
  },
}


const UserSchema = Schema({
  name: {
    type: String,
    required: [true, ErrorCodes.name.required],
  },
  email: {
    type: String,
    required: [true, ErrorCodes.email.required],
    unique: true
  },
  password: {
    type: String,
    required: [true, ErrorCodes.password.required]
  },
  img: {
    type: String
  },
  role: {
    type: String,
    default: 'user'
  },
  active: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  },
  
})

module.exports = model('User', UserSchema)