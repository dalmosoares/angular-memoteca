import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  pensamento:Pensamento = {
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  formulario!:FormGroup;
  private id:string|null = null;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(parseInt(this.id!)).subscribe((pensamento) => {
      this.pensamento = pensamento;
      this.iniciarFormulario();
    });
  };

  iniciarFormulario(){
    this.formulario = this.formBuilder.group({
      conteudo:[this.pensamento.conteudo,Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      autoria:[this.pensamento.autoria,Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      modelo:[this.pensamento.modelo]
    });
  }

  editarPensamento() {
    this.pensamento = this.formulario.value;
    this.pensamento.id = parseInt(this.id!);
    this.service.editar(this.pensamento).subscribe(() => 
      this.router.navigate(['/listarPensamento'])
    )
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }
  }

}
