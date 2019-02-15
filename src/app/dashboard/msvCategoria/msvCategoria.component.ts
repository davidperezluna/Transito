import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MsvCategoriaService } from '../../services/msvCategoria.service';
import { LoginService } from '../../services/login.service';
import { MsvCategoria } from './msvCategoria.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './msvCategoria.component.html'
})
export class MsvCategoriaComponent implements OnInit {
  public errorMessage;
  public id;
	public respuesta;
	public categorias;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public newEmpresa = false;
  public revisionNew:boolean = false;
  public habilitarBotonRev:boolean = false;
  public revisionMensaje:boolean = false;
  public table:any;
  public isError:any; 
  public isExist:any; 
  public msj:any; 
  public parametro:any; 
  public nit:any; 
  public empresas:any;
  public revisiones:any = false;
  public categoria: MsvCategoria;

  constructor(
    private _CategoriaService: MsvCategoriaService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      timer: 1500,
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    })
    this._CategoriaService.index().subscribe(
				response => {
          this.categorias = response.data;
          let timeoutId = setTimeout(() => {  
            this.iniciarTabla();
          }, 100);
				}, 
				error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					}
				}
      );

  }
  iniciarTabla(){
    $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
           oPaginate: {
           sFirst: '<<',
           sPrevious: '<',
           sNext: '>',
           sLast: '>>'
        }
      }
   });
   this.table = $('#dataTables-example').DataTable();
  }
  
  onNew(){
    this.formNew = true;
    this.formIndex = false;
    if (this.table) {
      this.table.destroy();
    }
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = true;
      this.revisionNew = false;
      this.ngOnInit();
    }
  }
  onDelete(id:any){
    swal({
      title: '¿Estás seguro?',
      text: "¡Se eliminara este registro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._loginService.getToken();
        this._CategoriaService.deleteCategoria(token,id).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })
                  this.table.destroy();
                  this.respuesta= response;
                  this.ngOnInit();
              }, 
            error => {
              this.errorMessage = <any>error;

              if(this.errorMessage != null){
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );   
      }
    })
  }

  onNewRevision(){
    this.revisionNew = true;
  }

  onEdit(categoria:any){
    this.categoria = categoria;
    this.formEdit = true;
    this.formIndex = false;
  }
}