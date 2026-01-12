const https = require('https');

const API_KEY = 'AIzaSyDDJEvvBlRzCmuO8ZzDOfaMjpw7nyOIqyA';

const postData = JSON.stringify({
  contents: [{
    parts: [{
      text: 'What is 2 + 2? Answer briefly.'
    }]
  }]
});

const options = {
  hostname: 'generativelanguage.googleapis.com',
  path: `/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('Testing Gemini API...\n');
console.log('URL:', `https://${options.hostname}${options.path.substring(0, 50)}...`);
console.log('\nSending request...\n');

const req = https.request(options, (res) => {
  let data = '';
  
  console.log('Status Code:', res.statusCode);
  console.log('Status Message:', res.statusMessage);
  console.log('\nResponse Headers:', res.headers);
  console.log('\n--- Response Body ---');

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(data);
    console.log('\n--- End Response ---\n');
    
    try {
      const parsed = JSON.parse(data);
      if (parsed.candidates && parsed.candidates[0]) {
        console.log('✅ SUCCESS! AI Response:', parsed.candidates[0].content.parts[0].text);
      } else if (parsed.error) {
        console.log('❌ API ERROR:', parsed.error.message);
        console.log('Error Code:', parsed.error.code);
        console.log('Error Status:', parsed.error.status);
      }
    } catch (e) {
      console.log('❌ Failed to parse JSON');
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request Error:', error.message);
});

req.write(postData);
req.end();
