const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const hostname = '192.168.1.115'

const app = express()
const port = 3000

mongoose.connect('mongodb+srv://webfoglalas:admin@elmenyfestes.twmwqzc.mongodb.net/?retryWrites=true&w=majority&appName=Elmenyfestes', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error!'))
db.once('open', () => {
    console.log('MongoDB connected successfully!')
})

const foglalasSchema = new mongoose.Schema({
    nev: String,
    datum: String,
    telefon: String,
})

const Foglalas = mongoose.model('Foglalas', foglalasSchema)

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/reservation.html')
})

//------ POSTS and GETS ------//


app.get('/foglalas', async (req, res) => {
    try {
        const foglalasok = await Foglalas.find()
        res.json(foglalasok)
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error (500)')
    }
})

app.post('/foglalas', async (req, res) => {
    try {
        const { nev, datum, telefon } = req.body
        const foglalas = new Foglalas({ nev, datum, telefon })
        await foglalas.save()
        res.redirect('/')
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error (500)')
    }
})

//----- END ------//

app.listen(port, hostname, () => {
    console.log(`Server listening at https://${hostname}:${port}`)
})

