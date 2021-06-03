const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const port = 3004

const app = express()

app.use(express.static(path.join(__dirname, '../dist')))

app.use(bodyParser.text())
app.post('/subscribe', (req, res) => {
	fs.appendFile('./subscriptions.txt', req.body + '\n', (err) => {
		if (err) {
			res.sendStatus(500)
			throw err
		}
		res.sendStatus(201)
	})
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})