const key = "7070a42a2dce47779d8eb077ad522130";
const apiUrl = `https://crudcrud.com/api/${key}/tasks`;

// Funções relacionadas ao serviço da API
async function findAll() {
  try {
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function save(task) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function remove(id) {
  try {
    await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    throw error;
  }
}

let tasks = [];

// Função para adicionar uma tarefa
function addTask(event) {
    event.preventDefault();
  
    const taskTitleInput = document.getElementById('taskTitle');
    const taskCategoryInput = document.getElementById('taskCategory');
    const taskTimeInput = document.getElementById('taskTime');
  
    const taskTitle = taskTitleInput.value.trim();
    const taskCategory = taskCategoryInput.value.trim();
    const taskTime = taskTimeInput.value.trim();
  
    if (taskTitle !== '') {
      const newTask = { title: taskTitle, category: taskCategory, time: taskTime };
  
      save(newTask)
        .then(() => {
          tasks.push(newTask);
          taskTitleInput.value = '';
          taskCategoryInput.value = '';
          taskTimeInput.value = '';
          displayTasks();
          $('#addTaskModal').modal('hide'); // Fechar o modal após adicionar a tarefa
        })
        .catch(error => console.error('Erro ao salvar a tarefa:', error));
    }
  }

// Função para exibir as tarefas na lista
function displayTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>Título:</strong> ${task.title}<br>
      <strong>Categoria:</strong> ${task.category}<br>
      <strong>Hora:</strong> ${task.time}<br>
      <button onclick="editTask(${index})">Editar</button>
      <button onclick="removeTask(${index})">Remover</button>
    `;
    taskList.appendChild(listItem);
  });

  // Atualizar a data e hora a cada segundo
  updateDateTime();
}

// Função para editar uma tarefa
function editTask(index) {
  const newTaskText = prompt('Edite a tarefa:', tasks[index].title);

  if (newTaskText !== null) {
    tasks[index].title = newTaskText.trim();
    displayTasks();
  }
}

// Função para remover uma tarefa
function removeTask(index) {
  const confirmRemove = confirm('Deseja realmente remover esta tarefa?');

  if (confirmRemove) {
    const taskId = tasks[index]._id;
    remove(taskId)
      .then(() => {
        tasks.splice(index, 1);
        displayTasks();
      })
      .catch(error => console.error('Erro ao remover a tarefa:', error));
  }
}

// Função para obter a data e hora atual e exibi-la
function updateDateTime() {
  const currentDateTimeElement = document.getElementById('currentDateTime');
  const now = new Date();

  const formattedDate = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(now);
  const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  currentDateTimeElement.textContent = `${formattedDate}, ${formattedTime}`;

  // Atualizar a cada segundo
  setTimeout(updateDateTime, 1000);
}

// Inicialização - exibe as tarefas iniciais (se houver)
findAll()
  .then(records => {
    tasks = records;
    displayTasks();
  })
  .catch(error => console.error('Erro ao buscar as tarefas:', error));

// Formulário de cadastro
const newTaskForm = document.getElementById('newTaskForm');
newTaskForm.addEventListener('submit', addTask);
