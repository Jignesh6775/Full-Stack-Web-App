const express = require("express")
const {connection} = require("./db")
const {userRouter} = require("./routes/user.routes")
const {noteRouter} = require("./routes/note.routes")
const {auth} = require("./middleware/auth.middleware")
const cors=require("cors")
const app = express()

app.use(express.json())
app.use(cors())


app.use("/users", userRouter)

app.use(auth)
app.use("/notes", noteRouter)

app.listen(8080, async()=>{
    try {
        await connection
        // connection.disconnect
        console.log("Connected to Mongo")
    } catch (err) {
        console.log("Not connected to Mongo")
        console.log(err)
    }
    console.log('Server is running')
})