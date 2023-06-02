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

  const allMd = getAllMdFiles(pathAbs);
  Promise.all(allMd.map((element) => readMdFile(element)))
    .then((res) => {
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

module.exports = { mdLinks };
