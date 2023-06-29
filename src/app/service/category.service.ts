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
  return this.http.get<Category[]>('/fsacnotif/getallcategories');
}

getCategoryByCode(categoryCode: string): Observable<Category> {
  const url = `/fsacnotif/categories/${categoryCode}`;
  return this.http.get<Category>(url);
}

createCategory(category : Category): Observable<Category> {
  return this.http.post<Category>('/fsacnotif/categories', category);
}

updateCategory(category : Category): Observable<Category> {
  const url = `/fsacnotif/categories/${category.code}`;
  return this.http.put<Category>(url, category);
}

deleteCategory(categoryCode : string): Observable<any> {
  const url = `/fsacnotif/categories/${categoryCode}`;
  return this.http.delete(url);
}

}

