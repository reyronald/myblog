'use strict';

import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: Date,
  updatedAt: Date,
},
  {
    timestamps: true
  });

export default mongoose.model('Post', PostSchema);
