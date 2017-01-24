'use strict';

import mongoose from 'mongoose';
import { CommentSchema } from '../comment/comment.model';
import { LikeSchema } from '../like/like.model';

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  likes: [LikeSchema],
  comments: [CommentSchema],
  createdAt: Date,
  updatedAt: Date,
},
  {
    timestamps: true
  });

export default mongoose.model('Post', PostSchema);
