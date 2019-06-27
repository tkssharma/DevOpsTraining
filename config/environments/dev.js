const  configuration = {};
configuration.mongo = {
  url:  process.env.MONGODB_URI || process.env.MONGOURL,
};
configuration.URL = {
  frontEnd: process.env.FE_URL
}
configuration.facebook = {
  client_id: process.env.F_CLIENTID,
  client_secret: process.env.F_CLIENTSECRET,
  callback_url: process.env.F_CALLBACK
};
configuration.google = {
  client_id: process.env.G_CLIENTID,
  client_secret: process.env.G_CLIENTSECRET,
  callback_url: process.env.G_CALLBACK
};
configuration.twitter = {
  client_id: process.env.T_CLIENTID,
  client_secret: process.env.T_CLIENTSECRET,
  callback_url: process.env.T_CALLBACK
};
configuration.email = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  }
}
configuration.url = {
  FE: process.env.FE,
  API: process.env.API,
}

module.exports = configuration;