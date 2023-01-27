const fs= require ('fs')
const express= require ('express')
const exphbs = require ('express-handlebars')

// To bring in the jobs.json file
const dataJson1 = fs.readFileSync('jobs.json', 'utf-8')

// to convert to JS format using JSON
const dataArray1 = JSON.parse(dataJson1)


// To bring in the messages.json file
const dataJson2 = fs.readFileSync('messages.json', 'utf-8')

// to convert to JS format using JSON
const dataArray2 = JSON.parse(dataJson2)


// to bring in application.json file
const applicationsjson = fs.readFileSync('applications.json', 'utf-8')

// convert imported application.json file to javascript
const applicationArray = JSON.parse(applicationsjson)


const subsjson = fs.readFileSync('subscribers.json', 'utf-8')


const subscriberArray = JSON.parse(subsjson)



const app = express()

app.use(express.json())
app.use (express.urlencoded({extended: false})) 
app.use(express.static('public'))

app.engine('hbs', exphbs.engine({
    extname: '.hbs', defaultLayout: 'main', runtimeOptions:{
        allowProtoMethodsByDefault: true, allowProtoPropertiesByDefault: true
    }
}))


app.set('view engine', 'hbs')

// GET ROUTES

app.get('/index', (req, res)=>{

    res.render('index')
})

app.get('/contact', (req, res)=>{
    res.render('contact')
})

app.get('/about', (req, res)=>{
    res.render('about')
})

app.get('/job-detail', (req, res)=>{
    res.render('job-detail')
})

app.get('/latest-jobs', (req, res)=>{

    res.render('latest-jobs')
})


app.get('/post-a-job', (req, res)=>{

    res.render('post-a-job')
})


app.get('/category', (req, res)=>{

    res.render('category')
})

app.get('/admin', (req, res)=>{

   const totalMessages = dataArray2.length
   const totalJobsPosted = dataArray1.length
   const totalApplications = applicationArray.length

    res.render('admin', {totalMessages, totalJobsPosted, totalApplications})

    
})

app.get('/admin-jobs', (req, res)=>{
    res.render('admin-jobs', {dataArray1})

})

app.get('/admin-messages', (req, res)=>{


    res.render('admin-messages', {dataArray2})
})

app.get('/admin-applications', (req, res)=>{
    res.render('admin-applications', {applicationArray})
})

app.get('/*', (req, res)=>{
    res.render('404')
})


// POST ROUTES

app.post('/post-a-job', (req, res)=>{

// to push new jobs into dataArray1
    dataArray1.unshift(req.body)

    console.log(dataArray1)

// to convert imported dataArray1 to strings
   
    const stringedData = JSON.stringify(dataArray1)

// this is to overwrite or kind of update the original job.json file each time a new job is posted.
    fs.writeFileSync('jobs.json', stringedData)

    res.redirect('post-a-job')
})


app.post('/contact', (req, res)=>{


// to push new jobs into dataArray2
dataArray2.unshift(req.body)

console.log(dataArray2)

// to convert imported dataArray2 to strings

const stringedData2 = JSON.stringify(dataArray2)


fs.writeFileSync('messages.json', stringedData2)


    res.redirect('contact')
})


app.post('/admin-applications', (req, res)=>{

    applicationArray.unshift(req.body)

    console.log (applicationArray)

    const stringedData3 = JSON.stringify(applicationArray)

    fs.writeFileSync('applications.json', stringedData3)

    res.redirect('job-detail')
})


app.listen(3600, ()=>{
    console.log('app is now listening on port 3600')
})



