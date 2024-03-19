const fs = require("fs");
const fileUpload = require("express-fileupload");
const md5 = require("md5");
const sharp = require("sharp");

function getFileExtension(filename) {
  return filename.split(".").slice(-1)[0];
}

module.exports = function (app) {
  app.use(fileUpload());

  app.post("/addEntity/", (request, response) => {
    let filename = md5(new Date());
    let typePath = "";

    let moveFilePromise;

    if (request.files?.back) {
      typePath = "backgrounds/";
      filename += "." + getFileExtension(request.files.back.name);
      moveFilePromise = request.files.back.mv("assets/" + typePath + filename);
    } else if (request.files?.image) {
      typePath = "images/Прочее/";
      filename += "." + getFileExtension(request.files.image.name);
      moveFilePromise = request.files.image.mv("assets/" + typePath + filename);
    }

    moveFilePromise
      .then(() => {
        sharp("assets/" + typePath + filename)
          .resize(200)
          .webp({
            quality: 80,
            lossless: false,
          })
          .toFile(
            "assets/resize_cache/" + typePath + filename,
            (error, info) => {
              if (error) {
                response.end(
                  JSON.stringify({
                    status: "error",
                    msg: error,
                  })
                );
              } else {
                response.end(
                  JSON.stringify({
                    status: "success",
                    msg: info,
                    path: "resize_cache/" + typePath + filename,
                  })
                );
              }
            }
          );
      })
      .catch(() => {
        response.end(
          JSON.stringify({
            status: "error",
            msg: "Error in file upload",
          })
        );
      });
  });
};
