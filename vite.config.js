import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    base: './', // paths are relative to the current directory
    build: {
	outDir: './',
	rollupOptions: {
	    input: {
		main: resolve(__dirname, 'index.html'),
		contact: resolve(__dirname, 'contact.html'),
		about: resolve(__dirname, 'about.html'),
		blog: resolve(__dirname, 'blog.html'),
		blog1: resolve(__dirname, 'blogs/what-is-a-computational-mesh.html'),
		blog2: resolve(__dirname, 'blogs/discontinuous-galerkin-method-from-scratch-in-python-the-finite-element.html'),
		blog3: resolve(__dirname, 'blogs/what-type-of-medical-imaging-data-exists.html'),
		blog4: resolve(__dirname, 'blogs/discontinuous-galerkin-method-from-scratch-in-python-mapping-reference-to-physical.html'),
	    },
    },
  },
})
