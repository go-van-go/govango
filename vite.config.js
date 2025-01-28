const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        about: './about.html',
        contact: './contact.html',
        blog: './blog.html',
        blog1: './blogs/what-is-a-computational-mesh.html',
        // ...
        // List all files you want in your build
      }
    }
  }
})
