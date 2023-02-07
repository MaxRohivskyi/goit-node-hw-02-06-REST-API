const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { User } = require('../../models');
const { Unauthorized } = require('http-errors');

const avatarURLpath = process.env.AVATAR_URL;
const uploadDir = path.join(__dirname, '../../', 'public');

const updateAvatar = async (req, res) => {
  const { originalname, path: tmpDir } = req.file;
  const { _id } = req.user;

  try {
    const [extension] = originalname.split('.').reverse();
    const newImgName = `userAvatar_${_id}.${extension}`;
    const originalImg = await Jimp.read(tmpDir);
    const resizedImg = await originalImg.cover(250, 250);
    await resizedImg.write(`${uploadDir}/avatars/${newImgName}`);
    fs.unlink(tmpDir);
    const avatar = path.join(avatarURLpath, newImgName);

    const user = await User.findByIdAndUpdate(
      _id,
      {
        avatarURL: avatar,
      },
      { new: true }
    );

    if (!user) {
      throw new Unauthorized(`User with this ${_id} does not found`);
    }

    res.status(200).json(user);
  } catch (error) {
    fs.unlink(tmpDir);
    res.json({ error });
  }
};

module.exports = updateAvatar;
