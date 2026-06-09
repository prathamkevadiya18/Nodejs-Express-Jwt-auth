const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtsecret = 'abcd';

exports.adduser = async function (req, res) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(String(req.body.password), salt);
    const newUser = await User.create({ email: req.body.email, password: hashedPassword });

    const token = jwt.sign({ _id: newUser._id, email: newUser.email }, jwtsecret);
    res.header('Authorization', `Bearer ${token}`).status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async function (req, res) {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      return res.status(400).json({ error: 'Invalid email ' });
    }

    const validPassword = await bcrypt.compare(String(req.body.password), foundUser.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
   
    const token = jwt.sign({ _id: foundUser._id, email: foundUser.email }, jwtsecret);
    res.header('Authorization', `Bearer ${token}`).json({ token });
   
   
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.finduser = async function (req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send('Record not found');
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

