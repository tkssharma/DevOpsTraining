module.exports = {
  apps: [
    {
      name: 'app_Server',
      script: 'app/server.js',
      instances: 2,
      env: {
        COMMON_VARIABLE: 'true',
      },
      listen_timeout: 50000,
      kill_timeout: 15000
    }
  ]
};
