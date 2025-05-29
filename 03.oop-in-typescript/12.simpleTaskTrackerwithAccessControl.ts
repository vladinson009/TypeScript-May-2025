class Task {
  title: string;
  description: string;
  completed: boolean = false;
  private _createdBy: string;

  constructor(title: string, description: string, createdBy: string) {
    this.title = title;
    this.description = description;
    this._createdBy = createdBy;
  }

  get createdBy() {
    return this._createdBy;
  }

  toggleStatus(): void {
    this.completed = !this.completed;
  }
  getDetails(): string {
    let status: 'Completed' | 'Pending' = this.completed ? 'Completed' : 'Pending';

    return `Task: ${this.title} - ${this.description} - ${status}`;
  }
  static createSampleTasks(): Task[] {
    const firstTask = new Task('Ala Bala', 'Bala Ala', 'George');
    firstTask.toggleStatus();
    const secondTask = new Task('Lala Bala', 'Bala Ala', 'Peter');
    return [firstTask, secondTask];
  }
}

const tasks = Task.createSampleTasks();
tasks.forEach((task) => console.log(task.getDetails()));
