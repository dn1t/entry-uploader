const { build } = require('esbuild');

build({
  entryPoints: ['src/index.ts'],
  outdir: 'dist',
  sourcemap: false,
  bundle: true,
  target: ['es2018'],
  watch: process.env.NODE_ENV !== 'production',
});
