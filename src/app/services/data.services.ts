import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from 'src/app/models/categoria.model';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  public url = 'http://localhost:3020';
    constructor(private http: HttpClient) {}

    getCategorias(){
        return this.http.get<Categoria[]>(`${this.url}/categorias`);
     }

     getContas(){
      return this.http.get<Categoria[]>(`${this.url}/contas`);
   }

   saveLauch(data){
      return this.http.post(`${this.url}/lancamentos`,data);
   }
}
