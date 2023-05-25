const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const { JSDOM } = require('jsdom');
const colors = require('colors');
const { error } = require('console');

const dir = 'C:/Users/VIC/Desktop/tesuto';
const testfile = 'C:/Users/VIC/Desktop/tesuto/doc1.md';
const testtxtFile = 'C:/Users/VIC/Desktop';
const testfileRel = 'tesuto/doc1.md';

// const dir = process.argv[2];

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
  console.log('este es file****************', file, 'este es dataaaaaaaaaaaaaaaaaaaaaa', data);
  console.log('aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii', objsArray);
  return objsArray;
};

const readMdFile = (route) => new Promise((resolve, reject) => {
  fs.readFile(route, 'utf8', (err, data) => {
    if (err) reject(new Error(err));
    resolve(getLinks(route, data));
    // console.log('jax'.red, data);
  });
});

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
