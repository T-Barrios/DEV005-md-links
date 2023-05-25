module.exports = () => {
  // ...
};


/*

const recursive = (route) => {
    let arrayMd = []
  if  (fs.statSync(route).isFile()){
    arrayMd.push(route)
  } else {
    const elements = fs.readdirSync(route)
    elements.forEach(element => {
        let newRoute = path.join(route, element);
        if (fs.statSync(newRoute).isDirectory()){
            arrayMd = arrayMd.concat(recursive(newRoute));
        }else{
            arrayMd.push(newRoute)
        }
    })    
  }
  return arrayMd.filter(file => path.extname(file) === '.md');
}
 console.log('Archivos con extensión .md:', recursive(routeDirectorio));

*/