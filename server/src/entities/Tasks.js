export class TasksEntity {
  constructor(id, title, description, status, priority, target_date, time_period) {
    ((this.id = id),
      (this.title = title),
      (this.description = description),
      (this.status = status),
      (this.priority = priority),
      (this.target_date = target_date));
    this.time_period = time_period;
  }
}
