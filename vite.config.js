const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        about: './about.html',
        contact: './contact.html',
        blog: './blog.html',
        blogs: './blogs/',
        // ...
        // List all files you want in your build
      }
    }
  }
})
