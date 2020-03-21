/* eslint-disable import/no-extraneous-dependencies */
import glob from 'glob';
import camelcase from 'camelcase';
import * as path from 'path';
import * as fs from 'fs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const generateLisanModule = filename => ({
  name: 'generate-lisan-bundle',
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  writeBundle(context) {
    /* eslint-disable import/no-dynamic-require */
    /* eslint-disable global-require */
    /* eslint-disable @typescript-eslint/no-var-requires */
    const localeConfigSource = fs.readFileSync(
      `./dist/${filename}.lisan.js`,
      'utf-8',
    );

    const template = `"use strict";(function(module) {${localeConfigSource.replace(
      "'use strict';",
      '',
    )}})(typeof module === 'object' && module.exports ? module : window.lisanLoaderListener)`;

    fs.writeFileSync(`./dist/${filename}.lisan.js`, template, 'utf-8');
  },
});

const files = glob.sync('./src/!(index).ts');

const config = files.map(file => {
  const filename = path.basename(file).replace('.ts', '');
  return {
    input: file,
    output: [
      {
        file: `./dist/${filename}.js`,
        format: 'cjs',
        sourcemap: false,
      },
      {
        file: `./dist/${filename}.esm.js`,
        format: 'esm',
        sourcemap: false,
      },
      {
        file: `./dist/${filename}.umd.js`,
        format: 'umd',
        sourcemap: false,
        name: camelcase(`lisanLocales_${filename}`),
      },
    ],
    plugins: [
      // Compile TypeScript files
      typescript(),
      // terser(),
    ],
  };
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./package.json');

config.push({
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    {
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
      name: 'lisanLocalesAll',
    },
  ],
  plugins: [
    // Compile TypeScript files
    typescript(),
    terser(),
  ],
});

files.forEach(file => {
  const filename = path.basename(file).replace('.ts', '');

  config.push({
    input: file,
    output: [
      {
        file: `./dist/${filename}.lisan.js`,
        format: 'cjs',
        sourcemap: false,
      },
    ],
    plugins: [
      // Compile TypeScript files
      typescript(),
      generateLisanModule(filename),
      terser(),
    ],
  });
});

export default config;
