const {
  convertToAbsolute, getAllMdFiles, readMdFile, readAllMdFiles, getLinks,
} = require('../functions');

/*
const mdLinks = require('..');

describe('mdLinks', () => {
  it('should...', () => {
    console.log('FIX ME!');
  });
});
*/

describe('convertToAbsolute', () => {
  it('is a function', () => {
    expect(typeof convertToAbsolute).toBe('function');
  });
  it('should return true', () => {
    const relativePath = 'tesuto/doc1.md';
    expect(convertToAbsolute(relativePath)).toBe('C:\\Users\\VIC\\Pictures\\GIT HUB\\DEV005-md-links\\tesuto\\doc1.md');
  });
});

describe('getAllMdFiles', () => {
  it('is a function', () => {
    expect(typeof getAllMdFiles).toBe('function');
  });
  it('should return the routes of all .md files of the directory', () => {
    const dirPath = 'C:/Users/VIC/Desktop/tesuto';
    const mdArray = [
      'C:\\Users\\VIC\\Desktop\\tesuto\\dir1\\faq-test.md',
      'C:\\Users\\VIC\\Desktop\\tesuto\\dir1\\readme-test.md',
      'C:\\Users\\VIC\\Desktop\\tesuto\\doc1.md',
    ];
    expect(getAllMdFiles(dirPath)).toEqual(mdArray);
  });
  it('should return the route of the .md file', () => {
    const filePath = 'C:/Users/VIC/Desktop/tesuto/doc1.md';
    const mdArray = ['C:/Users/VIC/Desktop/tesuto/doc1.md'];
    expect(getAllMdFiles(filePath)).toEqual(mdArray);
  });
});

describe('getLinks', () => {
  it('is a function', () => {
    expect(typeof getLinks).toBe('function');
  });
  it('should return an array with the info of each link as an object (href, text, file)', () => {
    const fileRoute = 'C:/Users/VIC/Desktop/tesuto/doc1.md';
    const dataOfFile = '[capibaras lindos de tiktok](https://www.tiktok.com/@capivaramemess/video/7200751737957879045)' + '\n' + '[Markdown](https://es.wikipedia.org/wiki/Markdown)';
    const arrayLinkInfo = [
      {
        file: 'C:/Users/VIC/Desktop/tesuto/doc1.md',
        href: 'https://www.tiktok.com/@capivaramemess/video/7200751737957879045',
        text: 'capibaras lindos de tiktok',
      },
      {
        file: 'C:/Users/VIC/Desktop/tesuto/doc1.md',
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
      },
    ];
    expect(getLinks(fileRoute, dataOfFile)).toEqual(arrayLinkInfo);
  });
});

/*
describe('readMdFile', () => {
  it('is a function', () => {
    expect(typeof readMdFile).toBe('function');
  });
  it('should return promise pending', () => {
    expect(readMdFile()).toBe('Promise { <pending> }');
  });
});
*/

/*
describe('...', () => {
  it('is a ...', () => {
    expect().toBe();
  });
  it('should return ...', () => {
    expect().toBe();
  });
});
*/
