const { Schema, model, Types } = require("mongoose");

const ReactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: "Please choose a reaction must be less than 100 characters!",
        //minlength and maxlength can be added as separate lines
        minlength: 1,
        maxlength: 100,
      },
      userName: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );

  const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: "You must select a thought must be less than 280 characters!",
        //minlength and maxlength can be added as separate lines
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
        //!create a formatter file for the date
      },
      userName: {
        type: String,
        required: true,
      },
      reactions: [ReactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );

  thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });
  
  // Create Comment model
  const thought = model("thought", thoughtSchema);
  
  module.exports = thought;