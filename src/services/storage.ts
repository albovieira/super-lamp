import Configstore = require("configstore");

const packageJson = require("../../package.json");

const storage = new Configstore(packageJson.name) as Configstore;

export { storage };
