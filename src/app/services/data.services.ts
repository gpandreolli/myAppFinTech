import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from 'src/app/models/categoria.model';
import { Conta } from 'src/app/models/conta.model';
import { Cartao } from 'src/app/models/cartao.model';



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
      return this.http.get<Conta[]>(`${this.url}/contas`);
   }

   saveLauch(data){
      return this.http.post(`${this.url}/lancamentos`,data);
   }

   getCartoes(){
      return this.http.get<Cartao[]>(`${this.url}/cartoes`);
   }

   getCategoriasRec(){
      return this.http.get<Categoria[]>(`${this.url}/categoriasRec`);
 }
}
