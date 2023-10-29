import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('putDb not implemented');

  // create connection
  const jateDb = await openDB("jate", 1);

  //create new transcation
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");

  //put to update data
  const request = store.put({ id: 1, value: content });

  //get
  const result = await request;
  console.log("data saved to database", result);
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb not implemented');

  const jateDb = await openDB("jate", 1);

  //create new transcation
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");

  //get
  const request = store.get(1);

  const result = await request;

  result
    ? console.log("Data retrieve from database", result.value)
    : console.log("data not found");
};

initdb();
