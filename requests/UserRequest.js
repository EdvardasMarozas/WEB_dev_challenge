const { params, body, validationResult } =  require('express-validator');


module.exports = {
    userValidate: (req) => {
        let valid = true;
        const messages = [];
        const validation = validationResult(req);
        const user = req.body;
    
        if (!validation.isEmpty()) {
          for (let i of validation.array()) {
            messages.push(i.msg);
          }
          valid = false;
        }
        return [user, valid, messages];
      },
    createUser: [
        body('username')
            .trim()
            .escape()
            .notEmpty().withMessage("Please enter a username")
            .isLength({ min: 5 }).withMessage("Username must be at least 5 characters long"),
        body('email')
            .trim()
            .escape()
            .notEmpty().withMessage("Please enter an email")
            .isEmail().withMessage("Please enter a valid email"),
        body('password') 
            .trim()
            .escape()
            .notEmpty().withMessage("Please enter a password")
            .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
        body('confirmPassword')
            .trim()
            .escape()
            .custom((value, { req }) => {
                return value === req.body.password;
            }).withMessage("Passwords don't match"),
    ],
    updateUser: [
        body('username')
            .optional()
            .trim()
            .escape()
            .notEmpty().withMessage("Please enter a username")
            .isLength({ min: 5 }).withMessage("Username must be at least 5 characters long"),
        body('email')
            .optional()
            .trim()
            .escape()
            .notEmpty().withMessage("Please enter an email")
            .isEmail().withMessage("Please enter a valid email"),
        body('password') 
            .optional()
            .trim()
            .escape()
            .notEmpty().withMessage("Please enter a password")
            .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
        body('confirmPassword')
            .optional()
            .trim()
            .escape()
            .custom((value, { req }) => {
                return value === req.body.password;
            }).withMessage("Passwords don't match"),
    ],
    loginValidation: [
        body("email")
          .trim()
          .escape()
          .notEmpty()
          .withMessage("Email is not specified!")
          .isEmail()
          .withMessage("Invalid email address!"),
        body("password")
          .trim()
          .notEmpty()
          .withMessage("Password is not specified!"),
      ],
}