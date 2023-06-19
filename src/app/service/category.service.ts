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
  return this.http.get<Category[]>('/notyfsac/getallcategories');
}

getCategoryByCode(categoryCode: string): Observable<Category> {
  const url = `/notyfsac/categories/${categoryCode}`;
  return this.http.get<Category>(url);
}

createCategory(category : Category): Observable<Category> {
  return this.http.post<Category>('/notyfsac/categories', category);
}

updateCategory(category : Category): Observable<Category> {
  const url = `/notyfsac/updatecategory/${category.code_categorie}`;
  return this.http.put<Category>(url, category);
}

deleteCategory(categoryCode : string): Observable<any> {
  const url = `/notyfsac/categories/${categoryCode}`;
  return this.http.delete(url);
}

}

