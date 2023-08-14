const express = require('express')
const mongoose = require('mongoose')
const Player = require('./models/playerModel')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/testpage', (req, res) => {
    res.send('Hello World from another page!')
})

// Get all products
app.get('/players', async (req, res) => {
    try {
        const players = await Player.find({});
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get a specific product
app.get('/players/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const player = await Player.findById(id);
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Save a specific product
app.post('/players', async (req, res) => {
    try {
        const player = await Player.create(req.body)
        res.status(200).json(player);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

// Update a product
app.put('/players/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const player = await Player.findByIdAndUpdate(id, req.body);
        // Cannot find  product in database
        if (!player) {
            return res.status(404).json({ message: `cammpt find player with ID ${id}` })
        }
        const updatedPlayer = await Player.findById(id); // get updated product from database 
        res.status(200).json(updatedPlayer);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

// Delete a product
app.delete('/players/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const player = await Player.findByIdAndDelete(id);
        // Cannot find product in database
        if (!player) {
            return res.status(404).json({ message: `cammpt find player with ID ${id}` })
        }
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// mongoose.set("strictQuery", false)
mongoose
    .connect('mongodb+srv://admin:admin@isaacapi.xxwnqjt.mongodb.net/Node-API?retryWrites=true&w=majority')
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        })
    }).catch(() => {
        console.log(error)
    })