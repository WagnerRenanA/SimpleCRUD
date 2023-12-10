const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')

//add EJS
app.set('view engine', 'ejs')

///Mongodb connections no mongoose
const connectionString = 'mongodb+srv://klawmediallc:7afueraTest1@7afuera.7t1vhsc.mongodb.net/star-war-quotes?retryWrites=true&w=majority'

MongoClient.connect(connectionString, (err, client) => {
	
	if (err) return console.error(err)
	console.log('Connected to Database Without Unified TOP')
})


//try mongoose connect
const url = 'mongodb+srv://klawmediallc:7afueraTest1@7afuera.7t1vhsc.mongodb.net/star-war-quotes?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true })
mongoose.connect(url, {useUnifiedTopology: true})

const db2 = mongoose.connection
db2.once('open', _ => {
	console.log('Database connected:', url)
})

//test if mongoose connection works
//db2.once('open', _ => {
//const db = client.db('star-wars-quotes')
//	  const quotesCollection = db.collection('quoteNew')

//	  app.post('/quotes', (req, res) => {
//		quotesCollection
//		  .insertOne(req.body)
//		  .then(result => {
//			console.log(result)
//		  })
//		  .catch(error => console.error(error))
//	  })
//})

//db2.on('error', err => {
//	console.error('connection error:', err)
//})


db2.collection('quoteNew').insertOne(
	{
		name: "Obi-Wan",
		quote: "Teach them we must, bros Is this Still working?"
	}
)
	

//db2.collection('quotes').find(
//	{
//		name: "Yoda"
//	}
//)

// testing for to access specific datbases in MongoDB atlas
//MongoClient.connect(connectionString, { useUnifiedTopology:true }).then( client => {
	
	
//	  console.log('Connected to Database')
//	  const db = client.db('star-wars-quotes')
//	  const quotesCollection = db.collection('quoteNew')

//	  app.post('/quotes', (req, res) => {
//		quotesCollection
//		  .insertOne(req.body)
//		  .then(result => {
//			console.log(result)
//		  })
//		  .catch(error => console.error(error))
//	  })
//	})
//	.catch(console.error)


// bodyParser middle ware to get CRUD Data from inputs
app.use(bodyParser.urlencoded({ extended: true}))

app.listen(3000, function () {
	console.log('listening on 3000')
})



//server.js
console.log('May Node be with you')

// sending a request/response back to the browser
//app.get('/', (req,res) => {
//	res.send('Hello World')
//})

// log what directory I am in
console.log(__dirname)

// serve up a file back to the browser. (this was before connecting to MongoDB atlas)
//app.get('/', (req, res) => {
	
//	res.sendFile(__dirname + '/index.html')
//})
// serve up a file back to the browser. (this was before connecting to MongoDB atlas)

// Create/POST request to add input data
//app.post('/quotes', (req, res) => {
//	console.log('Working')
//})

//consol log the input data from the form

//app.post('/quoteOLD', (req, res) => {
	
//	console.log(req.body)
	

//})

//mongoose.set('useUnifiedTopology', true);

MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(
	client => {
	console.log('Connected to Database Using Unified Topology')
	const db = client.db('star-wars-quotes')

	const quotesCollection = db.collection('quoteNew')

	/////Test app.post to MongoDB database
	app.post('/quotes', (req, res) => {
		quotesCollection
		  .insertOne(req.body)
		  .then(result => {
			//console.log(result)
			res.redirect('/')
		  })
		  .catch(error => console.error(error))
	  })

	/////test get
	/////Test app.get to MongoDB database
	app.get('/', (req, res) => {
		db.collection('quoteNew')
			.find()
			.toArray()
			.then(results => {
				res.render('index.ejs', { quotes: results })
		})
		.catch(/* ... */)
		
	})
	

})
.catch(console.error)
	
//app.post('/quotes', (req, res) => {
//			quotesCollection
//			  .insertOne(req.body)
//			  .then(result => {
//				console.log(result)
//			  })
//			  .catch(error => console.error(error))
//		  })
