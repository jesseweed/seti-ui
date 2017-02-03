import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import eslint from 'rollup-plugin-eslint';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import config from './shared/config.js';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: './client/app.js',
  dest: '_dist/js/app.min.js',
  format: 'iife',
  moduleName: config.shared.name,
  plugins: [
    eslint({
      exclude: [
        'public/**'
      ]
    }),
    commonjs(),
    json(),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV)
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    (process.env.NODE_ENV === 'production' && uglify())
  ],
  sourceMap: 'inline'
};
