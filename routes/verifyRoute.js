const router = require("express").Router();
const {
  verifyICloudId,
  verifyGoogleId
} = require("../controllers/verifyController");

router.get("/icloud/:appleId", verifyICloudId);
router.get("/google/:googleId", verifyGoogleId);

module.exports = router;
