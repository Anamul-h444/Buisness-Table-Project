const mongoose = require('mongoose')
const app = require('./app')
const dotenve = require('dotenv')
dotenve.config({path:'./config.env'})


/* Create Server */
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`)
})

/* Connection with database */
const database = process.env.db_local
//const database = process.env.db_atlas
mongoose.connect(database)
    .then(() => { console.log('Database connected successfully!') })
    .catch(() => { console.log('connect Fail!') })
	
	