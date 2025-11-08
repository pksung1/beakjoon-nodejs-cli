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
  external: [], // 모든 dependencies 번들링
  minify: false, // CLI는 minify 안 해도 됨
  sourcemap: true,
  banner: {
    js: '#!/usr/bin/env node\n'
  }
}).catch(() => process.exit(1));


await fs.copy('src/copy', 'dist/copy');