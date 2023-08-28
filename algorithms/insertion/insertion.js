const container = document.querySelector('.column-container');
const sortBtn = document.querySelector('#sort-btn');
const randomBtn = document.querySelector('#random-btn');
const addBtn = document.querySelector('#add-btn');
const removeBtn = document.querySelector('#remove-btn');
let columns = [];
let columnCount = 10;

function generateColumns() {
  container.innerHTML = '';
  columns = []; 
  for (let i = 0; i < columnCount; i++) {
    const column = document.createElement('div');
    column.classList.add('column');
    column.style.height = `${Math.floor(Math.random() * 80) + 10}%`;
    column.id = `col-${i}`;
    columns.push(column);
    container.appendChild(column);
  }
}

async function insertionSort() {
    const n = columns.length;
    for (let i = 1; i < n; i++) {
      const keyHeight = parseInt(columns[i].style.height);
      columns[i].style.backgroundColor = '#FF4136';
      await new Promise((resolve) => setTimeout(resolve, 75));
      
      let j = i - 1;
      while (j >= 0 && parseInt(columns[j].style.height) > keyHeight) {
        columns[j + 1].style.height = columns[j].style.height;
        j--;
      }
      
      columns[j + 1].style.height = `${keyHeight}%`;
      
      for (let k = 0; k < n; k++) {
        if (k === j + 1) {
          columns[k].style.backgroundColor = '#ABC4AA';
        } else {
          columns[k].style.backgroundColor = '#FFDC00';
        }
        await new Promise((resolve) => setTimeout(resolve, 75));
      }
    }
    
    for (let i = 0; i < n; i++) {
      columns[i].style.backgroundColor = '#ABC4AA';
      await new Promise((resolve) => setTimeout(resolve, 75));
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
  insertionSort();
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
