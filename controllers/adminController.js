const Account = require('../models/account');

exports.list_approval_account = async (req, res) => {
  // Check if account have admin access
  if (!req.account.isAdmin) {
    return res.status(403).json({ message: "This user doesn't have admin role" });
  }
  try {
      // Get account list
      const results = await Account.aggregate([
        {
          "$match": { isAdmin: false }
        },
        {
          "$project": {
            first_name: 1,
            last_name: 1,
            email: 1,
            _id: 1,
            status:1,
            createdAt:{
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt"
              }
            },
          }
        }
      ]);
      // send response
      return res.status(200).json({
        message: 'Success retrieve account list',
        results,
      });
  } catch (error) {
      next(error);
  }
};
