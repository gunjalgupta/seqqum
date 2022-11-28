const express = require("express")
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body)
    console.log(password)

    const currUser = await User.findOne({email: email});
    if(currUser){
        return res.status(401).send({
            message: "Account already exists"
        })
    } 
    else{
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,(err,hash)=>{
                if(err){
                    console.log("hash did not work");
                }
    
                var newUser =  new User({
                    name: name,
                    email: email,
                    password: hash
                }); 
    
                console.log(newUser);
                newUser.save((err,result)=>{
                    if(err){
                        console.log(err)
                        return;
                    }
                    else {
            
                        let token = jwt.sign(
                            {
                              email: result.email
                            },
                            "seqsumm",
                            {
                                expiresIn: 86400 //24 hours
                            }
                        );
                        token = "Bearer " + token;
                        return res.status(200).send({
                            success: 1,
                            data:result,
                            token: token,
                            message: "registration successful"
                        })    
                    }
    
                });
    
            });
        });
    }

    // const salt = await bcrypt.genSalt();
    // const passwordHash = await bcrypt.hash(password, salt);
    // console.log(passwordHash)
    // const newUser = new User({
    //     name,
    //     email,
    //     passwordHash,
    // });
    // newUser.save((err,result) => {
    //     if(err) {
    //         return res.status(500).send(err);
    //     }else {
    //         console.log("result", result)
    //         let token = jwt.sign(
    //             {
    //               email: result.email
    //             },
    //             "seqsumm",
    //             {
    //                 expiresIn: 86400 //24 hours
    //             }
    //         );
    //         token = "Bearer " + token;
    //         return res.status(200).send({
    //             success: 1,
    //             data:result,
    //             token: token,
    //             message: "registration successful"
    //         })    
    //     }
    // });
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const currUser = await User.findOne({email: email});
    if(!currUser){
        return res.status(401).send({
            message: "User not registered"
        })
    } ;
    console.log(currUser)
   
    const decryptPassword = await bcrypt.compare(
        password,
        currUser.password
    );

    console.log(decryptPassword)
    if(!decryptPassword){
        return res.status(401).send({
            message: "Wrong email or password"
        })
    }

    let token = jwt.sign(
        {
          email: currUser.email
        },
        "seqsumm",
        {
            expiresIn: 86400 //24 hours
        }
    );
    token = "Bearer " + token;
    return res.status(200).send({
        success: 1,
        token: token,
        data: currUser,
        message: "login successful"
    })    
});

module.exports = router;