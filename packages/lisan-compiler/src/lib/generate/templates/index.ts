import { Templates } from '../../../typings';

const esm = (sourceCode: string): string => `export default ${sourceCode};\n`;

const cjs = (sourceCode: string): string => `module.exports = ${sourceCode};\n`;

const lisan = (sourceCode: string): string =>
  `;(function(module){\n\nmodule.exports = ${sourceCode};\n\n})(typeof module === 'object' && module.exports ? module : window.lisanLoaderListener);\n`;

const templates: Templates = { esm, cjs, lisan };

export default templates;
