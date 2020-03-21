/* eslint-disable import/no-extraneous-dependencies */
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

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
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
      {
        file: pkg.browser,
        format: 'umd',
        name: 'lisanPluginLoader',
        sourcemap: true,
      },
    ],
    plugins: [typescript(), terser({ output: { comments: false } })],
  },
];

export default config;
