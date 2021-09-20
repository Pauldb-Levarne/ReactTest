import React, { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";

function App(props) {
	const [tasks, setTasks] = useState(props.tasks);
	function addTask(name) {
		const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
		setTasks([...tasks, newTask]);
	}
	function toggleTaskCompleted(id) {
		const updatedTasks = tasks.map((task) => {
			if (id === task.id) {
				return { ...task, completed: !task.completed };
			}
			return task;
		});
		setTasks(updatedTasks);
	}
	function deleteTask(id) {
		const remainingTasks = tasks.filter((task) => id !== task.id);
		setTasks(remainingTasks);
	}
	function editTask(id, newName) {
		const editedTaskList = tasks.map((task) => {
			if (id === task.id) {
				return { ...task, name: newName };
			}
			return task;
		});
		setTasks(editedTaskList);
	}
	const taskList = tasks.map((task) => (
		<Todo
			id={task.id}
			name={task.name}
			completed={task.completed}
			key={task.id}
			toggleTaskCompleted={toggleTaskCompleted}
			deleteTask={deleteTask}
			editTask={editTask}
		/>
	));
	const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
	const headingText = `${taskList.length} ${tasksNoun} remaining`;
	const [filter, setFilter] = useState("All");

	return (
		<div className="todoapp stack-large">
			<h1>TodoMatic</h1>
			<Form addTask={addTask} />
			<div className="filters btn-group stack-exception">
				<FilterButton text="all" />
				<FilterButton text="active" />
				<FilterButton text="completed" />
			</div>
			<h2 id="list-heading">{headingText}</h2>
			<ul
				role="list"
				className="todo-list stack-large stack-exception"
				aria-labelledby="list-heading"
			>
				{taskList}
			</ul>
		</div>
	);
}

export default App;
