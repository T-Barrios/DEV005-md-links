#!/usr/bin/env node
const { getStats, checkLinks2, getBrokenLinks } = require('./functions');
const { mdLinks } = require('./index');

const inputPath = process.argv[2];
const inputVal = process.argv[3];
const inputStats = process.argv[4];

const dir = 'C:/Users/VIC/Desktop/tesuto';
const link = 'https://www.tiktok.com/@capivaramemess/video/7200751737957879045';

if (inputVal === undefined && inputStats === undefined) {
  mdLinks(inputPath, { validate: false })
    .then((res) => {
      res.forEach((element) => {
        console.log('Href: ', element.href);
        console.log('Text: ', element.text);
        console.log('File: ', element.file);
        console.log('');
      });
    });
}
if (inputVal === '--validate' && inputStats === undefined) {
  mdLinks(inputPath, { validate: true })
    .then((res) => {
      res.forEach((element) => {
        console.log('Href: ', element.href);
        console.log('Text: ', element.text);
        console.log('File: ', element.file);
        console.log('Status: ', element.status);
        console.log('StatusText: ', element.statusText);
        console.log('');
      });
    });
}
if (inputVal === '--stats' && inputStats === undefined) {
  mdLinks(inputPath, { validate: true })
    .then((res) => {
      console.log(getStats(res));
    });
}
if (inputVal === '--validate' && inputStats === '--stats') {
  mdLinks(inputPath, { validate: true })
    .then((res) => {
      console.log(getStats(res).concat(getBrokenLinks(res)));
    });
}
