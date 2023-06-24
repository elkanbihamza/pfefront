import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})

export class CategoryApiService {

constructor(private http: HttpClient) { }

getCategories(): Observable<Category[]> {
  return this.http.get<Category[]>('http://localhost:3000/categories');
}

getCategoryByCode(categoryCode: string): Observable<Category> {
  const url = `http://localhost:3000/categories${categoryCode}`;
  return this.http.get<Category>(url);
}

createCategory(category : Category): Observable<Category> {
  return this.http.post<Category>('http://localhost:3000/categories', category);
}

updateCategory(category : Category): Observable<Category> {
  const url = `http://localhost:3000/categories/${category.code}`;
  return this.http.put<Category>(url, category);
}

deleteCategory(categoryCode : string): Observable<any> {
  const url = `http://localhost:3000/categories/${categoryCode}`;
  return this.http.delete(url);
}

}

