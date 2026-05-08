const fs = require('fs');
const buffer = fs.readFileSync('src/pages/Home.tsx');
console.log(buffer.slice(0, 50));
console.log("Is valid UTF-8:", buffer.toString('utf8').includes('Maîtrise'));
console.log("Is Windows-1252?", buffer.toString('latin1').includes('MaÃ®trise'));
