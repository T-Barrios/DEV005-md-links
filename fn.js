const fs = require('fs');
const path = require("path");
const colors = require('colors');

const dir = 'C:/Users/VIC/Pictures/GIT HUB/DEV005-md-links/tesuto'
const file = 'C:/Users/VIC/Pictures/GIT HUB/DEV005-md-links/tesuto/doc1.md'
const txtFile = 'C:/Users/VIC/Pictures/GIT HUB/DEV005-md-links/tesuto/txtfile.txt'
const fileRel = 'tesuto/doc1.md'

// resolver ruta relative a absolute
const convertToAbsolute = (link) => {
  const absolutePath = path.resolve(link);
  // console.log('este funciona ', absolutePath.yellow)
  return absolutePath
}

convertToAbsolute(fileRel)

const r = (link) => {
  let linkArray = []
  if (fs.statSync(link).isFile()) {
    console.log(link, ' es un archivo'.cyan);
    linkArray.push(link)
    console.log(linkArray, 'este es el array del if del archivo'.cyan)
  } else {
    // console.log('is directory ? ' + fs.statSync(link).isDirectory());
    const readDir = fs.readdirSync(link)
    readDir.forEach(element => {
      let newLink = path.join(link, element)
      console.log(element, 'estos son los elementos del DIR'.red)
      if(fs.statSync(newLink).isDirectory()){
        linkArray = linkArray.concat(r(newLink));
        // console.log('SI es DIR --> ',link)
      } else {
        linkArray.push(newLink)
      }
    });
  }
  return linkArray.filter(file => path.extname(file) === '.md');
}
console.log('array final final con todos los archivos md'.rainbow, r(dir))






// path.extname(file)

r(dir)

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