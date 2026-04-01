const http = require('http');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'uploads', 'users_import.xlsx');
const fileData = fs.readFileSync(filePath);
const boundary = '----FormBoundary' + Date.now();

let body = Buffer.concat([
  Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="users_import.xlsx"\r\nContent-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\r\n\r\n`),
  fileData,
  Buffer.from(`\r\n--${boundary}--\r\n`)
]);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/v1/upload/excel_users',
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=' + boundary,
    'Content-Length': body.length
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    let parsed = JSON.parse(data);
    console.log('Total:', parsed.length);
    let success = parsed.filter(r => r.status === 'success').length;
    let errors = parsed.filter(r => r.error);
    console.log('Success:', success);
    console.log('Errors:', errors.length);
    if (errors.length > 0) console.log('First error:', JSON.stringify(errors[0]));
    console.log('First 3:', JSON.stringify(parsed.slice(0, 3), null, 2));
  });
});
req.write(body);
req.end();
