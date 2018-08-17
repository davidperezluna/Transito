import { Component, OnInit, Output, EventEmitter /**/, ElementRef, ViewChild /**/ } from '@angular/core';
import { MsvInventarioSenialService } from '../../services/msvInventarioSenial.service';
import { LoginService } from '../../services/login.service';

import { environment } from 'environments/environment';
import { CfgInventarioService } from '../../services/cfgInventario.service';
import { CfgTipoEstadoService } from '../../services/cfgTipoEstado.service';
import { CfgTipoColorService } from '../../services/cfgTipoColor.service';
import { CfgTipoDestinoService } from '../../services/cfgTipoDestino.service';
import { CfgBodegaService } from '../../services/cfgBodega.service';
import { MunicipioService } from '../../services/municipio.service';
import { CfgTipoSenialService } from '../../services/cfgTipoSenial.service';

import { MsvInventarioSenial } from './msvInventarioSenial.modelo';

///////////////////////
import {} from '@types/googlemaps';
declare var google: any;
///////////////////////

import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './msvInventarioSenial.component.html'
})

export class MsvInventarioSenialComponent implements OnInit {

    ///////////////////////
    @ViewChild('map') mapRef: ElementRef;
    private map: google.maps.Map;
    private geocoder: google.maps.Geocoder;
    private scriptLoadingPromise: Promise<void>;
    ///////////////////////
    private idInv: any;
    private dateInv: any;

    @Output() ready = new EventEmitter<any>();
    public errorMessage;
    public respuesta;
    public msvInventarioSenials;
    public formNew = true;
    public formIndex = true;

    public formSearch = true;

    public table: any = null;

    public tiposDestino: any;
    public destino: any;
    public senal: any;
    public msvInventarioSenial: MsvInventarioSenial;

    public destinoSelected: any;
    public tipoDestinoSelected: any;
    public tipoSenalSelected: any;

    public senalSelected: any;
    public senales: any;
    private build : any;
    public file: any;

    public senalesPorAsignar: any;
    public senalesPorInventario: any;

    public datos = {
        'fecha'     : null,
        'unidad'    : null,
        'color'     : null,
        'latitud'   : null,
        'longitud'  : null,
        'direccion' : null,
        'codigo'    : null,
        'nombre'    : null,
        'valor'     : null,
        'estado'    : null,
        'cantidad'  : null,

        'destinoId' : null,
        'tipoDestinoId' : null,
        'tipoSenalId' : null
    }

    public datInv = {
        'idInv' : null,
        'dateInv' : null,
        'typeSen' : null
    }

    constructor(
        private _msvInventarioSenialService: MsvInventarioSenialService,
        private _loginService: LoginService,

        private _cfgInventarioService : CfgInventarioService,
        private _cfgTipoEstadoService : CfgTipoEstadoService,
        private _cfgTipoColorService : CfgTipoColorService,
        private _cfgTipoDestinoService : CfgTipoDestinoService,
        private _cfgBodegaService : CfgBodegaService,
        private _municipioService : MunicipioService,
        private _cfgTipoSenialService : CfgTipoSenialService,

        /////////////////////////////////

        //////////////////////////////////
    ) { this.senalSelected = ""; this.build = {};

        /////////////////////////////////
        //Loading script
        this.loadScriptLoadingPromise();
        //Loading other components
        this.onReady().then(() => {
            this.geocoder = new google.maps.Geocoder();
        });
        /////////////////////////////
    }

    ngOnInit() {
        this.msvInventarioSenial = new MsvInventarioSenial(null, null, null, null, null, null, null, null, null, null, null, null, null);

        this.initMap(this.mapRef.nativeElement, {
            center: {lat: 4.624335, lng: -74.063644},
            zoom: 16,
            scrollwheel: true,
            disableDoubleClickZoom: false,
            rotateControl: true,
            scaleControl: true,
            disableDefaultUI: true,
            zoomControl: true,
            gestureHandling: 'greedy'
        });

        /*swal({
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
        });*/

        this._cfgInventarioService.select().subscribe(
                response => {

                    var build = {}, fec = {}; var temp = '';
                    for(var item in response) {
                        for (var index in response[item]) {
                            switch(index){
                                case 'value':
                                    temp = response[item][index];
                                    build[temp] = '';
                                    break;
                                case 'label':
                                    build[temp] = response[item][index];
                                    break;
                                case 'other':
                                    fec[temp] = response[item][index];
                                    break;
                            }
                        }
                    }

                    var select = document.getElementsByName('inventario')[0];

                    var opt = document.createElement('option');
                    opt.value = '';
                    opt.innerHTML = '';
                    select.appendChild(opt);

                    for(var item in build) {
                        var opt = document.createElement('option');
                        opt.value = item;
                        opt.innerHTML = '#' + build[item] + '/' + fec[item];
                        select.appendChild(opt);
                    }

            },
                error => {
                this.errorMessage = <any>error;

                if(this.errorMessage != null){
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this._cfgTipoEstadoService.select().subscribe(
                response => {

                var build = {}; var temp = '';
                for(var item in response) {
                    for (var index in response[item]) {
                        switch(index){
                            case 'value':
                                temp = response[item][index];
                                build[temp] = '';
                                break;
                            case 'label':
                                build[temp] = response[item][index];
                                break;
                        }
                    }
                }

                var select = document.getElementsByName('estado')[0];

                    var opt = document.createElement('option');
                    opt.value = '';
                    opt.innerHTML = '';
                    select.appendChild(opt);

                for(var item in build) {
                    var opt = document.createElement('option');
                    opt.value = item;
                    opt.innerHTML = build[item];
                    select.appendChild(opt);
                }

            },
                error => {
                this.errorMessage = <any>error;

                if(this.errorMessage != null){
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this._cfgTipoColorService.select().subscribe(
                response => {

                    var build = {}, hex = {}; var temp = '';
                    for(var item in response) {
                        for (var index in response[item]) {
                            switch(index){
                                case 'value':
                                    temp = response[item][index];
                                    build[temp] = '';
                                    break;
                                case 'label':
                                    build[temp] = response[item][index];
                                    break;
                                case 'other':
                                    hex[temp] = response[item][index];
                                    break;
                            }
                        }
                    }

                    var select = document.getElementsByName('color')[0];

                    var opt = document.createElement('option');
                    opt.value = '';
                    opt.innerHTML = '';
                    select.appendChild(opt);

                    for(var item in build) {
                        var opt = document.createElement('option');
                        opt.value = item;
                        opt.innerHTML = build[item];
                        opt['style']['background-color'] = hex[item];
                        select.appendChild(opt);
                    }

            },
                error => {
                this.errorMessage = <any>error;

                if(this.errorMessage != null){
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this._cfgTipoDestinoService.select().subscribe(
                response => {
                this.tiposDestino = response;
            },
                error => {
                this.errorMessage = <any>error;

                if(this.errorMessage != null){
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this._cfgTipoSenialService.select().subscribe(
                response => {
                this.senal = response;
            },
                error => {
                this.errorMessage = <any>error;

                if(this.errorMessage != null){
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this._msvInventarioSenialService.getMsvInventarioSenial().subscribe(
                response => {
                if (response) {

                    console.log(response);
                    this.msvInventarioSenials = response.data;
                    let timeoutId = setTimeout(() => {
                        //this.iniciarTabla();
                    }, 100);
                }
            },
                error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
    }


    ///////////////////////////////////
    onReady(): Promise<void> {
        return this.scriptLoadingPromise;
    }

    initMap(mapHtmlElement: HTMLElement, options: google.maps.MapOptions): Promise<google.maps.Map> {
        return this.onReady().then(() => {
            this.map = new google.maps.Map(mapHtmlElement, options);

            var marker = new google.maps.Marker({
                position: {lat: 4.624335, lng: -74.063644},
                map: this.map,
                animation: google.maps.Animation.BOUNCE,
                draggable: true
            });


                google.maps.event.addListener(this.map, 'click', function (event) {

                        var newLatLng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
                        marker.setPosition(newLatLng);

                        document.getElementById("lat")['value'] = event.latLng.lat();
                        document.getElementById("lng")['value'] = event.latLng.lng();

                        var geocoder = new google.maps.Geocoder();
                        geocoder.geocode({
                            'latLng': event.latLng
                        }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                if (results[0]) {
                                    document.getElementById("address")['value'] = results[0].formatted_address;
                                    document.getElementsByName("direccion")[0]['value'] = results[0].formatted_address;
                                }
                            }
                        });

                });


            return this.map;

        });
    }

    loadScriptLoadingPromise() {
        const script = window.document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        const callbackName: string = 'initMap';
        script.src = getScriptSrc(callbackName);
        this.scriptLoadingPromise = new Promise<void>((resolve: Function, reject: Function) => {
            (<any>window)[callbackName] = () => { resolve(); };

            script.onerror = (error: Event) => { reject(error); };
        });
        window.document.body.appendChild(script);
    }

    //////////////////////////////////

    onGeo(address) {
        document.getElementById('address')['value'] = address;
        document.getElementById("geo")['style']['visibility'] = "visible";
        document.getElementById("searchAddress")['style']['visibility'] = "hidden";
        document.getElementById("map")['style']['pointer-events'] = "none";
        document.getElementById("address")['style']['visibility'] = "visible";
        document.getElementById("address").setAttribute('readonly', 'readonly');
        this.onSearchGeo();
    }

    onEdit(params) {
        document.getElementsByName("id")[0]['value'] = params.id;
        document.getElementsByName("inventario")[0]['value'] = params.inventario.id;
        document.getElementsByName("fecha")[0]['value'] = params.fecha;
        document.getElementsByName("unidad")[0]['value'] = params.unidad;
        document.getElementsByName("color")[0]['value'] = params.tipoColor.id;
        document.getElementsByName("direccion")[0]['value'] = params.direccion;
        document.getElementById("lat")['value'] = params.latitud;
        document.getElementById("lng")['value'] = params.longitud;
        document.getElementsByName("codigo")[0]['value'] = params.codigo;
        document.getElementsByName("nombre")[0]['value'] = params.nombre;
        document.getElementsByName("valor")[0]['value'] = params.valor;
        document.getElementsByName("estado")[0]['value'] = params.tipoEstado.id;
        document.getElementsByName("cantidad")[0]['value'] = params.cantidad;
    }

    onSearchGeo() {

        var map = new google.maps.Map(this.mapRef.nativeElement, {
            center: {lat: 4.624335, lng: -74.063644},
            zoom: 16,
            scrollwheel: true,
            disableDoubleClickZoom: false,
            rotateControl: true,
            scaleControl: true,
            disableDefaultUI: true,
            zoomControl: true,
            gestureHandling: 'greedy'
        });
        var geocoder = new google.maps.Geocoder();
        var address = document.getElementById('address')['value'];
        geocoder.geocode({'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map,
                    animation: google.maps.Animation.BOUNCE,
                    draggable: true
                });

                google.maps.event.addListener(map, 'click', function(event){

                    var newLatLng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
                    marker.setPosition(newLatLng);

                    document.getElementById("lat")['value'] = event.latLng.lat();
                    document.getElementById("lng")['value'] = event.latLng.lng();

                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({
                        'latLng': event.latLng
                    }, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                document.getElementById("address")['value'] = results[0].formatted_address;
                                document.getElementsByName("direccion")[0]['value'] = results[0].formatted_address;
                            }
                        }
                    });

                });
            } else {
                alert('La búsqueda no tuvo éxito.');
            }
        });

    }

    onCloseGeo() {
        document.getElementById("geo")['style']['visibility'] = "hidden";
        document.getElementById("address")['style']['visibility'] = "hidden";
        document.getElementById("searchAddress")['style']['visibility'] = "hidden";
    }

    onAddress() {
        document.getElementById("geo")['style']['visibility'] = "visible";
        document.getElementById("address")['style']['visibility'] = "visible";
        document.getElementById("searchAddress")['style']['visibility'] = "visible";
        document.getElementById("map")['style']['pointer-events'] = "auto";
        document.getElementById("address").removeAttribute('readonly');

    }

    obtieneDestino(value) {

        switch (value) {
            case 1:

                this._cfgBodegaService.select().subscribe(
                        response => {
                        this.destino = response;
                    },
                        error => {
                        this.errorMessage = <any>error;

                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert('Error en la petición');
                        }
                    }
                );

                break;
            case 2:

                this._municipioService.getMunicipioSelect().subscribe(
                        response => {
                        this.destino = response;
                    },
                        error => {
                        this.errorMessage = <any>error;

                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert('Error en la petición');
                        }
                    }
                );

                break;
        }

    }

    search(){
        var radios = document.getElementsByName('tipoDestino');

        for (var i in radios){
            for(var item in radios[i]){
                if(typeof radios[i]['checked'] !== 'undefined') {
                    if (radios[i]['checked']) {
                        this.tipoDestinoSelected = radios[i]['value'];
                    }
                }
            }
        }

        var radios = document.getElementsByName('senal');

        for (var i in radios){
            for(var item in radios[i]){
                if(typeof radios[i]['checked'] !== 'undefined') {
                    if (radios[i]['checked']) {
                        this.tipoSenalSelected = radios[i]['value'];
                    }
                }
            }
        }

        this.datos.destinoId = this.destinoSelected;
        this.datos.tipoDestinoId = this.tipoDestinoSelected;
        this.datos.tipoSenalId = this.tipoSenalSelected;

        let token = this._loginService.getToken();
        this._msvInventarioSenialService.searchByParametros(this.datos,token).subscribe(
                response => {
                this.respuesta = response;
                if(this.respuesta.status == 'success'){ console.log(response.data);
                    this.senales = response.data;
                    //this.iniciarTabla();

                    /*swal({
                        title: 'Perfecto',
                        text: "¡Señales encontradas!",
                        type: 'info',
                        showCloseButton: true,
                        focusConfirm: false,
                        confirmButtonText:
                            '<i class="fa fa-thumbs-up"></i> OK!',
                        confirmButtonAriaLabel: 'Thumbs up, great!',
                        cancelButtonText:
                            '<i class="fa fa-thumbs-down"></i>',
                        cancelButtonAriaLabel: 'Thumbs down',
                    });*/alert('Perfecto Señales encontradas!');
                }else{
                    /*swal({
                        title: 'Alerta',
                        text: "¡No existen señales, por favor registrela y vuelva hacer una búsqueda!",
                        type: 'warning',
                        showCancelButton: true,
                        focusConfirm: true,
                        confirmButtonText:
                            '<i class="fa fa-thumbs-up"></i> Registrar',
                        confirmButtonAriaLabel: 'Thumbs up, great!',
                        cancelButtonText:
                            '<i class="fa fa-thumbs-down"></i> Cancelar',
                        cancelButtonAriaLabel: 'Thumbs down',
                    }).then((result) => {
                        if (result.value) {
                            this.formNew = true;
                            this.formSearch = false;
                        }
                    });*/
                    alert('Alerta ¡No existen señal(es) o aún no se ha(n) agregado a un inventario, por favor registrela aquí o agreguela a un inventario:(Dirijase a: RF- Seguridad Vial:Señales) y vuelva hacer una búsqueda!');
                    this.onAdd();
                }
                    error => {
                    this.errorMessage = <any>error;
                    if(this.errorMessage != null){
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }

            });
    }

    getInventario(idInv, dateInv){
        document.getElementById("inventario")['style']['visibility'] = "visible";
        this.idInv = idInv;
        this.dateInv   = dateInv;
    }

    searchInventario(type){

        this.searchBySenial(type);

    }

    onExportInv(){

        var radios = document.getElementsByName('senal');
        var senial = 0;

        for (var i in radios){
            for(var item in radios[i]){
                if(typeof radios[i]['checked'] !== 'undefined') {
                    if (radios[i]['checked']) {
                        senial = radios[i]['value'];
                    }
                }
            }
        }

        if(senial == 0) {
            alert('Seleccione el Tipo de señal a buscar!')
        } else
        {
            this.datInv.idInv = this.idInv;
            this.datInv.dateInv = this.dateInv;
            this.datInv.typeSen = senial;

            this._msvInventarioSenialService.exportInv(this.datInv);
        }

    }

    searchBySenial(typeSen) {

        this.datInv.idInv = this.idInv;
        this.datInv.dateInv = this.dateInv;
        this.datInv.typeSen = typeSen;

        let token = this._loginService.getToken();
        this._msvInventarioSenialService.searchBySenial(this.datInv, token).subscribe(
                response => {

                this.senalesPorInventario = response;

            },
                error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        setTimeout(function(){
            var src = document.getElementsByName("src");
            var logo = document.getElementsByName("logo");

            for (var i in src){
                for(var item in src[i]){
                    logo[i].setAttribute('src', environment.apiUrl + '../logos/' + src[i]['value']);
                }
            }

            var setColor = document.getElementsByName("setColor");
            var getColor = document.getElementsByName("getColor");

            for (var i in getColor){
                for(var item in getColor[i]){
                    setColor[i]['style']['background-color'] = getColor[i]['value'];
                    setColor[i]['style']['background-image'] = '';
                }
            }
        }, 2500);
    }

    onAdd(){

        this._msvInventarioSenialService.searchByFull().subscribe(
                response => {

                this.senalesPorAsignar = response;

                    document.getElementById("formAdd")['style']['visibility'] = "visible";

            },
                error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        setTimeout(function(){
            var src = document.getElementsByName("src");
            var logo = document.getElementsByName("logo");

            for (var i in src){
                for(var item in src[i]){
                    logo[i].setAttribute('src', environment.apiUrl + '../logos/' + src[i]['value']);
                }
            }

            var setColor = document.getElementsByName("setColor");
            var getColor = document.getElementsByName("getColor");

            for (var i in getColor){
                for(var item in getColor[i]){
                    setColor[i]['style']['background-color'] = getColor[i]['value'];
                    setColor[i]['style']['background-image'] = '';
                }
            }
        }, 2500);


    }

    checkAll(e){

        var checkboxParent = document.getElementsByName('_senalParent_')[0]['checked'];
        var checkboxes = document.getElementsByName('_senal_');

        for (var i in checkboxes){
            for(var item in checkboxes[i]){
                if(typeof checkboxes[i]['checked'] !== 'undefined') {
                    if (!checkboxes[i]['checked']) {
                        checkboxes[i]['checked'] = true;
                        this.build[checkboxes[i]['value']] = checkboxes[i]['value'];
                    } else {
                        checkboxes[i]['checked'] = false;
                        delete this.build[checkboxes[i]['value']];
                    }
                    if (checkboxParent){
                        checkboxes[i]['checked'] = true;
                        this.build[checkboxes[i]['value']] = checkboxes[i]['value'];
                    } else {
                        checkboxes[i]['checked'] = false;
                        delete this.build[checkboxes[i]['value']];
                    }
                }
            }
        }

    }

    check(e){

        if(e.target.checked){
            this.build[e.target.value] = e.target.value;
        } else {
            delete this.build[e.target.value];
        }

    }

    onFileChange(event) {
        if(event.target.files.length > 0) {
            const fileSelected: File = event.target.files[0];

            this.file = new FormData();
            this.file.append('file', fileSelected);
        }
    }

    onExport(){
        this._msvInventarioSenialService.export();
    }

    onSend() {
        let token = this._loginService.getToken();

        this.msvInventarioSenial.id        = document.getElementsByName("id")[0]['value'];
        this.msvInventarioSenial.inventario= document.getElementsByName("inventario")[0]['value'];
        this.msvInventarioSenial.fecha     = document.getElementsByName("fecha")[0]['value'];
        this.msvInventarioSenial.unidad    = document.getElementsByName("unidad")[0]['value'];
        this.msvInventarioSenial.tipoColorId = document.getElementsByName("color")[0]['value'];
        this.msvInventarioSenial.direccion = document.getElementsByName("direccion")[0]['value'];
        this.msvInventarioSenial.latitud   = document.getElementById("lat")['value'];
        this.msvInventarioSenial.longitud  = document.getElementById("lng")['value'];
        this.msvInventarioSenial.codigo    = document.getElementsByName("codigo")[0]['value'];
        this.msvInventarioSenial.nombre    = document.getElementsByName("nombre")[0]['value'];
        this.msvInventarioSenial.valor     = document.getElementsByName("valor")[0]['value'];
        this.msvInventarioSenial.tipoEstadoId    = document.getElementsByName("estado")[0]['value'];
        this.msvInventarioSenial.cantidad  = document.getElementsByName("cantidad")[0]['value'];

        var valid = "";

        if (this.msvInventarioSenial.inventario == 0) {
            valid += "Debe seleccionar un Inventario.\n";
        }

        if (typeof this.msvInventarioSenial.fecha == 'undefined') {
            valid += "Debe seleccionar una fecha.\n";
        }
        if (typeof this.msvInventarioSenial.unidad == 'undefined') {
            valid += "Debe ingresar una unidad.\n";
        }
        if (this.msvInventarioSenial.tipoColorId == 0) {
            valid += "Debe ingresar un color.\n";
        }
        if (typeof this.msvInventarioSenial.direccion == 'undefined') {
            valid += "Debe seleccionar una dirección.\n";
        }
        if (typeof this.msvInventarioSenial.codigo == 'undefined') {
            valid += "Debe ingresar un código.\n";
        }
        if (typeof this.msvInventarioSenial.nombre == 'undefined') {
            valid += "Debe ingresar un nombre.\n";
        }
        if (this.msvInventarioSenial.valor == 0 ) {
            valid += "Debe ingresar un valor.\n";
        }
        if (this.msvInventarioSenial.tipoEstadoId == 0) {
            valid += "Debe ingresar un estado.\n";
        }
        if (this.msvInventarioSenial.cantidad == 0 ) {
            valid += "Debe ingresar una cantidad.\n";
        }

        if(valid != ""){
            /*swal({
                title: 'Advertencia',
                text: valid,
                type: 'error',
                confirmButtonText: 'Aceptar'
            });*/
            alert(valid);
        }else {

            if(this.msvInventarioSenial.id == 0){
            this._msvInventarioSenialService.register(this.file, this.msvInventarioSenial, token).subscribe(
                    response => {

                    this.respuesta = response;

                    if (this.respuesta.status == 'success') {
                        this.ready.emit(true);
                        /*swal({
                            title: 'Perfecto!',
                            text: 'Registro exitoso!',
                            type: 'success',
                            confirmButtonText: 'Aceptar'
                        });*/
                        alert('Perfecto!\nRegistro exitoso!');
                        document.getElementsByName("id")[0]['value'] = '';
                        document.getElementsByName("inventario")[0]['value'] = '';
                        document.getElementsByName("fecha")[0]['value'] = '';
                        document.getElementsByName("unidad")[0]['value'] = '';
                        document.getElementsByName("color")[0]['value'] = '';
                        document.getElementsByName("direccion")[0]['value'] = '';
                        document.getElementsByName("codigo")[0]['value'] = '';
                        this.file = null;
                        document.getElementsByName("nombre")[0]['value'] = '';
                        document.getElementsByName("valor")[0]['value'] = '';
                        document.getElementsByName("estado")[0]['value'] = '';
                        document.getElementsByName("cantidad")[0]['value'] = '';
                        this.onAdd();
                    } else {
                        /*swal({
                            title: 'Error!',
                            text: 'La señal ya se encuentra registrada',
                            type: 'error',
                            confirmButtonText: 'Aceptar'
                        })*/
                        alert('Error!\nLa señal ya se encuentra registrada');
                    }
                        error => {
                        this.errorMessage = <any>error;
                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert("Error en la petición");
                        }
                    }
                });
            }else{
            //  this.formConfirm = true;
            //this.formPdf = false;
                let token = this._loginService.getToken();
                this._msvInventarioSenialService.edit(this.file, this.msvInventarioSenial, token).subscribe(
                        response => {
                        //console.log(response);
                        this.respuesta = response;
                        console.log(this.respuesta);
                        if (this.respuesta.status == 'success') {
                            this.ready.emit(true);
                            /*swal({
                                title: 'Perfecto!',
                                text: 'El registro se ha modificado con exito',
                                type: 'success',
                                confirmButtonText: 'Aceptar'
                            })*/
                            alert('Perfecto! El registro se ha modificado con exito.');
                            document.getElementsByName("id")[0]['value'] = '';
                            document.getElementsByName("inventario")[0]['value'] = '';
                        }   document.getElementsByName("fecha")[0]['value'] = '';
                            document.getElementsByName("unidad")[0]['value'] = '';
                            document.getElementsByName("color")[0]['value'] = '';
                            document.getElementsByName("direccion")[0]['value'] = '';
                            document.getElementsByName("codigo")[0]['value'] = '';
                            this.file = null;
                            document.getElementsByName("nombre")[0]['value'] = '';
                            document.getElementsByName("valor")[0]['value'] = '';
                            document.getElementsByName("estado")[0]['value'] = '';
                            document.getElementsByName("cantidad")[0]['value'] = '';
                            this.onAdd();
                            error => {
                            this.errorMessage = <any>error;

                            if (this.errorMessage != null) {
                                console.log(this.errorMessage);
                                alert("Error en la petici�n");
                            }
                        }

                    });
            }
        }
        this.senalSelected = "";
    }

    iniciarTabla() {
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
            },
        });
        this.table = $('#dataTables-example').DataTable();
    }

}

//Replace this by anything without an ID_KEY
const getScriptSrc = (callbackName) => {
    return `https://maps.googleapis.com/maps/api/js?key=AIzaSyCZLRPtun19mn3xqSZi08dPp-1R4P2A2B4&callback=${callbackName}`;
}