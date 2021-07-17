'use strict';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.services';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/categoria.model';
import { Conta } from 'src/app/models/conta.model';
import { Cartao } from '../models/cartao.model';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  public categorias$!: Observable<Categoria[]>;
  public categoriasRec$!: Observable<Categoria[]>;
  public contas$!: Observable<Conta[]>;
  public cartoes$!: Observable<Cartao[]>;
  public form: FormGroup;
  public teste: any;
  public dataAtual;
  public tipoConta;
  public tipoRegistro;
  public numParcelas: Array<any> = [];
  constructor(
    private dataService: DataService,
    private fb: FormBuilder
    ) {  this.form = this.fb.group({
        valor:[ ],
        descricao: ['',],
        data: [],
        categoriaId: ['',],
        tipoConta: [],
        contaId: ['',],
        cartaoId: ['',],
        numParcelas: [],
        competencia:[],
        categoriaRecId:['',],
        parcela:[],
        tipoRegistro: []
      });

    }

  ngOnInit(): void {
    this.categorias$ = this.dataService.getCategorias();
    this.contas$ = this.dataService.getContas();
    this.cartoes$ = this.dataService.getCartoes();
    this.dataAtual = new Date().toDateString();
    this.tipoRegistro = 0;
    this.tipoConta = 0;
    this.numParcelas = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];
    this.categoriasRec$ = this.dataService.getCategoriasRec();
  }

  submit(){
    this.form.patchValue({
      tipoRegistro: this.tipoRegistro
    });

    if(this.form.controls.numParcelas.value > 1){
      this.salvaRegParc();
    }else{
      this.salvaRegUnico();
    }
    this.form.reset();
    this.tipoRegistro = 0;
    this.tipoConta = 0;
    this.dataAtual = new Date().toISOString();
  }

  onTipoConta($event){
    if($event.target.value === 'Cartao'){
      this.tipoConta = 1;
    }else{
      this.tipoConta = 2;
    }
  }

  onTipoRegistro($event){
    if ($event.target.value === 'Despesa'){
        this.tipoRegistro = 1;
    }else{
        this.tipoRegistro = 2;
    }
  }

  cancel(){
    this.form.reset();
    this.tipoRegistro = 0;
    this.tipoConta = 0;
    this.dataAtual = new Date().toISOString();
  }

  salvaRegUnico(){

    const dataLanc = new Date(this.form.controls.data.value).toLocaleDateString('pt-br');
    this.form.patchValue({
      valor: this.form.controls.valor.value,
      tipoConta: this.tipoConta,
      competencia: dataLanc,
      data: dataLanc,
      numParcelas: 1,
      parcela:1
    });
    debugger
    this.dataService.saveLauch(this.form.value)
        .subscribe(
          (data) => {

            console.log(data);
          },
          (err) => {
            console.log(err);
          }
        );
  }

  salvaRegParc(){
    debugger
    const parcelas = this.form.controls.numParcelas.value;
    const valor = (this.form.controls.valor.value).replaceAll('.','').replaceAll(',','.');
    const valorParcela = (valor/parcelas).toFixed(2);
    const data2 = new Date(this.form.controls.data.value);
    const dataCompetencia = new Date(this.form.controls.data.value).toLocaleDateString('pt-br');

    for(let i = 1; i <= parcelas;  i++){
      const dataParcela = new Date();
      let dataNaoformatada = dataParcela.setDate(data2.getDate() + (i*30));
      let dataFormatadata = new Date(dataNaoformatada).toLocaleDateString('pt-br');
      this.form.patchValue({
        tipoConta: this.tipoConta,
        valor: valorParcela,
        competencia: dataCompetencia,
        data: dataFormatadata,
        parcela: i
      });
      this.dataService.saveLauch(this.form.value)
        .subscribe((data) => {
            console.log(data);
          },
          (err) => {
            console.log(err);
          }
        );
        dataNaoformatada = 0;
        dataFormatadata = '';
    }
  }


}
