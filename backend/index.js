const connectToMongo = require('./db')  
var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())
connectToMongo(); 
const port = 5000

app.use(express.json())
// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`iNotes backend listening at http://localhost:${port}`)
})