var pm2Config = {
  apps: [
    {
      name: "index",
      script: "./bin/index.js",
      exec_mode: "fork",
      instances: 1
    },
    {
      name: "worker",
      script: "./bin/worker.js",
      watch: true
    }
  ]
};

module.exports = pm2Config;
