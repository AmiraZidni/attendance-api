const express = require('express');
const router = express.Router();

const attendancesController = require('../controllers/attendancesController');
const authenticateAccessToken = require('../middleware/authenticateAccessToken');

// ========== multer config ========== 
const multer = require('multer');

// storage destination and filename renaming
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

// file filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === ("jpg" || "png")) {
    cb(null, true);
  } else {
    cb(new Error("Not a image file!!"), false);
  }
};

// call multer upload function
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
// ========== /multer config ========== 

router.use(authenticateAccessToken);

/* 
[GET] /v1/attendances
Get attendances of all users
*/
router.get('/', attendancesController.get_attendances_of_all_users);

/* 
[GET] /v1/attendances/{userId}
Get attendances by user id
*/
router.get('/:userId', attendancesController.get_attendances_by_user_id);

/* 
[GET] /v1/attendances/{userId}/status
Get user's today attendance status
*/
router.get(
  '/:userId/status',
  attendancesController.get_user_today_attendance_status
);

/* 
[POST] /v1/attendances/{userId}/in
Check in attendance of current user
*/
router.post(
  '/:userId/in',
  upload.single('file'),
  attendancesController.check_in_attendance_by_user_id
);

/* 
[POST] /v1/attendances/{userId}/out
Check out attendance of current user
*/
router.post(
  '/:userId/out',
  attendancesController.check_out_attendance_by_user_id
);

/* 
[PUT] /v1/attendances/{userId}/correction
Correct incomplete attendance of user. ADMIN ONLY
*/
router.put('/:userId', attendancesController.correct_incomplete_attendance);

module.exports = router;
