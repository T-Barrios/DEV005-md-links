const {
  convertToAbsolute, getAllMdFiles, readMdFile, readAllMdFiles, getLinks,
} = require('./functions');

const inputPath = process.argv[2];

const dir = 'C:/Users/VIC/Desktop/tesuto';
const file = 'C:/Users/VIC/Desktop/tesuto/doc1.md';
const txtFile = 'C:/Users/VIC/Desktop/tesuto/txtfile.txt';
const fileRel = 'rel-doc1.md';

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  const pathAbs = convertToAbsolute(path);
  // console.log(pathAbs);
  const allMd = getAllMdFiles(pathAbs);
  // console.log(allMd);
  Promise.all(allMd.map((element) => readMdFile(element)))
    .then((res) => {
      // console.log('este es el res-->', res);
      const finalArray = [].concat(...res);
      resolve(finalArray);
    })
    .catch((err) => {
      reject(console.error(err));
    });
});

mdLinks(inputPath)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = { mdLinks };
