const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/index.js', //location of your main js file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'  // where js files would be bundled to
   },
   devServer: {
        contentBase: './dist' //where contents are served from
   },
   plugins: [
    new HtmlWebpackPlugin({
       filename: 'index.html', // name of html file to be created
       template: './src/index.html' // source from which html file would be created
    })
   ]
 } 