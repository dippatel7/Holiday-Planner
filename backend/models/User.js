const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true // Added to remove whitespace
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, // Added to remove whitespace
    lowercase: true // Ensure email consistency
  },
  password: { 
    type: String, 
    required: true 
  },
  university: { 
    type: String, 
    trim: true // Added to remove whitespace
  },
  address: { 
    type: String, 
    trim: true // Added to remove whitespace
  },
}, { 
  timestamps: true // Added for createdAt/updatedAt tracking
});

// Hash password before saving if modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
