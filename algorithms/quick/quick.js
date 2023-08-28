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
  column1.classList.add('moving'); 
  column2.classList.add('moving');
}

async function quickSort(left, right) {
  if (left < right) {
    let pivotIndex = await partition(left, right);

    await Promise.all([
      quickSort(left, pivotIndex - 1),
      quickSort(pivotIndex + 1, right),
    ]);
  }
}

async function partition(left, right) {
  let pivotIndex = left;
  let pivotValue = parseInt(columns[right].style.height);

  for (let i = left; i < right; i++) {
    columns[i].style.backgroundColor = '#FF4136';
    await new Promise((resolve) => setTimeout(resolve, 150));

    let currentValue = parseInt(columns[i].style.height);

    if (currentValue < pivotValue) {
      swapColumns(columns[i], columns[pivotIndex]);
      pivotIndex++;
    }

    columns[i].style.backgroundColor = '#ABC4AA';
  }

  swapColumns(columns[pivotIndex], columns[right]);
  return pivotIndex;
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

sortBtn.addEventListener('click', async () => {
  await quickSort(0, columnCount - 1);
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
