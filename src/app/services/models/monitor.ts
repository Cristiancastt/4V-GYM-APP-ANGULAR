export class Monitor {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    photo?: string;
  
    constructor() {
    }
    
    setId(id: number): this {
      this.id = id;
      return this;
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
  
    getEmail(): string | undefined {
      return this.email;
    }
  
    setEmail(email: string): this {
      this.email = email;
      return this;
    }
  
    getPhone(): string | undefined {
      return this.phone;
    }
  
    setPhone(phone: string): this {
      this.phone = phone;
      return this;
    }
  
    getPhoto(): string | undefined {
      return this.photo;
    }
  
    setPhoto(photo: string): this {
      this.photo = photo;
      return this;
    }
  }
  