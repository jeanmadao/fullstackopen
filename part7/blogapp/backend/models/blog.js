const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [
    {
      body: String,
      blogId: mongoose.Schema.Types.ObjectId,
      id: mongoose.Schema.Types.ObjectId,
    },
  ],
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    const comments = returnedObject.comments;
    comments.map((comment) => {
      comment.id = comment._id.toString();
      delete comment._id;
    });
  },
});

module.exports = mongoose.model("Blog", schema);
