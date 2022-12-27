const webpack = require('webpack');

module.exports = {
   lintOnSave: false,
   css: {
      loaderOptions: {
         sass: {
            additionalData: `@import "@/assets/css/style.scss";`
         }
      }
   },
}