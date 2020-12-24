// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const movielist = require('./movies.json')
const app = express()
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { movies: movielist.results })
})

app.get('/movies/:movie_id', (req, res) => {
  const movie_id = req.params.movie_id
  const movie = movielist.results.find(item => item.id.toString() === movie_id)
  res.render('show', { movie: movie })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movies = movielist.results.filter(item => item.title.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', { movies: movies, keyword: keyword })

})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})
