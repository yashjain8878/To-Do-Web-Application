let tasks = [];
//this is the fubction to add a task
//it will take the value from the input field and add it to the tasks array
let isEditing = false; // this variable is used to check if we are editing a task
let editIndex=null; // this variable is used to store the index of the task we are editing
const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();
  if (text) {
    if(isEditing){
      tasks[editIndex].text=text; // if we are editing a task, we update the text of the task at the editIndex
      isEditing = false; // reset editing mode
      editIndex = null; // reset editIndex
    }
    else {
      tasks.push({ text: text, completed: false });
    }
    taskInput.value= ""; // this will clear the input field after adding the task
    updateTaskList(); // this is the function  call to update the task in list
    updateStats(); // this is the function call to update the stats
    saveTasks(); // this is the function call to save the tasks in local storage
  }
};

// toggle function
const toggleTaskComplete =(index) =>{
    tasks[index].completed =!tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks(); // this is the function call to save the tasks in local storage
}

// deleteTask Function 
const deletetask = (index) =>{
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks(); // this is the function call to save the tasks in local storage
}


// editTask function
const editTask = (index) =>{
    const taskInput =document.getElementById("taskInput");
    taskInput.value=tasks[index].text;
    isEditing = true; // set editing mode to true
    editIndex = index; // store the index of the task being edited
    // now we edit task and after edit update in that list item which we edit
    taskInput.addEventListener("change", () => {
        tasks[index].text = taskInput.value;
        updateTaskList();
        updateStats();
        saveTasks();
    });

    // tasks.splice(index,1);   // this line is commented out to prevent immediate deletion
    updateTaskList();   
    updateStats();
    saveTasks(); // this is the function call to save the tasks in local storage
}

// uptade stats function
const updateStats =() => {
    const completedTasks=tasks.filter(task => task.completed).length;
    const totalTasks=tasks.length;
    const progress = completedTasks/totalTasks * 100; 
    const progressBar=document.getElementById("progress");
    progressBar.style.width= `${progress}%`;

    document.getElementById("numbers").innerText= `${completedTasks} / ${totalTasks}`;

    if(tasks.length===totalTasks && completedTasks===totalTasks){
        animation(); // this will call the animation function when all tasks are completed
        document.querySelector("h1").innerText = "Congratulations! All tasks completed.";
    }

}


//this is the function to update the task list
const updateTaskList = () => {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // this will clear the task list

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
        <div class="taskItem">
        <div class="task ${task.completed ? 'completed' : ''}">
            <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} >
            <p>${task.text}</p>
        </div>
        <div class="icons">
            <img src="./Image/edit.png" onClick="editTask(${index})" alt="">
            <img src="./Image/bin.png" onClick="deletetask(${index})" alt="">
        </div>
    </div>
      `;
     listItem.addEventListener('change', () => toggleTaskComplete(index));
      taskList.appendChild(listItem);
  });
};

document.getElementById("newTaskBtn").addEventListener("click", function (e) {
  e.preventDefault(); //

  addTask();
});


// ANIMATION CODE HERE 
const animation = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}