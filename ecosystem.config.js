module.exports = {
  apps: [
    {
      name: "myapp",
      script: "./server.js",
      instances: 0,
      exec_mode: "cluster",
      wait_ready: true,
    },
  ],
};
