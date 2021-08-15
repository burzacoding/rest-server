const { Schema, model } = require('mongoose');

const ErrorCodes = {
  name: {
    required: "The name is required.",
  },
  createdBy: {
    required: "The createdBy is required.",
  }
}

const CategorySchema = Schema({
  name : {
    type : String,
    required : [true, ErrorCodes.name.required]
  },
  active : {
    type : Boolean,
    default: true
  },
  createdBy : {
    type : Schema.Types.ObjectId,
    ref : "User",
    required: [true, ErrorCodes.createdBy.required]
  }

});

module.exports = model('Category', CategorySchema)