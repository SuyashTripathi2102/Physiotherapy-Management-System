const authorizeRoles = (...allowedRoles) => {
    //(...allowedRoles) - “Collect all the arguments passed to the function into a single array named allowedRoles.”
    return (req, res, next) => {
      const userRole = req.userInfo.role;
      console.log(allowedRoles);
      console.log(userRole);
      if (!allowedRoles.includes(userRole)) {
        //You're checking: "Is the current user's role one of the allowed ones?"
        return res.status(403).json({ success: false, message: 'Access Denied: Unauthorized Role' });
      }
      
      next();
    };
  };
  
  module.exports = authorizeRoles;
  