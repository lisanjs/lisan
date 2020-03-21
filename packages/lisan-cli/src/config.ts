import * as fs from 'fs';
import * as json5 from 'json5';

const getConfigFromFile = (configPath?: string): object => {
  if (configPath) {
    return json5.parse(fs.readFileSync(configPath).toString());
  }
  return {};
};

export { getConfigFromFile };
