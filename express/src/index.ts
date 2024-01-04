import prisma from '../lib/db'
import express from 'express'
// import upload from '../lib/storage'
import upload from '../lib/storage';

const app = express()

app.use(express.json())

app.post(`/user`, async (req, res) => {
  const { email, token } = req.body

  let result = null;

  if(email){
  result = await prisma.user.findUnique({
    where: {
      email: String(email),
    }
  })
  }
  else if(token){
    result = await prisma.user.findUnique({
      where:{
        auth0token: String(token)
      }
    })
  }

  if(result != null)
    res.json(result)
  else
    res.json({error: "User not found!"})
})

// Set up a route for file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  // Handle the uploaded file
  res.json({ message: 'File uploaded successfully!' });
});



const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)