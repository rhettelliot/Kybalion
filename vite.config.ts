import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const stripBackdropFilter: Plugin = {
  name: 'strip-backdrop-filter',
  enforce: 'post',
  transform(code: string, id: string) {
    if (id.endsWith('.css')) {
      // Remove the .backdrop-filter utility class entirely
      code = code.replace(/\.backdrop-filter\{[^}]+\}/g, '');
      // Remove transition properties that list backdrop-filter
      code = code.replace(/,-webkit-backdrop-filter,backdrop-filter/g, '');
      // Remove any standalone backdrop-filter declarations
      code = code.replace(/;(-webkit-)?backdrop-filter:[^;]*;/g, ';');
      // Remove @property rules for backdrop-* custom properties
      code = code.replace(/@property --tw-backdrop-[^}]+\}/g, '');
      // Remove backdrop custom property declarations from the @layer properties block
      code = code.replace(/--tw-backdrop-[a-z-]+:initial;/g, '');
      return code;
    }
  },
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        stripBackdropFilter,
    ],
    define: {
        // Build stamp shown in the nav / footer, e.g. "2026.07.16".
        __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10).replace(/-/g, '.')),
    },
})
