const router = require("express").Router();
const { checkId } = require("../controllers/idCheckController");

router.get("/", checkId);
router.get("/:appleId", checkId);

module.exports = router;
