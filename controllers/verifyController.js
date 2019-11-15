const axios = require("axios");

exports.verifyICloudId = async (req, res) => {
  const { appleId } = req.params;

  const { data } = await axios.post(
    "https://iforgot.apple.com/password/verify/appleid",
    {
      id: appleId
    }
  );

  console.log(data);
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

  console.log(data);

  // If Google id exist
  if (
    data.input01 &&
    data.input01.Valid === "false" &&
    data.input01.Errors.GmailAddress === "That username is taken. Try another."
  ) {
    return res.json({
      isExist: true,
      message: `${googleId}  exist on Google`
    });
  }

  // If Google id doesn't exist
  if (data.input01 && data.input01.Valid) {
    return res.json({
      isExist: false,
      message: `${googleId} doesn't exist on Google`
    });
  }

  // If request limit out
  return res.json({ message: `Oh sorry request limit end` });
};
