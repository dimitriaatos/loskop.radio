const express = require('express')
const bodyParser = require('body-parser')
const { exec } = require('child_process')

// Initialize express and define a port
const app = express()
const PORT = 3005

// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json())

app.post('/update', (req, res) => {
	exec('npm run build', console.log)
	res.status(200).end() // Responding is important
})

// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Update server running on port ${PORT}`))