// build.js
import esbuild from 'esbuild';
import fs from 'fs-extra';

esbuild.build({
  entryPoints: ['./src/cli.js'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'esm',
  outfile: 'dist/cli.js',
  minify: false, // CLI는 minify 안 해도 됨
  sourcemap: true,
  banner: {
    js: '#!/usr/bin/env node\n'
  },
  packages: 'external', // 모든 dependencies를 번들링하지 않음
}).catch(() => process.exit(1));


await fs.copy('src/copy', 'dist/copy');