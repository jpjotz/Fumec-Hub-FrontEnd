import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = signal<any>({
    id: 'current-user',
    name: 'João Pedro',
    email: 'joao@fumec.edu.br',
    friendCode: 'JOAO123',
    Course: {
      id: '1',
      name: 'Ciência da Computação',
    },
  });

  private users = [
    this.user(),
    {
      id: '101',
      name: 'Ana Souza',
      email: 'ana@fumec.edu.br',
      friendCode: 'ANA123',
      Course: { id: '1', name: 'Ciência da Computação' },
    },
    {
      id: '102',
      name: 'Pedro Lima',
      email: 'pedro@fumec.edu.br',
      friendCode: 'PEDRO123',
      Course: { id: '2', name: 'Sistemas de Informação' },
    },
    {
      id: '103',
      name: 'Mariana Costa',
      email: 'mariana@fumec.edu.br',
      friendCode: 'MARI123',
      Course: { id: '3', name: 'Engenharia de Software' },
    },
  ];

  getMe() {
    return of(this.user());
  }

  getUsers() {
    return of(this.users);
  }

  searchUsers(name: string) {
    const result = this.users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );

    return of(result);
  }

  getUserById(id: string) {
    return of(this.users.find((user) => user.id === id) ?? null);
  }

  createUser(name: string, email: string, courseId: string) {
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      friendCode: name.toUpperCase().replace(/\s/g, '').slice(0, 8),
      Course: { id: courseId, name: 'Curso mockado' },
    };

    this.users.push(newUser);
    return of(newUser);
  }

  updateUser(id: string, name: string, email: string) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) return of(null);

    this.users[index] = {
      ...this.users[index],
      name,
      email,
    };

    return of(this.users[index]);
  }

  deleteUser(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
    return of(true);
  }

  register(nome: string, email: string, password: string, courseId: string) {
    const newUser = this.createUser(nome, email, courseId);

    this.user.set(newUser);
    return newUser;
  }

  login(email: string, password: string) {
    const foundUser = this.users.find((user) => user.email === email);

    if (!foundUser) return of(null);

    this.user.set(foundUser);
    return of(foundUser);
  }

  refresh() {
    return of(true);
  }

  logout() {
    this.user.set(null);
    return of(true);
  }
}
