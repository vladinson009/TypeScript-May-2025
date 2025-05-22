interface UserShape {
  username: string;
  signupDate: Date;
}
type Status = 'Logged' | 'Started' | 'InProgress' | 'Done';

interface Task {
  status: Status;
  title: string;
  daysRequired: number;
  assignedTo: UserShape | undefined;
  changeStatus(newStatus: Status): void;
  moreProps?: number;
  evenMore?: string;
}

function assignTask(user: UserShape, task: Task) {
  if (task.assignedTo == undefined) {
    task.assignedTo = user;
    console.log(`User ${user.username} assigned to task '${task.title}'`);
  }
}

let user: UserShape & { passwordHash: string } = {
  username: 'Margaret',
  signupDate: new Date(2022, 1, 13),
  passwordHash: 'random',
};
let task1: Task = {
  status: 'Logged',
  title: 'Need assistance',
  daysRequired: 1,
  assignedTo: undefined,
  changeStatus(newStatus: Status) {
    this.status = newStatus;
  },
};

let task2: Task = {
  status: 'Logged',
  title: 'Test',
  daysRequired: 12,
  assignedTo: undefined,
  changeStatus(newStatus: Status) {
    this.status = newStatus;
  },
  moreProps: 300,
  evenMore: 'wow',
};

assignTask(user, task1);
assignTask(user, task2);
