import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const environment = 'production';

      if (environment === 'production') {
        config.baseUrl = 'https://el-duckster.github.io/EscapeRoom-grupp2/';
      } else {
        config.baseUrl = 'http://localhost:5173';
      }
      return config;
    },
  },
});
