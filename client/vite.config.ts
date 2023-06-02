import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

function isExternal(id: string) {
  return !id.startsWith('.') && !path.isAbsolute(id) && !id.startsWith('@/');
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/api': path.resolve(__dirname, './src/api/index.ts'),
      '@/stores': path.resolve(__dirname, './src/stores/*'),
      '@/assets/*': path.resolve(__dirname, './src/assets/*'),
      '@/compoents': path.resolve(__dirname, './src/compoents/index.ts'),
      '@/hoc': path.resolve(__dirname, './src/hoc/index.ts'),
      '@/hooks': path.resolve(__dirname, './src/hooks/index.ts'),
      '@/layouts': path.resolve(__dirname, './src/layouts/index.ts'),
      '@/pages': path.resolve(__dirname, './src/pages/index.ts'),
      '@/routes': path.resolve(__dirname, './src/routes/index.ts'),
      '@/utils/*': path.resolve(__dirname, './src/utils/*'),
      '@/types': path.resolve(__dirname, './src/types/index.ts'),
    },
  },
  plugins: [react()],
});
