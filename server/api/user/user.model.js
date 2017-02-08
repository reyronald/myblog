'use strict';

import mongoose from 'mongoose';

const authTypes = ['google'];

const UserSchema = new mongoose.Schema({
  oauthId: Number,
  name: String,
  email: {
    type: String,
    lowercase: true,
    required() {
      return authTypes.indexOf(this.provider) === -1;
    }
  },
  password: {
    type: String,
    required() {
      return authTypes.indexOf(this.provider) === -1;
    }
  },
  provider: String,
  salt: String,
  google: {},
  createdAt: Date,
  updatedAt: Date,
},
  {
    timestamps: true
  });

export default mongoose.model('User', UserSchema);
