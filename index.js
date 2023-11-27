const express = require('express')
const app = express()
const path = require('path')
const { v4: uuid } = require('uuid')
const methodOverride = require('method-override')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))

let comments = [
    {
        id:uuid(),
        username: 'Virat Kohli',
        comment: 'I am the best batsman in the world'
    }, 
    {
        id:uuid(),
        username: 'Rohit Sharma',
        comment: 'I am the best opener in the world'
    }, 
    {
        id:uuid(),
        username: 'MS Dhoni',
        comment: 'I am the best finisher in the world'
    }, 
    {
        id:uuid(),
        username: 'AB De Villiers',
        comment: 'I am Mr. 360'
    }
]

// reading the comments
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({username, comment, id: uuid()})
    res.redirect('/comments')
})

app.get('/comments/:id', (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments')
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})

app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.get('/tacos', (req, res) => {
    res.send('GET /tacos response')
})

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body
    res.send(`OK, here are your ${qty} ${meat} tacos`)
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})