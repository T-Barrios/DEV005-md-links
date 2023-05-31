const {
  convertToAbsolute, getAllMdFiles, readMdFile, readAllMdFiles, getLinks, checkLinks, inputOp1, inputOp2, checkLinks2, getStats,
} = require('./functions');

const inputPath = process.argv[2];


const dir = 'C:/Users/VIC/Desktop/tesuto';
const file = 'C:/Users/VIC/Desktop/tesuto/doc1.md';
const txtFile = 'C:/Users/VIC/Desktop/tesuto/txtfile.txt';
const fileRel = 'rel-doc1.md';

const mdLinks = (path, options = { validate: false }) => new Promise((resolve, reject) => {
  const pathAbs = convertToAbsolute(path);
  // console.log(pathAbs);
  const allMd = getAllMdFiles(pathAbs);
  // console.log(allMd);
  Promise.all(allMd.map((element) => readMdFile(element)))
    .then((res) => {
      // console.log('este es el res-->', res);
      const finalArray = [].concat(...res);
      if (!options.validate) {
        resolve(finalArray);
      } else {
        resolve(checkLinks2(finalArray));
      }
    })
    .catch((err) => {
      reject(console.error(err));
    });
});

/*
mdLinks(inputPath, inputOp1)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
*/

module.exports = { mdLinks };
