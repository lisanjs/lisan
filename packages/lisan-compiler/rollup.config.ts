/* eslint-disable import/no-extraneous-dependencies */
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./package.json');

const config = [
  // Node Build
  {
    input: 'src/index.ts',
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
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: Object.keys(pkg.dependencies),
    watch: {
      include: 'src/**',
    },
    plugins: [
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      resolve({ mainFields: ['module', 'main'] }),
      // Compile TypeScript files
      typescript(),
      // translate commonjs module to ES6 module to be handle from Rollup and tree-shake
      commonjs(),
      // Resolve source maps to the original source
      sourceMaps(),
      // uglify code
      terser({ output: { comments: false } }),
    ],
  },
  // Build browser distribution
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.browser,
        name: 'lisanCompiler',
        format: 'umd',
        sourcemap: true,
      },
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    // external: ['@typescript-eslint/typescript-estree'],
    watch: {
      include: 'src/**',
    },
    plugins: [
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      resolve({ mainFields: ['module', 'main', 'browser'] }),
      // Compile TypeScript files
      typescript(),
      // translate commonjs module to ES6 module to be handle from Rollup and tree-shake
      commonjs(),

      // Resolve source maps to the original source
      sourceMaps(),
      // uglify code
      terser({ output: { comments: false } }),
    ],
  },
];

export default config;
