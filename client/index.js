document.addEventListener('DOMContentLoaded', function () {
  fetch('http://localhost:5000/getAll')
    .then((response) => response.json())
    //.then((data) => console.log(data));
    .then((data) => loadHtmlTable(data['data']));
  // loadHtmlTable([]);
});

//Delete and Edit  buttons are dynamically added so need eventlistener to pick it up
document
  .querySelector('table tbody')
  .addEventListener('click', function (event) {
    console.log(event.target); //see if buttons works!
    if (event.target.className === 'delete-row-btn') {
      deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === 'edit-row-btn') {
      //editRowById(event.target.dataset.id);
      handleEditRow(event.target.dataset.id);
    }
  });

const updateBtn = document.querySelector('#update-row-btn');
const searchBtn = document.querySelector('#search-btn');

searchBtn.onclick = function () {
  const searchValue = document.querySelector('#search-input').value;
  fetch('http://localhost:5000/search/' + searchValue)
    .then((response) => response.json())
    .then((data) => loadHtmlTable(data['data']));
};

function deleteRowById(id) {
  fetch('http://localhost:5000/delete/' + id, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        location.reload();
      }
    });
}

function handleEditRow(id) {
  const updateSection = document.querySelector('#update-row');
  updateSection.hidden = false;
  document.querySelector('#update-row-btn').dataset.id = id; //which ever edit button is pressed the id is taken.
}

updateBtn.onclick = function () {
  const updateNameInput = document.querySelector('#update-name-input');
  const updateNameId = document.querySelector('#update-row-btn');
  fetch('http://localhost:5000/update', {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      // id: updateNameInput.dataset.id,  //original
      id: updateNameId.dataset.id,
      name: updateNameInput.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        location.reload();
      }
    });
};
/*
updateBtn.onclick = function () {
  const updateNameInput = document.querySelector('#update-name-input');
  //console.log('Get to here ' + updateNameInput);
  fetch('http://localhost:5000/update', {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      id: updateNameInput.dataset.id,
      name: updateNameInput.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        location.reload();
      }
    });
};
*/

const addBtn = document.querySelector('#add-name-btn');
addBtn.onclick = function () {
  const nameInput = document.querySelector('#name-input');
  const name = nameInput.value;
  nameInput.value = '';
  fetch('http://localhost:5000/insert', {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ name: name }),
  })
    .then((response) => response.json())
    .then((data) => insertRowIntoTable(data['data']));
};

function insertRowIntoTable(data) {
  const table = document.querySelector('table tbody');
  const isTableData = table.querySelector('.no-data');
  let tableHtml = '<tr>';
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      if (key === 'dateAdded') {
        data[key] = new Date(data[key].toLocaleString());
      }
      //this required for data from insert
      tableHtml += `<td>${data[key]}</td>`;
    }
  }
  //This row and buttons added only when first row entered.

  tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
  tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;
  tableHtml += '</tr>';

  if (isTableData) {
    //if no row data - add first row just created
    console.log('first row scenario works');
    table.innerHTML = tableHtml;
  } else {
    //we have a row of data already or more add
    const newRow = table.insertRow();
    newRow.innerHtml = tableHtml;
    console.log(tableHtml); //this shows data needing to be added to existing page
    //   table.innerHTML = tableHtml; //added me removes all rows and replaces with latest on
    location.reload();
  }
}

function loadHtmlTable(data) {
  const table = document.querySelector('table tbody');
  console.log(data);
  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>"; // this is counting rows in db table - so 0 a row is there this will disappear
    return; //dont execute anyhing below this
  }
  let tableHtml = '';
  data.forEach(function ({ id, name, date_added }) {
    tableHtml += '<tr>';
    tableHtml += `<td>${id}</td>`;
    tableHtml += `<td>${name}</td>`;
    tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
    tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
    tableHtml += '</tr>';
  });
  table.innerHTML = tableHtml;
}
