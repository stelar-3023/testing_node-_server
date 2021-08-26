import { Selector } from "testcafe";

fixture`Getting Started`.page`http://devexpress.github.io/testcafe/example`;

const nameInput = Selector("#developer-name");

test("My first test", async (t) => {
  await t
    .setTestSpeed(0.1)
    .typeText(nameInput, "Steve Larsen")
    .click("#submit-button");

  const articleHeader = await Selector(".result-content").find("h1");

  // Obtain the text of the article header
  let headerText = await articleHeader.innerText;

  // test('Open the TestCafe website', async t => {
  //     await t
  //         .openWindow('http://devexpress.github.io/testcafe')
  //         .openWindow('./documentation');
});

// import fs from 'fs';
// import { ClientFunction } from 'testcafe';

// fixture `My fixture`
//     .page `http://www.example.com/`;

// const getDataFromClient = ClientFunction(() => getSomeData());

// test('Check client data', async t => {
//     const boundGetDataFromClient = getDataFromClient.with({ boundTestRun: t });

//     const equal = await new Promise(resolve => {
//         fs.readFile('/home/user/tests/reference/clientData.json', (err, data) => {
//             boundGetDataFromClient().then(clientData => {
//                 resolve(JSON.stringify(clientData) === data);
//             });
//         });
//     });

//     await t.expect(equal).ok();
// });
