const inputTask = document.querySelector('#input-modelo-1');
const btnAddTask = document.querySelector('.btn-add');
const taskList = document.querySelector('.tasks');

function criaLi() { //cria um li 
  return document.createElement('li');
}

function cleanInput() { // limpa o input apos add task
  inputTask.value = '';
  inputTask.focus();
}

function criaBotaoDel(li) { //cria botao de deletar ao lado da task (LI+BTN)
  li.innerText += ' ';
  const btnDel = document.createElement('button');
  btnDel.innerText = `Apagar`;
  btnDel.setAttribute('class', 'btn-del');
  btnDel.setAttribute('title', 'Apagar tarefa');
  li.appendChild(btnDel);
}

function criaTask(textoInput) {//cria task
  const li = criaLi();
  li.innerHTML = textoInput;
  taskList.appendChild(li);
  cleanInput();
  criaBotaoDel(li);
  saveTasks();
}

inputTask.addEventListener('keypress', function (e) { //adiciona task com enter
  if (e.keyCode === 13) {
    if (!inputTask.value) return;
    criaTask(inputTask.value);
  }
});

btnAddTask.addEventListener('click', function () { //botao de adicionar taskk
  if (!inputTask.value) return;
  criaTask(inputTask.value);
});

document.addEventListener('click', function (e) { //deleta uma task
  const el = e.target;

  if (el.classList.contains('btn-del')) {
    el.parentElement.remove();
    saveTasks();
  }
})

function saveTasks() { //salva tasks no localstorage
  const liTasks = taskList.querySelectorAll('li');
  const listOfTasks = [];

  for (let task of liTasks) {
    let taskText = task.innerText;
    taskText = taskText.replace('Apagar', '').trim();
    listOfTasks.push(taskText);
  }

  const tasksJSON = JSON.stringify(listOfTasks);
  localStorage.setItem('tasks', tasksJSON); //aloca dados
}

function readSavedTasks() { //le as tasks salvas e mantem elas
  const tasks = localStorage.getItem('tasks');
  const listOfTasks = JSON.parse(tasks);

  for (let task of listOfTasks) {
    criaTask(task);
  }
}

readSavedTasks();
