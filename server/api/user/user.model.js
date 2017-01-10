'use strict';

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	oauthID: Number,
	name: String,
	createdAt: Date,
	updatedAt: Date,
},
{
  timestamps: true
});

export default mongoose.model('User', UserSchema);
