const _bcryptjs = require('bcryptjs');
const bcrypt = {
  hash: (data, salt) => new Promise((resolve, reject) => _bcryptjs.hash(data, salt, (err, hashed) => err ? reject(err) : resolve(hashed)))
};

async function run() {
  const plain = 'KOPIPUHU123'; // ganti sesuai password admin
  const hash = await bcrypt.hash(plain, 10);
  console.log('HASH:', hash);
}

run();
