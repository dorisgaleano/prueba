import { Component, OnInit } from '@angular/core';
import { InmuebleServiceService } from '../servicios/inmueble-service.service';
import { UbicacionServiceService } from '../servicios/ubicacion-service.service';

interface inmueblesI {

  descripcion:String;
  tipo: String;
  direccion: String;

}

@Component({
  selector: 'app-producto-servicio',
  templateUrl: './producto-servicio.component.html',
  styleUrls: ['./producto-servicio.component.css']
})
export class ProductoServicioComponent implements OnInit {

  constructor(private inmuebleServicio:InmuebleServiceService, private ubicacionServicio:UbicacionServiceService) { }

  inmuebles:any;
  inmueblesRespaldo:any = [];
  inmueble:any = [];
  ubicaciones:any = [];
  ubicacionFiltro :any;

  public autenticado: boolean = false;

  ngOnInit(): void {
    this.autenticado = !!sessionStorage.getItem('usuario');

    this.inmuebleServicio.getInmuebles().subscribe(data=>{
      console.log(data)
      this.inmuebles = data
      this.inmueblesRespaldo = data;
    })


    this.ubicacionServicio.getUbicaciones().subscribe(data=>{
      console.log(data)
      this.ubicaciones = data
    })
  }

  displayStyle = "none";

  openPopup(inmueble:any) {
    this.inmueble = inmueble;
    console.log(this.inmueble)
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

  cambiarUbicacion(ubicacion:any){
    this.ubicacionFiltro = ubicacion;
    console.log(this.ubicacionFiltro);
    this.filtrar()
  }

  filtrar(){
    this.inmuebles = [];
    for(let i = 0; i<= this.inmueblesRespaldo.length;i++){
      if(this.inmueblesRespaldo[i].ubicacion == this.ubicacionFiltro._id){
        this.inmuebles.push(this.inmueblesRespaldo[i])
      }
    }
  }

}