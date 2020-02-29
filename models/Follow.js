const mongoose = require('mongoose'),
Schema   = mongoose.Schema;

const followSchema = new Schema({

userFollower: {
    type: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},
userFollowing: {
  type: [
      {
          type: Schema.Types.ObjectId,
          ref: "User"
      }
  ]
},
  timestamps: true 
});

const Follow = model("Follow", followSchema);
module.exports = Follow;