const axios = require("axios");

exports.verifyICloudId = async (req, res) => {
  const { appleId } = req.params;

  const { data } = await axios.post(
    "https://iforgot.apple.com/password/verify/appleid",
    {
      id: appleId
    }
  );

  if (data.name === appleId)
    return res.json({
      isExist: false,
      message: `${appleId} doesn't exist on iCloud`
    });

  return res.json({ isExist: true, message: `${appleId} exist on iCloud` });
};

exports.verifyGoogleId = async (req, res) => {
  const { googleId } = req.params;

  const { data } = await axios.post(
    "https://accounts.google.com/InputValidator?resource=SignUp",
    {
      input01: {
        Input: "GmailAddress",
        GmailAddress: googleId.split("@")[0],
        FirstName: "",
        LastName: ""
      }
    }
  );

  if (data.input01 && data.input01.Valid !== "false") {
    return res.json({
      isExist: false,
      message: `${googleId} doesn't exist on Google`
    });
  }

  if (
    data.input01 &&
    data.input01.Valid === "false" &&
    data.input01.Errors.GmailAddress
  ) {
    return res.json({
      isExist: true,
      message: `${googleId}  exist on Google`
    });
  }

  return res.json({ message: `Oh sorry request limit end` });
};
