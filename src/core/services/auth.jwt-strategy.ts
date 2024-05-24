import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import User, { IUser } from '../../users/user.schema';

const secretKey = process.env.JWT_SECRET as string || 'mysecretkey';

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey
  }, (payload: any, done: VerifiedCallback) => {
    // Find user by ID
    User.findById(payload.sub, (err: any, user: IUser) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        const { _id, username, email } = user;
        return done(null, { _id, username, email }); // Attach _id and username to the request
      } else {
        return done(null, false);
      }
    });
  }));