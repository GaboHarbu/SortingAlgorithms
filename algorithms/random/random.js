const container = document.querySelector('.column-container');
const sortBtn = document.querySelector('#sort-btn');
const randomBtn = document.querySelector('#random-btn');
const addBtn = document.querySelector('#add-btn');
const removeBtn = document.querySelector('#remove-btn');
let columns = [];
let columnCount = 10;

function generateColumns() {
  container.innerHTML = '';
  for (let i = 0; i < columnCount; i++) {
    const column = document.createElement('div');
    column.classList.add('column');
    column.style.height = `${Math.floor(Math.random() * 80) + 10}%`;
    column.id = `col-${i}`;
    columns.push(column);
    container.appendChild(column);
  }
}

function isSorted() {
  for (let i = 1; i < columns.length; i++) {
    if (parseInt(columns[i - 1].style.height) > parseInt(columns[i].style.height)) {
      return false;
    }
  }
  return true;
}

async function randomSort() {
  const n = columns.length;
  while (!isSorted()) {
    const randomIndex1 = Math.floor(Math.random() * n);
    const randomIndex2 = Math.floor(Math.random() * n);
    columns[randomIndex1].style.backgroundColor = '#FF4136'; // Resaltar en rojo
    columns[randomIndex2].style.backgroundColor = '#FF4136'; // Resaltar en rojo
    swapColumns(columns[randomIndex1], columns[randomIndex2]);
    await new Promise((resolve) => setTimeout(resolve, 100));
    columns[randomIndex1].style.backgroundColor = '#ABC4AA'; // Restablecer el color original
    columns[randomIndex2].style.backgroundColor = '#ABC4AA'; // Restablecer el color original
  }
}

function swapColumns(column1, column2) {
  const tempHeight = column1.style.height;
  column1.style.height = column2.style.height;
  column2.style.height = tempHeight;
}

function randomizeColumns() {
  for (let i = 0; i < columnCount; i++) {
    columns[i].style.height = `${Math.floor(Math.random() * 80) + 10}%`;
  }
}

function addColumn() {
  columnCount++;
  const column = document.createElement('div');
  column.classList.add('column');
  column.style.height = `${Math.floor(Math.random() * 80) + 10}%`;
  column.id = `col-${columnCount - 1}`;
  columns.push(column);
  container.appendChild(column);
}

function removeColumn() {
  if (columnCount <= 1) return;
  const column = columns.pop();
  container.removeChild(column);
  columnCount--;
}

generateColumns();

sortBtn.addEventListener('click', () => {
  randomSort();
});

randomBtn.addEventListener('click', () => {
  randomizeColumns();
});

addBtn.addEventListener('click', () => {
  addColumn();
});

removeBtn.addEventListener('click', () => {
  removeColumn();
});
