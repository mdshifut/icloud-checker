const axios = require("axios");

exports.verifyICloudId = async (req, res) => {
  const { appleId } = req.params;

  console.log("updated");
  const { data } = await axios.post(
    "https://iforgot.apple.com/password/verify/appleid",
    {
      id: appleId
    },
    {
      headers: {
        Host: "iforgot.apple.com",
        Origin: "https://iforgot.apple.com",
        Referer: " https://iforgot.apple.com/password/verify/appleid",
        "Sec-Fetch-Mode": " cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3952.0 Safari/537.36 Edg/80.0.320.5",
        "X-Apple-I-FD-Client-Info": {
          U:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3952.0 Safari/537.36 Edg/80.0.320.5",
          L: "en-US",
          Z: "GMT+06:00",
          V: "1.1",
          F:
            "Nda44j1e3NlY5BSo9z4ofjb75PaK4Vpjt.gEngMQEjZr_WhXTA2s.XTVV26y8GGEDd5ihORoVyFGh8cmvSuCKzIlnY6xljQlpRDukqwoxY9hypZHgfLMC7ETIhDSpWhtx3DOfeLd7FmrpwoNN5uQ4s5uQ.gEx4xUC541jlS7spjt.gEngMQEjZr_WhXTA2s.XTVV26y8GGEDd5ihORoVyFGh8cmvSuCKzIlnY6xljQlpRDukqwoxY9hypZHgfLMC7ETIhDSpWhtx3DOfwvw0BpUMnGWqbyATblVnmccbguaDeyjaY2ftckuyPBDjaY1HGOg3ZLQ0IHd_v5AqKqvB.i.uJtHoqvynx9MsFyxYMAqJkL6f1BSp.jVH0Y.Z20Hb4BRcWqrTJfwjOyOMl7pp0iMgdVg8a53kY5BNlrJNNlY5QB4bVNjMk.39z"
        }
      }
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
