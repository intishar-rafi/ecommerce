const app = require("./app");

const port = process.env.PORT
app.listen(port,function(){
    console.log('service is running')
})