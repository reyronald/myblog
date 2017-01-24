'use strict';

import mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  content: String,
  author: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  createdAt: Date,
  updatedAt: Date,
},
  {
    timestamps: true
  });

export default mongoose.model('Comment', CommentSchema);
