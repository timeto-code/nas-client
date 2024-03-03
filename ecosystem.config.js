module.exports = {
  apps: [
    {
      name: "remote-nas-client",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
