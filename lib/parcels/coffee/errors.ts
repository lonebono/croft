export class CoffeeLogNotFoundError extends Error {
  constructor(id?: string) {
    super(id ? `Coffee log ${id} not found` : "No coffee logs found");
    this.name = "CoffeeLogNotFoundError";
  }
}

export class CoffeeLogWriteError extends Error {
  constructor(cause: string) {
    super(`Failed to write coffee log: ${cause}`);
    this.name = "CoffeeLogWriteError";
  }
}

export class BeanNotFoundError extends Error {
  constructor(id?: string) {
    super(id ? `Bean ${id} not found` : "No beans found");
    this.name = "BeanNotFoundError";
  }
}

export class BeanWriteError extends Error {
  constructor(cause: string) {
    super(`Failed to write bean: ${cause}`);
    this.name = "BeanWriteError";
  }
}
