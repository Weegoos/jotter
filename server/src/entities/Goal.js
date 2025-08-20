export class GoalEntities {
  constructor(name, target_amount, current_amount, deadline) {
    ((this.name = name),
      (this.target_amount = target_amount),
      (this.current_amount = current_amount),
      (this.deadline = deadline));
  }
}
