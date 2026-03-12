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
  console.log('--- START API TESTS ---');
  
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
    hostname: 'localhost',
    port: 5000,
    path: '/books',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  }, postData);
  
  console.log('\n--- POST /books ---');
  console.log(`Status: ${postRes.status}`);
  console.log(JSON.stringify(postRes.body, null, 2));
  
  const newBookId = postRes.body.data._id;
  
  // 2. GET ALL
  const getAllRes = await makeRequest({
    hostname: 'localhost', port: 5000, path: '/books', method: 'GET'
  });
  console.log('\n--- GET /books ---');
  console.log(`Status: ${getAllRes.status}`);
  console.log(JSON.stringify(getAllRes.body, null, 2));
  
  // 3. GET ONE
  const getOneRes = await makeRequest({
    hostname: 'localhost', port: 5000, path: `/books/${newBookId}`, method: 'GET'
  });
  console.log(`\n--- GET /books/${newBookId} ---`);
  console.log(`Status: ${getOneRes.status}`);
  console.log(JSON.stringify(getOneRes.body, null, 2));
  
  // 4. PUT
  const putData = JSON.stringify({ totalCopies: 15 });
  const putRes = await makeRequest({
    hostname: 'localhost', port: 5000, path: `/books/${newBookId}`, method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
  }, putData);
  console.log(`\n--- PUT /books/${newBookId} ---`);
  console.log(`Status: ${putRes.status}`);
  console.log(JSON.stringify(putRes.body, null, 2));
  
  // 5. SEARCH
  const searchRes = await makeRequest({
    hostname: 'localhost', port: 5000, path: '/books/search?title=Algor', method: 'GET'
  });
  console.log('\n--- GET /books/search?title=Algor ---');
  console.log(`Status: ${searchRes.status}`);
  console.log(JSON.stringify(searchRes.body, null, 2));
  
  // 6. DELETE
  const delRes = await makeRequest({
    hostname: 'localhost', port: 5000, path: `/books/${newBookId}`, method: 'DELETE'
  });
  console.log(`\n--- DELETE /books/${newBookId} ---`);
  console.log(`Status: ${delRes.status}`);
  console.log(JSON.stringify(delRes.body, null, 2));
};

runTests();
