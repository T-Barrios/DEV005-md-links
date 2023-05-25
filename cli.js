const { mdLinks } = require('./index');

const inputPath = process.argv[2];
const dir = 'C:/Users/VIC/Desktop/tesuto';
const link = 'https://www.tiktok.com/@capivaramemess/video/7200751737957879045';

/*
mdLinks(dir)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
*/

fetch('http://example.com/movies.json')
  .then((response) => response.json())
  .then((data) => console.log(data));
