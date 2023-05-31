const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const { JSDOM } = require('jsdom');
const colors = require('colors');
const { error, Console } = require('console');

const dir = 'C:/Users/VIC/Desktop/tesuto';
const testfile = 'C:/Users/VIC/Desktop/tesuto/doc1.md';
const testtxtFile = 'C:/Users/VIC/Desktop';
const testfileRel = 'tesuto/doc1.md';

// const inputDir = process.argv[2];
const inputOp1 = process.argv[3];
const inputOp2 = process.argv[4];

// resolver ruta relative a absolute
const convertToAbsolute = (route) => {
  if (path.isAbsolute(route)) { return route; }
  const absolutePath = path.resolve(route);
  return absolutePath;
};

// console.log(convertToAbsolute(testfileRel));

const getAllMdFiles = (route) => {
  let routeArray = [];
  if (fs.statSync(route).isFile()) {
    routeArray.push(route);
  } else {
    const readDir = fs.readdirSync(route);
    readDir.forEach((element) => {
      const newLink = path.join(route, element);
      if (fs.statSync(newLink).isDirectory()) {
        routeArray = routeArray.concat(getAllMdFiles(newLink));
      } else {
        routeArray.push(newLink);
      }
    });
  }
  return routeArray.filter((file) => path.extname(file) === '.md');
};

getAllMdFiles(dir);

const getLinks = (file, data) => {
  const objsArray = [];
  const md = new MarkdownIt();
  const result = md.render(data);
  const dom = new JSDOM(result);
  const { document } = dom.window;
  const links = document.querySelectorAll('a');
  links.forEach((item) => {
    const href = item.getAttribute('href');
    if (href.startsWith('https')) {
      objsArray.push({ href, text: item.textContent, file });
    }
  });
  // console.log('este es file****************', file, 'este es dataaaaaaaaaaaaaaaaaaaaaa', data);
  // console.log('aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii', objsArray);
  return objsArray;
};

const readMdFile = (route) => new Promise((resolve, reject) => {
  fs.readFile(route, 'utf8', (err, data) => {
    if (err) reject(new Error(err));
    resolve(getLinks(route, data));
    // console.log('jax'.red, data);
  });
});

const checkLinks = (array) => Promise.all(array.map((obj) => fetch(obj.href)
  .then((response) => {
    const x = {
      href: obj.href,
      text: obj.text,
      file: obj.file,
      status: response.status,
      statusText: response.statusText,
    };
    return x;
  })
  .catch((err) => {
    console.log(`Hubo un problema con la petición Fetch: ${err.message}`);
  })));

const checkLinks2 = (array) => new Promise((resolve, reject) => {
  checkLinks(array)
    .then((res) => resolve(res))
    .catch((err) => reject(err));
});

const getStats = (array) => {
  const totalLinks = array.length;
  // console.log('total: ', totalLinks);
  const hrefArray = array.map((element) => element.href);
  const uniqueLinks = new Set(hrefArray).size;
  // console.log('este es el size', un);
  return (`Total: ${totalLinks}
Unique: ${uniqueLinks}
`).blue;
  // const brokenLink = array2.map((element) => element.statusText);
};

const getBrokenLinks = (array) => {
  // const statusTextArray = array.map((element) => element.statusText);
  const brokenLinks = array.filter((e) => e.statusText !== 'OK').length;
  return (`Broken: ${brokenLinks}`).red;
};

/*
const checkLinks = (array) => {
  Promise.all(array.map((obj) => fetch(obj.href)
    .then((response) => console.log(obj.href, obj.text, obj.file, response.status, response.statusText))));
};
*/

/*
const validateLinks = (array) => {
  let output = '';
  if (inputOp1 === '' && inputOp2 === '') {
    console.log('este es el sin validate');
    output = array;
  } else if (inputOp1 === '--validate' || inputOp2 === '--validate') {
    console.log('este es el con validate');
    output = checkLinks(array);
  }
  return output;
};
*/

// console.log('chapalapachala', readMdFile(testfile));

/*
// para leer todos los
const readAllMdFiles = (array) => Promise.all(array.map((element) => readMdFile(element)))
  .then((res) => {
    console.log('este es el res-->', res);
  })
  .catch((err) => {
    console.error(err);
  });
*/

module.exports = {
  convertToAbsolute,
  getAllMdFiles,
  readMdFile,
  getLinks,
  checkLinks,
  inputOp1,
  inputOp2,
  checkLinks2,
  getStats,
  getBrokenLinks,
};

// readAllMdFiles(arrayMd);

/*
  readMdFile(element)
.then((res)=>{
  console.log('-------------------- saliendo por el then',res)
})
.catch((err)=>{
  console.log(err)
})

*/

/*
readMdFile(getAllMdFiles(dir))
.then((res)=>{
  console.log('-------------------- saliendo por el then',res)
})
.catch((err)=>{
  console.log(err)
})
*/

/*
module.exports = convertToAbsolute;
module.exports = getAllMdFiles;
*/

// path.extname(file)

/*
let stats = fs.statSync(dir);
console.log('is file ? ' + stats.isFile());

stats = fs.statSync(file);
console.log('is directory ? ' + stats.isDirectory());
*/

/*
// leer archivo de forma a asíncrona
fs.readFile(file, 'utf8',(err, data) => {
  if (err) throw err;
  console.log(data.rainbow);
});

// leer directorio guardado en una const
const recursive = fs.readdirSync(dir)
// imprimir cda archivo del directorio
recursive.forEach(file => {
  console.log(file.red);
});

*/
