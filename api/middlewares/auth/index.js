import jwt from 'jsonwebtoken';
import ResponseBuilder from '../../helpers/responseBuilder';
import moment from 'moment-timezone';

export default function (config) {
  return function CheckAuthorization(req, res, next) {
    console.log('\n\n entrou no check auth');
    let token = req.headers['x-access-token'] || req.headers.authorization;

    if (!token)
      return res.status(401).send('Access denied. No token provided.');

    if (!token.includes('Bearer'))
      return res.status(400).send('Access denied. Malformed token.');

    token = token.split(' ').pop();

    try {
      const decoded = jwt.verify(token, ResponseBuilder.getTokenSecret());
      req.user = decoded;

      const { iat, exp } = decoded;

      const momentIat = moment.unix(iat);
      const momentExp = moment.unix(exp);
      const momentNow = moment();

      if (!momentNow.isBetween(momentIat, momentExp)) {
        res.status(401).send('Token Expired!');
      }

      next();
    } catch (ex) {
      res.status(401).send('Invalid Token!');
    }
  };
}
