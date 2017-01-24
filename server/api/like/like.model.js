'use strict';

import mongoose from 'mongoose';

export const LikeSchema = new mongoose.Schema({
  author: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  created: { type: Date, default: Date.now }
});

export default mongoose.model('Like', LikeSchema);
