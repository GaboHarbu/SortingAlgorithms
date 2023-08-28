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

function swapColumns(column1, column2) {
  const tempHeight = column1.style.height;
  column1.style.height = column2.style.height;
  column2.style.height = tempHeight;
}

async function bubbleSort() {
  const n = columns.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      columns[j].style.backgroundColor = '#FF4136';
      columns[j + 1].style.backgroundColor = '#FF4136';
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (parseInt(columns[j].style.height) > parseInt(columns[j + 1].style.height)) {
        swapColumns(columns[j], columns[j + 1]);
      }
      columns[j].style.backgroundColor = '#ABC4AA';
      columns[j + 1].style.backgroundColor = '#ABC4AA';
    }
  }
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
  bubbleSort();
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