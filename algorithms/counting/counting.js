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

async function countingSort() {
  const n = columns.length;
  const counts = new Array(101).fill(0);

  for (let i = 0; i < n; i++) {
    const height = parseInt(columns[i].style.height);
    counts[height]++;
  }

  let k = 0;

  for (let i = 0; i <= 100; i++) {
    while (counts[i] > 0) {
      columns[k].style.backgroundColor = '#FF4136';
      columns[k].style.height = `${i}%`;
      await new Promise((resolve) => setTimeout(resolve, 150));
      columns[k].style.backgroundColor = '#ABC4AA';
      k++;
      counts[i]--;
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
  countingSort();
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
