const { Schema, model } = require('mongoose');

const ErrorCodes = {
  name: {
    required: "The name is required.",
  },
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
  }
});

CategorySchema.methods.getCreator = function() {
  return this.createdBy
}

CategorySchema.methods.toJSON = function () {
  const { __v, _id: uid, ...rest} = this.toObject();
  return {
    ...rest,
    uid
  }
}

module.exports = model('Category', CategorySchema)