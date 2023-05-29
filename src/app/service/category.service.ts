import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})

export class CategoryApiService {

private apiUrl = 'http://localhost:3000/categories';

constructor(private http: HttpClient) { }

getCategories(): Observable<Category[]> {
  return this.http.get<Category[]>(this.apiUrl);
}

getCategoryByCode(categoryCode: string): Observable<Category> {
  const url = `${this.apiUrl}/${categoryCode}`;
  return this.http.get<Category>(url);
}

createCategory(category : Category): Observable<Category> {
  return this.http.post<Category>(this.apiUrl, Category);
}

updateCategory(category : Category): Observable<Category> {
  const url = `${this.apiUrl}/${category.code}`;
  return this.http.put<Category>(url, category);
}

deleteCategory(categoryCode : string): Observable<any> {
  const url = `${this.apiUrl}/${categoryCode}`;
  return this.http.delete(url);
}

}

