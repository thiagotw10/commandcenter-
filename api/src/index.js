const express = require('express')
const routes = require('./routes')
const cors = require('cors')
// const feeding =  require('./feeding/index')
const app = express()
require('dotenv')

app.use(cors())
app.use(express.json())
app.use('/api', routes)
app.use(routes)

const port = 5000

app.listen(process.env.PORT || port, ()=>{
    console.log('LISTENING IN PORT:', port)
})
