/* eslint-disable import/no-extraneous-dependencies */
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import cleanup from 'rollup-plugin-cleanup';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./package.json');

const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        banner: '#!/usr/bin/env node\n',
      },
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: Object.keys(pkg.dependencies),
    watch: {
      include: 'src/**',
    },
    plugins: [
      resolve({ mainFields: ['module', 'main'] }),
      // Compile TypeScript files
      typescript(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),

      // Resolve source maps to the original source
      sourceMaps(),
      // uglify({}),
      cleanup({ comments: 'none' }),
    ],
  },
];

export default config;
