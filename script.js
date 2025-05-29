// Predefined tasks data
const tasks = [
    {
        id: 1,
        title: "3hour study",
        description: "studying new things for 3 hours",
        status: "todo",
        priority: "high",
        dueDate: "2025-05-25"
    },
  
    {
        id: 2,
        title: "Exercise",
        description: "exercising as long as it takes till warmed up",
        status: "inprogress",
        priority: "medium",
        dueDate: "2025-05-24"
    },

    {
        id: 3,
        title: "Household chores",
        description: "doing household chores",
        status: "done",
        priority: "medium",
        dueDate: "2025-05-20"
    },
    {
        id: 4,
        title: "Wathing anime",
        description: "watch atleast 5 episodes of anime",
        status: "done",
        priority: "high",
        dueDate: "2025-05-18"
    },
    {
        id: 5,
        title: "Buying groceries",
        description: "going to store for groceries",
        status: "todo",
        priority: "medium",
        dueDate: "2025-05-26"
    },
    {
        id: 6,
        title: "Reading books",
        description: "reading books I'm interested at",
        status: "inprogress",
        priority: "low",
        dueDate: "2025-06-02"
    }
];

// Function to create task card element
function createTaskCard(task) {
    const taskCard = document.createElement('div');
    taskCard.className = `task-card ${task.status}`;
    taskCard.setAttribute('data-id', task.id);
    taskCard.setAttribute('data-status', task.status);
    taskCard.setAttribute('data-priority', task.priority);
    
    const dueDate = new Date(task.dueDate);
    const formattedDueDate = dueDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    
    taskCard.innerHTML = `
        <div class="task-title">${task.title}</div>
        <div class="task-description">${task.description}</div>
        <div class="task-meta">
            <div>Due: ${formattedDueDate}</div>
            <span class="task-priority ${task.priority}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
        </div>
        <div class="move-buttons">
            ${task.status !== 'todo' ? `<button class="move-btn move-left" data-direction="left">← Move Left</button>` : ''}
            ${task.status !== 'done' ? `<button class="move-btn move-right" data-direction="right">Move Right →</button>` : ''}
        </div>
    `;
    
    return taskCard;
}

// Function to render tasks
function renderTasks(filteredTasks = null) {
    const todoColumn = document.getElementById('todo-tasks');
    const inprogressColumn = document.getElementById('inprogress-tasks');
    const doneColumn = document.getElementById('done-tasks');
    
    // Clear existing tasks
    todoColumn.innerHTML = '';
    inprogressColumn.innerHTML = '';
    doneColumn.innerHTML = '';
    
    // Use either filtered tasks or all tasks
    const tasksToRender = filteredTasks || tasks;
    
    // Render tasks in respective columns
    tasksToRender.forEach(task => {
        const taskCard = createTaskCard(task);
        
        switch(task.status) {
            case 'todo':
                todoColumn.appendChild(taskCard);
                break;
            case 'inprogress':
                inprogressColumn.appendChild(taskCard);
                break;
            case 'done':
                doneColumn.appendChild(taskCard);
                break;
        }
    });
    
    // Add event listeners for move buttons
    document.querySelectorAll('.move-btn').forEach(button => {
        button.addEventListener('click', moveTask);
    });
}

// Function to move task between columns
function moveTask(event) {
    const button = event.target;
    const direction = button.getAttribute('data-direction');
    const taskCard = button.closest('.task-card');
    const taskId = parseInt(taskCard.getAttribute('data-id'));
    const currentStatus = taskCard.getAttribute('data-status');
    
    const task = tasks.find(t => t.id === taskId);
    
    // Determine new status based on current status and direction
    if (direction === 'right') {
        if (currentStatus === 'todo') {
            task.status = 'inprogress';
        } else if (currentStatus === 'inprogress') {
            task.status = 'done';
        }
    } else if (direction === 'left') {
        if (currentStatus === 'inprogress') {
            task.status = 'todo';
        } else if (currentStatus === 'done') {
            task.status = 'inprogress';
        }
    }
    
    // Re-render tasks
    renderTasks();
}

// Function to filter tasks by priority
function filterByPriority() {
    const priorityFilter = document.getElementById('filter-priority').value;
    
    if (priorityFilter === 'all') {
        renderTasks();
        return;
    }
    
    const filteredTasks = tasks.filter(task => task.priority === priorityFilter);
    renderTasks(filteredTasks);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    
    // Event listeners
    document.getElementById('filter-btn').addEventListener('click', filterByPriority);
    document.getElementById('reset-filter-btn').addEventListener('click', () => {
        document.getElementById('filter-priority').value = 'all';
        renderTasks();
    });
});