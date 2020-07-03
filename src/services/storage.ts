import Configstore = require("configstore");

const packageJson = require("../../package.json");

const storage = new Configstore(packageJson.name, { root: 'test'}) as Configstore;

export { storage };
