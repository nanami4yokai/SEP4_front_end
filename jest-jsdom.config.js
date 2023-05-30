module.exports = {
    // other configuration options
    testEnvironment: "jsdom",
    testEnvironmentOptions: {
      // Mocking the viewport size
      viewport: {
        width: 1024,
        height: 768,
      },
      // Controlling the JSDOM resources
      resources: "usable",
      // Configuring JSDOM virtual console
      virtualConsole: true,
      // Specifying the JSDOM run scripts
      runScripts: "dangerously",
    },
  };
  