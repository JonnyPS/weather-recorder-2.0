const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');
process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => {
		// res.send('An alligator approaches... slowly!');
		res.json({res: "An alligator approaches.... slowly"})
});

app.listen(port, () => console.log(`Gator app listening on port ${port}!`));