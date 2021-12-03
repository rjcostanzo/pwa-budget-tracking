let db;

const request = indexedDB.open("budget", 1);

request.onUpgradeNeeded = function (event) {
  const db = event.target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};

request.onSuccess = function (event) {
  db = event.target.result;
  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onError = function (event) {
  console.log("Error " + event.target.errorCode);
};

function saveRecord(record) {
  const expense = db.expense(["pending"], "readwrite");
  const store = expense.objectStore("pending");
  store.add(record);
}

function checkDatabase() {
  const expense = db.expense(["pending"], "readwrite");
  const store = expense.objectStore("pending");
  const getAll = store.getAll();

  // --- if database entries exist, display them ---
  getAll.onSuccess = function () {
    if (getAll.result.length > 0) {
      fetch("/api/expense/multiple", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
    .then(response => response.json())
    .then(() => {
        const expense = db.expense(["pending"], "readwrite");
        const store = expense.objectStore("pending");
        store.clear();
      });
    }
  };
}

function deletePending() {
  const expense = db.expense(["pending"], "readwrite");
  const store = expense.objectStore("pending");
  store.clear();
}

window.addEventListener("online", checkDatabase);