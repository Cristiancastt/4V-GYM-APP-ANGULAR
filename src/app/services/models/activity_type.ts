export class ActivityType {
    id?: number;
    name?: string;
    number_monitors?: number;
  
    constructor() {
    }
  
    getId(): number | undefined {
      return this.id;
    }
  
    getName(): string | undefined {
      return this.name;
    }
  
    setName(name: string): this {
      this.name = name;
      return this;
    }
  
    getNumberMonitors(): number | undefined {
      return this.number_monitors;
    }
  
    setNumberMonitors(number_monitors: number): this {
      this.number_monitors = number_monitors;
      return this;
    }
  }
  