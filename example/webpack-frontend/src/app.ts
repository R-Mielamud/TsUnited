import { createTodoSchema, Todo, TodoCreateDto, TodoShowMode } from "~shared";
import { TODO_SHOW_MODE_ELEMENT_ID_PREFIX } from "~/common";

export default class App {
	protected newTodoTextElement!: HTMLTextAreaElement;
	protected saveButtonElement!: HTMLButtonElement;
	protected todoListElement!: HTMLUListElement;
	protected todoShowModeButtons!: HTMLInputElement[];

	protected todoShowMode: TodoShowMode = TodoShowMode.ALL;
	protected todos: Todo[] = [];

	public run() {
		this.initElements();
		this.initApp();

		this.todoShowModeButtons.forEach((button) => {
			button.addEventListener("change", () => {
				this.todoShowMode = this.getTodoShowMode();

				this.filterAndShowTodos();
			});
		});

		this.newTodoTextElement.addEventListener("keyup", () => {
			this.setSaveButtonEnabled();
		});

		this.saveButtonElement.addEventListener("click", () => {
			this.addTodo(this.getNewTodoData());
		});
	}

	protected initElements() {
		this.newTodoTextElement = this.getElementById("new-todo-text");
		this.saveButtonElement = this.getElementById("save-button");
		this.todoListElement = this.getElementById("todos");

		this.todoShowModeButtons =
			this.getElementsByClassName("todo-show-mode");
	}

	protected initApp() {
		this.filterAndShowTodos();
		this.setSaveButtonEnabled();
	}

	protected setSaveButtonEnabled() {
		this.saveButtonElement.disabled = !this.isNewTodoValid();
	}

	protected getNewTodoData(): TodoCreateDto {
		return {
			text: this.newTodoTextElement.value,
		};
	}

	protected isNewTodoValid(): boolean {
		const result = createTodoSchema.validate(this.getNewTodoData());

		return !result.error && !result.warning;
	}

	protected getTodoShowMode(): TodoShowMode {
		const { value: checkedValue } = this.todoShowModeButtons.find(
			(button) => button.checked
		) as HTMLInputElement;

		const valueWithoutPrefix = checkedValue.startsWith(
			TODO_SHOW_MODE_ELEMENT_ID_PREFIX
		)
			? checkedValue.slice(TODO_SHOW_MODE_ELEMENT_ID_PREFIX.length)
			: checkedValue;

		return valueWithoutPrefix as TodoShowMode;
	}

	protected filterAndShowTodos() {
		this.todoListElement.innerHTML = "";

		const filteredTodos = this.todos.filter(
			this.todoSuitsShowMode.bind(this)
		);

		if (!filteredTodos.length) {
			this.todoListElement.innerText = "Nothing here...";
		}

		const todoElements = filteredTodos.map(
			this.createTodoElement.bind(this)
		);

		this.todoListElement.append(...todoElements);
	}

	protected addTodo(newTodo: TodoCreateDto) {
		if (!this.todos.length) {
			this.todoListElement.innerHTML = "";
		}

		const todo = {
			id: this.getNewTodoId(),
			text: newTodo.text,
			done: false,
		};

		this.todos.push(todo);

		if (!this.todoSuitsShowMode(todo)) {
			return;
		}

		const todoElement = this.createTodoElement(todo);

		this.todoListElement.append(todoElement);
	}

	protected setTodoDone(todoId: number, done: boolean) {
		this.todos = this.todos.map((todo) =>
			todo.id === todoId ? { ...todo, done } : todo
		);
	}

	protected getNewTodoId() {
		const lastId = this.todos.reduce<number>(
			(prevLastId, todo) => Math.max(prevLastId, todo.id),
			1
		);

		return lastId + 1;
	}

	protected createTodoElement(todo: Todo): HTMLElement {
		const container = document.createElement("li");
		const checkbox = document.createElement("input");
		const label = document.createElement("label");

		checkbox.type = "checkbox";
		checkbox.checked = todo.done;

		label.innerText = todo.text;

		container.append(checkbox, label);

		checkbox.addEventListener("change", () => {
			this.setTodoDone(todo.id, checkbox.checked);
			this.filterAndShowTodos();
		});

		return container;
	}

	protected todoSuitsShowMode(todo: Todo): boolean {
		switch (this.todoShowMode) {
			case TodoShowMode.ONLY_UNDONE: {
				return !todo.done;
			}
			case TodoShowMode.ALL:
			default: {
				return true;
			}
		}
	}

	protected getElementById<T extends HTMLElement>(id: string): T {
		return document.getElementById(id) as T;
	}

	protected getElementsByClassName<T extends HTMLElement>(
		className: string
	): T[] {
		return Array.from(document.getElementsByClassName(className)) as T[];
	}
}
