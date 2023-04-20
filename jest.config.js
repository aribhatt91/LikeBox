// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
/* https://jestjs.io/docs/configuration */
const config = {
    verbose: true,
  };
  
  module.exports = config;
  
  // Or async function
  module.exports = async () => {
    return {
      verbose: true,
    };
  };