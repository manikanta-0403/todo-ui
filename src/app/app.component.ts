import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

// Interface to define the shape of our Todo object
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'todo-ui';

  // The URL of our Spring Boot backend API
  private baseUrl = 'http://todo-api-production-73f3.up.railway.app';
  private apiUrl = `${this.baseUrl}/api/todos`;

  public todos: Todo[] = [];
  public newTodoTitle: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.http.get<Todo[]>(this.apiUrl).subscribe((data) => {
      this.todos = data;
    });
  }

  addTodo() {
    if (!this.newTodoTitle.trim()) return; // Don't add empty todos

    const newTodo = { title: this.newTodoTitle, completed: false };

    this.http.post<Todo>(this.apiUrl, newTodo).subscribe((createdTodo) => {
      this.todos.push(createdTodo);
      this.newTodoTitle = ''; // Clear the input field
    });
  }
}
