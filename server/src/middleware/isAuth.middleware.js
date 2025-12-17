import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "You are not authorized to access this route",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
        return res.status(401).json({
            message: "You are not authorized to access this route",
        });
    }
    req.user= decoded.user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "You are not authorized to access this route",
    });
  }
};

export default isAuth;