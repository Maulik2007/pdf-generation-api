function rapidapiAuth(req, res, next) {
  if (process.env.NODE_ENV !== 'production') {
    return next();
  }

  const proxySecret = req.headers['x-rapidapi-proxy-secret'];
  if (!proxySecret || proxySecret !== process.env.RAPIDAPI_PROXY_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  req.rapidapi = {
    user: req.headers['x-rapidapi-user'],
    subscription: req.headers['x-rapidapi-subscription'],
  };

  next();
}

module.exports = rapidapiAuth;
