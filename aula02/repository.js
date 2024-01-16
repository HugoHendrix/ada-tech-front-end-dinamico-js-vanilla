function findAll(dbName, storeName) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);

    request.onerror = (event) => {
      reject("Erro ao abrir o banco de dados:", event.target.errorCode);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;

      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);

      const allRecordsRequest = store.getAll();

      allRecordsRequest.onsuccess = () => {
        resolve(allRecordsRequest.result);
      };

      allRecordsRequest.onerror = (event) => {
        reject("Erro ao recuperar registros:", event.target.errorCode);
      };
    };
  });
}

function findById(dbName, storeName, id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);

    request.onerror = (event) => {
      reject("Erro ao abrir o banco de dados:", event.target.errorCode);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;

      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);

      const recordRequest = store.get(id);

      recordRequest.onsuccess = () => {
        resolve(recordRequest.result);
      };

      recordRequest.onerror = (event) => {
        reject("Erro ao recuperar registros:", event.target.errorCode);
      };
    };
  });
}

function save() {}

function update() {}

function remove() {}