// NODE_ENV=test - Needed by "@snowpack/web-test-runner-plugin"
import.meta.env.NODE_ENV = 'test';

module.exports = {
  plugins: [require('@snowpack/web-test-runner-plugin')()],
};
