const express = require('express');
const mongoose = require('mongoose');
const fileRoutes = require('./routes/fileRoutes');
const multer = require('multer');
const app = express();

mongoose.connect('mongodb://localhost:27017/filesupload', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', fileRoutes);
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      // Handle Multer errors
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(400).send('Error: File size exceeds 300KB limit.');
      } else {
        res.status(400).send(`Multer Error: ${err.message}`);
      }
    } else if (err) {
      // Handle other errors
      res.status(400).send(err);
    } else {
      next();
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/upload`);
});
