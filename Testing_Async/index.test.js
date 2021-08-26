// Callbacks
// function fetchData(callback) {
//   setTimeout(() => {
//     callback("peanut butter");
//   }, 100);
// }

// Don't do this!
// test("the data is peanut butter", () => {
//   function callback(data) {
//     expect(data).toBe("peanut butter");
//   }

//   fetchData(callback);
// });

// Do this instead!
// test("the data is peanut butter", (done) => {
//   function callback(data) {
//     try {
//       expect(data).toBe("peanut butter");
//       done();
//     } catch (error) {
//       done(error);
//     }
//   }

//   fetchData(callback);
// });

//Promises
// function fetchDataPromise() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("peanut butter");
//     }, 100);
//   });
// }

function fetchDataPromiseWithError() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(("error"));
    }, 100);
  });
}

// test("the data should be peanut butter", () => {
//   return fetchDataPromise().then((data) => {
//     expect(data).toBe("peanut butter");
//   });
// });

// add catch method if you expect a promise to be rejected
// test('the fetch fails with an error', () => {
//   expect.assertions(1);
//   return fetchDataPromise().catch(e => expect(e).toMatch('error'));
// });

// test("the fetch fails with an error", () => {
//   expect.assertions(1);
//   return fetchDataPromiseWithError().catch((e) => expect(e).toMatch("error"));
// });

// .resolves / .rejects
function fetchDataPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("peanut butter");
    }, 100);
  });
}



// test('the data is peanut butter', () => {
//   return expect(fetchDataPromise()).resolves.toBe('peanut butter');
// });

// test('the fetch fails with an error', () => {
//   return expect(fetchDataPromiseWithError()).rejects.toMatch('error');
// });

 // Async / Await
 test("the data is peanut butter", async () => {
   const data = await fetchDataPromise();
   expect(data).toBe("peanut butter");
 });

 test("the fetch fails with an error", async () => {
   expect.assertions(1);
   try {
     await fetchDataPromiseWithError();
   } catch (e) {
     expect(e).toMatch("error");
   }
 });