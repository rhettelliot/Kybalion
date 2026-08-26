import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist/assets');
const files = fs.readdirSync(distDir).filter((f) => f.endsWith('.css'));

for (const file of files) {
  const fp = path.join(distDir, file);
  let css = fs.readFileSync(fp, 'utf-8');
  const before = css;
  // Remove the .backdrop-filter utility class block
  css = css.replace(/\.backdrop-filter\{[^}]+\}/g, '');
  // Remove transition property references to backdrop-filter
  css = css.replace(/,-webkit-backdrop-filter,backdrop-filter/g, '');
  // Remove any standalone backdrop-filter declarations
  css = css.replace(/;(-webkit-)?backdrop-filter:[^;]*;/g, ';');
  // Remove @property rules for backdrop custom properties
  css = css.replace(/@property --tw-backdrop-[a-z-]+\{[^}]+\}/g, '');
  // Remove backdrop custom property declarations from the @layer properties block
  css = css.replace(/--tw-backdrop-[a-z-]+:initial;/g, '');
  if (css !== before) {
    fs.writeFileSync(fp, css);
    console.log(`Stripped backdrop-filter artifacts from ${file}`);
  }
}
