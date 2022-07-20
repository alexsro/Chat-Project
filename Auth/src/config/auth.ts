export default {
  token: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '5m',
  },
};
