const axios = require("axios");

exports.checkId = async (req, res) => {
  const { appleId } = req.params;

  const { data } = await axios.post(
    "https://iforgot.apple.com/password/verify/appleid",
    {
      id: appleId
    }
  );

  if (data.name === appleId)
    return res.json({ message: `${appleId} doesn't exist on iCloud` });

  return res.json({ message: `${appleId} exist on iCloud` });
};
