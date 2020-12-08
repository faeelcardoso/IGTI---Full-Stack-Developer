// Boa referência:
// https://oieduardorabelo.medium.com/javascript-armadilhas-do-asyn-await-em-loops-1cdad44db7f0

const BANDS_BACKEND = 'http://localhost:3001/bands';
const MEMBERS_BACKEND = 'http://localhost:3002/members';

async function start() {
  //console.log('Utilizando async forEach');
  //await getDreamTheaterAsyncForEach();
  //console.log('Utilizando for...of');
  //await getDreamTheaterForOf();

  await testarPromiseAll();
}

async function getDreamTheaterAsyncForEach() { // forEach com assíncrono n funfa direito, vai tudo desorganizado
  const bandsUrl = [`${BANDS_BACKEND}/b1`, `${BANDS_BACKEND}/b2`];

  bandsUrl.forEach(async url => {
    const json = await fetchJson(url);
    console.log(json);
  });

  const membersUrl = [
    `${MEMBERS_BACKEND}/m4`,
    `${MEMBERS_BACKEND}/m5`,
    `${MEMBERS_BACKEND}/m6`,
  ];

  membersUrl.forEach(async url => {
    const json = await fetchJson(url);
    console.log(json);
  });
}

async function getDreamTheaterForOf() {
  const bandsUrl = [`${BANDS_BACKEND}/b1`, `${BANDS_BACKEND}/b2`];

  //for (let i = 0; i < bandsUrl.length; i++) {
  //for (const [index, url] of bandsUrl.entries()) {
  for (const url of bandsUrl) {
    const json = await fetchJson(url);
    console.log(json);
  }

  const membersUrl = [
    `${MEMBERS_BACKEND}/m4`,
    `${MEMBERS_BACKEND}/m5`,
    `${MEMBERS_BACKEND}/m6`,
  ];

  for (const url of membersUrl) {
    const json = await fetchJson(url);
    console.log(json);
  }
}

function getRushPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetchJson(`${MEMBERS_BACKEND}?bandId=b1`).then(rush => {
        console.log('Obtendo Rush');
        resolve(rush);
      });
    }, 3000);
  });
}

function getDreamTheaterPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetchJson(`${MEMBERS_BACKEND}?bandId=b2`).then(dreamTheater => {
        console.log('Obtendo Dream Theater');
        resolve(dreamTheater);
      });
    }, 2000);
  });
}

async function testarPromiseAll() {
  // INÍCIO SEQUENCIAL
  // console.time('Rush Theater sequencial');
  // let rush = await getRushPromise();
  // let dreamTheater = await getDreamTheaterPromise();
  // let rushTheater = [...rush, ...dreamTheater];
  // console.log(rushTheater);
  // console.timeEnd('Rush Theater sequencial');
  // FIM SEQUENCIAL

  // INÍCIO PROMISE.ALL, MUITO MAIS RÁPIDO
  console.log('\n');
  console.time('Rush Theater Promise.all');

  let [rush, dreamTheater] = await Promise.all([
    getRushPromise(),
    getDreamTheaterPromise(),
  ]);

  rushTheater = [...rush, ...dreamTheater];
  console.log(rushTheater);
  console.timeEnd('Rush Theater Promise.all');
  // FIM PROMISE.ALL
}

async function fetchJson(url) {
  const resource = await fetch(url);
  const json = await resource.json();
  return json;
}

start();