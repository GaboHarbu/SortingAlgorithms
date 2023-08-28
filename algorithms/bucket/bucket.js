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
    setTimeout(() => {
      column1.classList.remove('moving');
      column2.classList.remove('moving');
    }, 100);
  }
  

async function bucketSort() {
    const n = columns.length;
    let buckets = new Array(n);
    for (let i = 0; i < n; i++) {
      buckets[i] = [];
    }
    for (let i = 0; i < n; i++) {
      let bucketIndex = Math.floor(parseInt(columns[i].style.height) / 10);
      columns[i].classList.add('moving'); 
      buckets[bucketIndex].push(columns[i]);
      await new Promise((resolve) => setTimeout(resolve, 150)); // Espera un breve período de tiempo
      columns[i].classList.remove('moving'); // Elimina la clase "moving"
    }
    let k = 0;
    for (let i = 0; i < n; i++) {
      const bucketSize = buckets[i].length;
      if (bucketSize) {
        buckets[i].sort((a, b) => parseInt(a.style.height) - parseInt(b.style.height));
        for (let j = 0; j < bucketSize; j++) {
          columns[k++] = buckets[i][j];
          container.appendChild(buckets[i][j]);
          buckets[i][j].classList.add('moving'); // Agrega la clase "moving"
          await new Promise((resolve) => setTimeout(resolve, 150)); // Espera un breve período de tiempo
          buckets[i][j].classList.remove('moving'); // Elimina la clase "moving"
        }
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
  bucketSort();
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
