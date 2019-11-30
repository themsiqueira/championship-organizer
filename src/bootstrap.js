const dotenv = require('dotenv');

module.exports.init = (environment = 'development') => {
  let environmentVariabels = {};
  if (environment === 'production') {
    environmentVariabels = dotenv.config({ path: '.env' });
  }
  if (environment === 'staging') {
    environmentVariabels = dotenv.config({ path: '.env.staging' });
  }
  if (environment === 'development') {
    environmentVariabels = dotenv.config({ path: '.env.development' });
  }
  if (environment === 'test') {
    environmentVariabels = dotenv.config({ path: '.env.test' });
  }
  for (const key in environmentVariabels) {
    if (Object.prototype.hasOwnProperty.call(process.env, key)) {
      process.env[key] = environmentVariabels[key];
    }
  }
};
