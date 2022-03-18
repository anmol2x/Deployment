const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()




// const MONGODB_URI = process.env.ATLAS_URI

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/loyalRegisteration",
{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>{
    console.log("connected to db");
}).catch(()=>{
    console.log("db not connected");
})

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})

