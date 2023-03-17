const express = require('express')
const multer = require('multer')
const cors = require('cors')
const app = express()

let img = []
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
  cb(null, Date.now() + ".jpeg")
  }
  })
const upload = multer({ storage: storage })
app.use(cors())
app.use(express.json())
app.use('/see', express.static('./uploads'));

app.get('/', (req, res) => {
  res.send('HI')
})

app.post('/upload', upload.single('file'),(req, res) => {
  data = req.file
  res.status(200).send('ok img')
  img.push(data)
  console.log(data)
})

app.get('/img',(req, res) => {
  res.json(img[0])
})

app.listen(3001, () => console.log('Running on port 3001'))