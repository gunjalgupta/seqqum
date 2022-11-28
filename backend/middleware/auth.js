const jwt = require('jsonwebtoken');
module.exports = {
    checkToken : (req, res, next ) => {
        let token = req.get("authorization") ;
        if(token){
            jwt.verify(token, "ubereats", (err, decoded) => {
                if(err) {
                    return res.json({
                        success : 0,
                        message: "Invalid token"
                    })
                } else {
                    req.decoded = decoded
                    next();
                }
            })
        } else {
            return res.json({
                message: "Access denied..!! Please login"
            })
        } 
    }
};