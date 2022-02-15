const express = require('express')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: "localhost",
    user: "root", 
    password: "password",
    database: "discography"
})

app.get("/", (req,res) =>{
    let SQL = "ISERT INTO (albumname, albumduration) VALUES ('rei do gado','3,5')";
    db.query(SQL, (err, result) =>{
        console.log(err)
    })
})


app.get('/', (req,res) =>{
    res.send('hello')
})

app.listen(3001, () => {console.log('Rodando');})