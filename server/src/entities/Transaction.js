export class TransactionEntity {
  constructor(id, type, amount, description, date, source) {
    ((this.id = id),
      (this.type = type),
      (this.amount = amount),
      (this.description = description),
      (this.date = date),
      (this.source = source));
  }
}
