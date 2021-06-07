'use strict';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.services';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/categoria.model';
import { Conta } from 'src/app/models/conta.models';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  public categorias$!: Observable<Categoria[]>;
  public contas$!: Observable<Conta[]>;
  public form: FormGroup;
  public teste: any;
  public dataAtual;
  constructor(
    private data: DataService,
    private fb: FormBuilder
    ) {  this.form = this.fb.group({
        valor:['', ],
        descricao: ['',],
        data: ['',],
        categoriaId: ['',],
        tipoConta: ['',],
        contasId: ['',],

      });

    }

  ngOnInit(): void {
    this.categorias$ = this.data.getCategorias();
    this.contas$ = this.data.getContas();
    this.dataAtual = this.dataHoje();
  }

   dataHoje() {
    let data = new Date();
    let dia = data.getDate();
    let mes = data.getMonth() + 1;
    let ano = data.getFullYear();
    let result = dia+"/"+mes+"/"+ano;
   return result;
  }

  submit(){
    this.data.saveLauch(this.form.value)
        .subscribe(
          (data) => {
            console.log(data);
          },
          (err) => {
            console.log(err);
          }
        );
  }


}
