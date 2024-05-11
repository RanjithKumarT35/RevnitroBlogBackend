const express = require("express");
const blogRouter = require("./routes/blogRoute");
const bodyParser = require("body-parser");
const imgur = require("imgur");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
// connect to DB
try {
  mongoose.connect(process.env.mongoUrl);
  console.log("connected to mongoDB");
} catch (err) {
  console.log(err);
}
// setup routes
app.use("/uploads", express.static("uploads"));
app.post("/upload", (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }
  let sampleFile = req.files.sampleFile;
  let uploadPath = __dirname + "/uploads/" + sampleFile.name;
  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }
    // Save the buffer to a temporary file
    fs.writeFileSync(uploadPath, sampleFile.data);
    // Upload to Imgur
    imgur.uploadFile(uploadPath).then((urlObject) => {
      fs.unlinkSync(uploadPath);
      console.log(urlObject.data.link);
      res.send({ link: urlObject.data.link });
    });
  });
});

app.use("/blog", blogRouter);

app.listen(PORT, () => {
  console.log(`server started on port :${PORT}`);
});
