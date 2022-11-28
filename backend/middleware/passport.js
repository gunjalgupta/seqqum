const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('../models/user');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'seqsumm';

module.exports = (passport) =>{
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done)=>{
            console.log("jwt paylaad",jwt_payload);
            //Mongoose model to check whether the user exist or not
            User.findOne({ email:jwt_payload.email})
            .then((customer) =>{
            if(customer){
                return done(null, customer);
            }
            return done(null, false);
            })
            .catch((error)=>{
                console.log(error);
            }) 
        })
    )
}