import fs from 'fs'
import path from 'path'
import { pd } from 'pretty-data'
const dir = './src/assets/generative/pieces'

const pieces = fs.readdirSync(dir).reduce((accum, file) => {
	if (path.extname(file) == '.json') {

		accum = [...accum, ...JSON.parse(fs.readFileSync(path.join(dir, file))).pieces]
	}
	return accum
}, [])


fs.writeFileSync('./src/assets/generative/pieces.json', pd.json({pieces}))