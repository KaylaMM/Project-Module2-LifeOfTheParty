const mongoose = require("mongoose");
const Board = require('./Board');
const { Schema, model } = mongoose;

// in order to use .populate in the route file, you must first have the type for what you will populate as Schema.Types.ObjectId and make sure to ref (reference) the model that it will be searching that ID for in your db collection
// author: {type: Schema.Types.ObjectId, ref: 'User'}
// if your using an array of object ids then it would look like the code below
// messages: {type: [{type: Schema.Types.ObjectId, ref: 'Message'}]}
// notice that when you reference you use the capitalization of the model that it is referencing


const userSchema = new Schema(
    {
        // Username provided by users during signup
        username: {
            type: String,
            required: [true, 'Username is required.'],
            unique: true,
            trim: true
        },
        // Password provided by users during signup
        password: {
            type: String,
            required: [true, 'Password is required.'],
            trim: true
        },
        // Email provided by users during signup
        email: {
            type: String,
            required: [true, 'Email is required.'],
            match: [
                    /^\S+@\S+\.\S+$/, 
                    'Please use a valid email address.'],
            unique: true,
            lowercase: true,
            trim: true
        },
        // User avatar provided by users during signup
        avatar: {
            type: String,
            default:
                "https://cl.goliath.com/image/upload/t_tn,f_auto,q_auto,$h_480,$w_895/go/2020/01/baby-yoda-life-size-figure-584x600-895x480.jpg"
        },
        // Boards created by user
        userBoards: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Board"
                }
            ]
        },
        // Private messages received by the user
        DMs: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Message"
                }
            ]
        },
        // Users follow by current user
        usersFollowers: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "User"
                }
            ]
        },
        // Users followed by current user
        usersFollowed: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "User"
                }
            ]
        },
    },
    {
        timestamps: true
    }
);

const User = model("User", userSchema);
module.exports = User;