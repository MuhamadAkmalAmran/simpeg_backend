import jwt from 'jsonwebtoken';

const secret = process.env.ACCESS_TOKEN;
const accessToken = (userData) => jwt.sign(userData, secret, { expiresIn: '1d' });

export default accessToken;
