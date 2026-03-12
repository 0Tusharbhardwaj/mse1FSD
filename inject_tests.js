const fs = require('fs');
const http = require('http');

const makeRequest = (options, postData = null) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          body: JSON.parse(data || '{}')
        });
      });
    });
    
    req.on('error', (e) => { reject(e); });
    
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
};

const runTests = async () => {
  let output = '';
  const log = (str) => {
    output += str + '\n';
  };
  
  // 1. POST
  const postData = JSON.stringify({
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    isbn: "978-0262033848",
    genre: "Computer Science",
    publisher: "MIT Press",
    totalCopies: 10
  });
  
  const postRes = await makeRequest({
    hostname: 'localhost', port: 5000, path: '/books', method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(postData) }
  }, postData);
  
  log('### a) POST /books (Add a New Book)');
  log('```json\n// POST Request Body\n' + postData + '\n```');
  log('```json\n// Response Status: ' + postRes.status + '\n' + JSON.stringify(postRes.body, null, 2) + '\n```\n');
  
  const newBookId = postRes.body.data._id;
  
  // 2. GET ALL
  const getAllRes = await makeRequest({ hostname: 'localhost', port: 5000, path: '/books', method: 'GET' });
  log('### b) GET /books (Get All Books)');
  log('```json\n// Response Status: ' + getAllRes.status + '\n' + JSON.stringify(getAllRes.body, null, 2) + '\n```\n');
  
  // 3. GET ONE
  const getOneRes = await makeRequest({ hostname: 'localhost', port: 5000, path: `/books/${newBookId}`, method: 'GET' });
  log('### c) GET /books/:id (Get Single Book)');
  log('```json\n// GET /books/' + newBookId + '\n// Response Status: ' + getOneRes.status + '\n' + JSON.stringify(getOneRes.body, null, 2) + '\n```\n');
  
  // 4. PUT
  const putData = JSON.stringify({ totalCopies: 15 });
  const putRes = await makeRequest({
    hostname: 'localhost', port: 5000, path: `/books/${newBookId}`, method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
  }, putData);
  log('### d) PUT /books/:id (Update Book)');
  log('```json\n// PUT Request Body\n' + putData + '\n```');
  log('```json\n// Response Status: ' + putRes.status + '\n' + JSON.stringify(putRes.body, null, 2) + '\n```\n');
  
  // 5. SEARCH
  const searchRes = await makeRequest({ hostname: 'localhost', port: 5000, path: '/books/search?title=Algor', method: 'GET' });
  log('### e) GET /books/search?title=xyz');
  log('```json\n// Response Status: ' + searchRes.status + '\n' + JSON.stringify(searchRes.body, null, 2) + '\n```\n');

  // 6. DELETE
  const delRes = await makeRequest({ hostname: 'localhost', port: 5000, path: `/books/${newBookId}`, method: 'DELETE' });
  log('### f) DELETE /books/:id (Delete Book)');
  log('```json\n// Response Status: ' + delRes.status + '\n' + JSON.stringify(delRes.body, null, 2) + '\n```\n');
  
  // Read template and replace
  let template = fs.readFileSync('Submission_Template.md', 'utf8');
  
  const regex = /### a\) POST \/books \(Add a New Book\)[\s\S]*?### f\) GET \/books\/search\?title=xyz[\s\S]*?---\n/m;
  
  // Notice my script above has e as SEARCH and f as DELETE but the template has f as SEARCH and e as DELETE. 
  // Let's replace the whole section from "a) POST" to the next "---"
  const injectionBoundary1 = template.indexOf('### a) POST /books (Add a New Book)');
  const injectionBoundary2 = template.indexOf('## 4. MongoDB Storage (Atlas)');
  
  if (injectionBoundary1 !== -1 && injectionBoundary2 !== -1) {
    const before = template.substring(0, injectionBoundary1);
    const after = template.substring(injectionBoundary2);
    fs.writeFileSync('Submission_Template.md', before + output + '\n---\n\n' + after);
    console.log('Successfully injected API responses into Submission_Template.md');
  } else {
    console.log('Could not find injection boundaries.');
  }
};

runTests();
