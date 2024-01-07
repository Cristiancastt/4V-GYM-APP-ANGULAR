import { ActivityType } from './activity_type'; 
import { Monitor } from './monitor'; 

export class Activity {
  id?: number;
  date_start?: Date;
  date_end?: Date;
  activity_type?: ActivityType;
  activity_type_id: string | number | undefined;
  monitors: Monitor[];

  setActivityTypeId(activity_type_id: string | number): this {
    this.activity_type_id = activity_type_id;
    return this;
  }

  constructor() {
    this.monitors = [];
  }

  getId(): number | undefined {
    return this.id;
  }

  getDateStart(): Date | undefined {
    return this.date_start;
  }
  
  setDateStart(date_start: Date | string): this {
    // Si date_start es una cadena, conviértela a un objeto Date
    if (typeof date_start === 'string') {
      this.date_start = new Date(date_start);
    } else {
      this.date_start = date_start;
    }
    return this;
  }
  
  getDateEnd(): Date | undefined {
    return this.date_end;
  }
  
  setDateEnd(date_end: Date | string): this {
    // Si date_end es una cadena, conviértela a un objeto Date
    if (typeof date_end === 'string') {
      this.date_end = new Date(date_end);
    } else {
      this.date_end = date_end;
    }
    return this;
  }
  

  getActivityType(): ActivityType | undefined {
    return this.activity_type;
  }

  setActivityType(activity_type: ActivityType): this {
    this.activity_type = activity_type;
    return this;
  }

  getmonitors(): Monitor[] {
    return this.monitors;
  }

  addMonitore(monitore: Monitor): this {
    if (!this.monitors.some((m) => m.id === monitore.id)) {
      this.monitors.push(monitore);
    }
    return this;
  }

  removeMonitore(monitore: Monitor): this {
    const index = this.monitors.findIndex((m) => m.id === monitore.id);
    if (index !== -1) {
      this.monitors.splice(index, 1);
    }
    return this;
  }

  
}
