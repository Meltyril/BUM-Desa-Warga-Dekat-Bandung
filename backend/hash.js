const bcrypt = require('bcrypt');

async function run() {
  const plain = 'KOPIPUHU123'; // ganti sesuai password admin
  const hash = await bcrypt.hash(plain, 10);
  console.log('HASH:', hash);
}

run();
