var express = require("express");
var router = express.Router();
require("dotenv").config();

const fs = require("fs");
const multer = require("multer");
const Img = require("./ImgModel");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads/");
  },
});

const download = require("image-downloader");

function downloadImage(url, filepath) {
  return download.image({
    url,
    dest: filepath,
  });
}

// const download = require("image-downloader");

const options = {
  url: "https://mangadex.org/covers/1e947c52-7a55-42b0-b6ec-b13a8dfb0d26/a6fa0dfb-5156-4dab-a0b4-a41fcfb571aa.png.256.jpg",
  dest: "../../uploads", // will be saved to /path/to/dest/image.jpg
};

downloadImage(
  "https://mangadex.org/covers/4a430d2b-f4d7-41f4-a1e4-cab1fef34e05/c3d626d5-e4ee-417d-ad0d-2d57271bef24.png",
  "../../uploads"
);

// download
//   .image(options)
//   .then(({ filename }) => {
//     console.log("Saved to", filename); // saved to /path/to/dest/image.jpg
//   })
//   .catch((err) => console.error(err));

const upload = multer({ storage: storage });

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGOURI;

router.route("/").post(upload.single("file"), function (req, res) {
  var new_img = new Img();
  new_img.img.data = fs.readFileSync(req.file.path);
  new_img.img.contentType = "image/jpeg";
  new_img.save();
  res.json({ message: "New image added to the db!" });
});
/* GET users listing. */
// router.get("/", async function (req, res, next) {
//   const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverApi: ServerApiVersion.v1,
//   });
//   console.log("Connecting...");
//   await client.connect();
//   console.log("Connected!");

//   await client.db("Manga").createCollection("Covers").catch(console.error);
//   res.send("Responded with a image");
//   client.close();
//   console.log("Connection Closed");
// });

router.route("/").get(function (req, res) {
  res.contentType("image/jpeg");
  // res.send("./uploads/");
  res.sendFile(
    "/Users/jeffreyhuang/VSCode/ImageStores/uploads/a6fa0dfb-5156-4dab-a0b4-a41fcfb571aa.png.256.jpg"
  );
  // Img.findOne({}, "img createdAt", function (err, img) {
  //   if (err) res.send(err);
  //   res.send(img);
  // }).sort({ createdAt: "desc" });
});

module.exports = router;
