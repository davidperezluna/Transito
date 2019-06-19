import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ToolTipModule } from 'angular2-tooltip'

import { UserEmpresaModule } from './userEmpresa/userEmpresa.module';
import { UserEmpresaTransporteModule } from './userEmpresaTransporte/userEmpresaTransporte.module';
import { UserCiudadanoModule } from './userCiudadano/userCiudadano.module';
import { UserCfgTipoIdentificacionModule } from './userCfgTipoIdentificacion/userCfgTipoIdentificacion.module';
import { UserCfgGeneroModule } from './userCfgGenero/userCfgGenero.module';
import { UserCfgGrupoSanguineoModule } from './userCfgGrupoSanguineo/userCfgGrupoSanguineo.module';
import { UserCfgMenuModule } from './userCfgMenu/userCfgMenu.module';
import { UserCfgRoleModule } from './userCfgRole/userCfgRole.module';
import { UserUsuarioMenuModule } from './userUsuarioMenu/userUsuarioMenu.module';
import { UserCfgGrupoEtnicoModule } from './userCfgGrupoEtnico/userCfgGrupoEtnico.module';

import { HomeModule } from './home/home.module';
import { BancoModule } from './banco/banco.module';
import { CfgTipoInfractorModule } from './cfgTipoInfractor/cfgTipoInfractor.module';
import { RpcccInventarioDocumentalModule } from './rpcccInventarioDocumental/rpcccInventarioDocumental.module';

import { CfgPaisModule } from './cfgPais/cfgPais.module';
import { CfgDepartamentoModule } from './cfgDepartamento/cfgDepartamento.module';
import { CfgMunicipioModule } from './cfgMunicipio/cfgMunicipio.module';
import { CfgAdmFormatoModule } from './cfgAdmFormato/cfgAdmFormato.module';
import { CfgAdmFormatoTipoModule } from './cfgAdmFormatoTipo/cfgAdmFormatoTipo.module';
import { CfgModuloModule } from './cfgModulo/cfgModulo.module';

import { CfgBodegaModule } from './cfgBodega/cfgBodega.module';
import { SvCfgSenialUnidadMedidaModule } from './svCfgSenialUnidadMedida/svCfgSenialUnidadMedida.module';
import { SvCfgSenialTipoModule } from './svCfgSenialTipo/svCfgSenialTipo.module';
import { SvCfgSenialColorModule } from './svCfgSenialColor/svCfgSenialColor.module';
import { SvCfgSenialEstadoModule } from './svCfgSenialEstado/svCfgSenialEstado.module';
import { SvCfgSenialLineaModule } from './svCfgSenialLinea/svCfgSenialLinea.module';
import { SvCfgSenialProveedorModule } from './svCfgSenialProveedor/svCfgSenialProveedor.module';
import { SvCfgSenialModule } from './svCfgSenial/svCfgSenial.module';
import { SvSenialInventarioModule } from './svSenialInventario/svSenialInventario.module';

import { CvCdoComparendoModule } from './cvCdoComparendo/cvCdoComparendo.module';
import { CvCdoTrazabilidadModule } from './cvCdoTrazabilidad/cvCdoTrazabilidad.module';
import { CvCdoNotificacionModule } from './cvCdoNotificacion/cvCdoNotificacion.module';
import { CvCdoCfgDescuentoModule } from './cvCdoCfgDescuento/cvCdoCfgDescuento.module';
import { CvCdoCfgInteresModule } from './cvCdoCfgInteres/cvCdoCfgInteres.module';
import { CvCdoCfgEstadoModule } from './cvCdoCfgEstado/cvCdoCfgEstado.module';
import { CvAudienciaModule } from './cvAudiencia/cvAudiencia.module';
import { CvAuCfgAtencionModule } from './cvAuCfgAtencion/cvAuCfgAtencion.module';
import { CvAuCfgHorarioModule } from './cvAuCfgHorario/cvAuCfgHorario.module';
import { CvAuCfgTipoModule } from './cvAuCfgTipo/cvAuCfgTipo.module';
import { CvLcCfgMotivoModule } from './cvLcCfgMotivo/cvLcCfgMotivo.module';
import { CvRestriccionModule } from './cvRestriccion/cvRestriccion.module';
import { CvCfgInteresModule } from './cvCfgInteres/cvCfgInteres.module';
import { CvCfgPorcentajeInicialModule } from './cvCfgPorcentajeInicial/cvCfgPorcentajeInicial.module';
import { CvCfgTipoRestriccionModule } from './cvCfgTipoRestriccion/cvCfgTipoRestriccion.module';
import { CvLcCfgTipoRestriccionModule } from './cvLcCfgTipoRestriccion/cvLcCfgTipoRestriccion.module';
import { UserCfgTipoMedidaCautelarModule } from './userCfgTipoMedidaCautelar/userCfgTipoMedidaCautelar.module';
import { CvMedidaCautelarModule } from './cvMedidaCautelar/cvMedidaCautelar.module';

import { VhloCfgTipoVehiculoModule } from './vhloCfgTipoVehiculo/vhloCfgTipoVehiculo.module';
import { VhloCfgTipoAlertaModule } from './vhloCfgTipoAlerta/vhloCfgTipoAlerta.module';
import { VhloCfgCdaModule } from './vhloCfgCda/vhloCfgCda.module';
import { VhloCfgOrigenRegistroModule } from './vhloCfgOrigenRegistro/vhloCfgOrigenRegistro.module';
import { VhloCfgModalidadTransporteModule } from './vhloCfgModalidadTransporte/vhloCfgModalidadTransporte.module';
import { VhloCfgRadioAccionModule } from './vhloCfgRadioAccion/vhloCfgRadioAccion.module';
import { VhloCfgTransportePasajeroModule } from './vhloCfgTransportePasajero/vhloCfgTransportePasajero.module';
import { VhloCfgTransporteEspecialModule } from './vhloCfgTransporteEspecial/vhloCfgTransporteEspecial.module';
import { VhloCfgEmpresaGpsModule } from './vhloCfgEmpresaGps/vhloCfgEmpresaGps.module';
import { VhloCfgTipoRodajeModule } from './vhloCfgTipoRodaje/vhloCfgTipoRodaje.module';
import { VhloCfgTipoCabinaModule } from './vhloCfgTipoCabina/vhloCfgTipoCabina.module';
import { VhloCfgTipoMaquinariaModule } from './vhloCfgTipoMaquinaria/vhloCfgTipoMaquinaria.module';
import { VhloCfgClaseMaquinariaModule } from './vhloCfgClaseMaquinaria/vhloCfgClaseMaquinaria.module';
import { VhloCfgSubpartidaArancelariaModule } from './vhloCfgSubpartidaArancelaria/vhloCfgSubpartidaArancelaria.module';
import { VhloCfgCondicionIngresoModule } from './vhloCfgCondicionIngreso/vhloCfgCondicionIngreso.module';
import { VhloPlacaSedeModule } from './vhloPlacaSede/vhloPlacaSede.module';
import { VhloSoatModule } from './vhloSoat/vhloSoat.module';
import { VhloTecnoMecanicaModule } from './vhloTecnoMecanica/vhloTecnoMecanica.module';
import { VhloCfgMarcaModule } from './vhloCfgMarca/vhloCfgMarca.module';
import { VhloCfgLineaModule } from './vhloCfgLinea/vhloCfgLinea.module';
import { VhloCfgClaseModule } from './vhloCfgClase/vhloCfgClase.module';
import { VhloCfgColorModule } from './vhloCfgColor/vhloCfgColor.module';
import { VhloCfgCombustibleModule } from './vhloCfgCombustible/vhloCfgCombustible.module';
import { VhloCfgServicioModule } from './vhloCfgServicio/vhloCfgServicio.module';
import { VhloCfgValorModule } from './vhloCfgValor/vhloCfgValor.module';
import { VhloRnaPreregistroModule } from './vhloRnaPreregistro/vhloRnaPreregistro.module';
import { VhloBuscarModule } from './vhloBuscar/vhloBuscar.module';
import { VhloVehiculoModule } from './vhloVehiculo/vhloVehiculo.module';
import { VhloPropietarioModule } from './vhloPropietario/vhloPropietario.module';
import { VhloCfgCarroceriaModule } from './vhloCfgCarroceria/vhloCfgCarroceria.module';
import { VhloCfgPlacaModule } from './vhloCfgPlaca/vhloCfgPlaca.module';
import { VhloCfgLimitacionCausalModule } from './vhloCfgLimitacionCausal/vhloCfgLimitacionCausal.module';
import { VhloCfgLimitacionTipoModule } from './vhloCfgLimitacionTipo/vhloCfgLimitacionTipo.module';
import { VhloLimitacionModule } from './vhloLimitacion/vhloLimitacion.module';
import { VhloRnaPreasignacionPlacaModule } from './vhloRnaPreasignacionPlaca/vhloRnaPreasignacionPlaca.module';

import { SvCapacitacionModule } from "./svCapacitacion/svCapacitacion.module";
import { SvCfgFuncionModule } from "./svCfgFuncion/svCfgFuncion.module";
import { SvCfgFuncionCriterioModule } from "./svCfgFuncionCriterio/svCfgFuncionCriterio.module";

import { SvCfgAreaModule } from "./svCfgArea/svCfgArea.module";
import { SvCfgTipoAreaModule } from "./svCfgTipoArea/svCfgTipoArea.module";
import { SvCfgAseguradoraModule } from "./svCfgAseguradora/svCfgAseguradora.module";
import { SvCfgCalzadaCarrilModule } from "./svCfgCalzadaCarril/svCfgCalzadaCarril.module";
import { SvCfgCardinalidadModule } from "./svCfgCardinalidad/svCfgCardinalidad.module";
import { SvCfgClaseChoqueModule } from "./svCfgClaseChoque/svCfgClaseChoque.module";
import { SvCfgCondicionViaModule } from "./svCfgCondicionVia/svCfgCondicionVia.module";
import { SvCfgControlViaModule } from "./svCfgControlVia/svCfgControlVia.module";
import { SvCfgDisenioModule } from "./svCfgDisenio/svCfgDisenio.module";
import { SvCfgEntidadAccidenteModule } from "./svCfgEntidadAccidente/svCfgEntidadAccidente.module";
import { SvCfgEstadoConductorModule } from "./svCfgEstadoConductor/svCfgEstadoConductor.module";
import { SvCfgEstadoIluminacionModule } from "./svCfgEstadoIluminacion/svCfgEstadoIluminacion.module";
import { SvCfgEstadoTiempoModule } from "./svCfgEstadoTiempo/svCfgEstadoTiempo.module";
import { SvCfgEstadoViaModule } from "./svCfgEstadoVia/svCfgEstadoVia.module";
import { SvCfgFallaModule } from "./svCfgFalla/svCfgFalla.module";
import { SvCfgGeometriaModule } from "./svCfgGeometria/svCfgGeometria.module";
import { SvCfgGradoExamenModule } from "./svCfgGradoExamen/svCfgGradoExamen.module";
import { SvCfgGravedadVictimaModule } from "./svCfgGravedadVictima/svCfgGravedadVictima.module";
import { SvCfgHipotesisModule } from "./svCfgHipotesis/svCfgHipotesis.module";
import { SvCfgHospitalModule } from "./svCfgHospital/svCfgHospital.module";
import { SvCfgIluminacionModule } from "./svCfgIluminacion/svCfgIluminacion.module";
import { SvCfgLugarImpactoModule } from "./svCfgLugarImpacto/svCfgLugarImpacto.module";
import { SvCfgMaterialModule } from "./svCfgMaterial/svCfgMaterial.module";
import { SvCfgMotivoAnulacionModule } from "./svCfgMotivoAnulacion/svCfgMotivoAnulacion.module";
import { SvCfgNacionalidadModule } from "./svCfgNacionalidad/svCfgNacionalidad.module";
import { SvCfgRequiereEmpresaModule } from "./svCfgRequiereEmpresa/svCfgRequiereEmpresa.module";
import { SvCfgResultadoExamenModule } from "./svCfgResultadoExamen/svCfgResultadoExamen.module";
import { SvCfgSectorModule } from "./svCfgSector/svCfgSector.module";
import { SvCfgSustanciaPeligrosaModule } from "./svCfgSustanciaPeligrosa/svCfgSustanciaPeligrosa.module"; 
import { SvCfgTipoControlModule } from "./svCfgTipoControl/svCfgTipoControl.module";
import { SvCfgTipoGeometriaModule } from "./svCfgTipoGeometria/svCfgTipoGeometria.module";
import { SvCfgTipoViaModule } from "./svCfgTipoVia/svCfgTipoVia.module";
import { SvCfgTipoVictimaModule } from "./svCfgTipoVictima/svCfgTipoVictima.module";
import { SvCfgUnidadReceptoraModule } from "./svCfgUnidadReceptora/svCfgUnidadReceptora.module";
import { SvCfgUtilizacionModule } from "./svCfgUtilizacion/svCfgUtilizacion.module";
import { SvCfgVisualModule } from "./svCfgVisual/svCfgVisual.module";
import { SvCfgVisualDisminuidaModule } from "./svCfgVisualDisminuida/svCfgVisualDisminuida.module";
import { SvCfgZonaModule } from "./svCfgZona/svCfgZona.module";
import { SvCfgClaseActorViaModule } from './svCfgClaseActorVia/svCfgClaseActorVia.module';
import { SvCfgTemaCapacitacionModule } from './svCfgTemaCapacitacion/svCfgTemaCapacitacion.module';

import { registroEntregaProductoModule } from './registroEntregaProducto/registroEntregaProducto.module';

import { UserLcCfgCategoriaModule } from './userLcCfgCategoria/userLcCfgCategoria.module';
import { UserLicenciaConduccionModule } from './userLicenciaConduccion/userLicenciaConduccion.module';
import { UserLicenciaTransitoModule } from './userLicenciaTransito/userLicenciaTransito.module';
import { UserMedidaCautelarModule } from './userMedidaCautelar/userMedidaCautelar.module';
import { UserCfgEmpresaTipoModule } from './userCfgEmpresaTipo/userCfgEmpresaTipo.module';
import { UserCfgEmpresaServicioModule } from './userCfgEmpresaServicio/userCfgEmpresaServicio.module';

import { CfgAuditoriaModule } from './cfgAuditoria/cfgAuditoria.module';
import { CfgValorVehiculoModule } from './cfgValorVehiculo/cfgValorVehiculo.module'; 
import { CfgSmlmvModule } from './cfgSmlmv/cfgSmlmv.module';
import { cfgFestivoModule } from './cfgFestivo/cfgFestivo.module';
import { CfgTipoClaseModule } from './cfgTipoClase/cfgTipoClase.module';

import { MsvEvaluacionModule } from './msvEvaluacion/msvEvaluacion.module';
import { MsvCaracterizacionModule } from './msvCaracterizacion/msvCaracterizacion.module';
import { MsvCategoriaModule } from './msvCategoria/msvCategoria.module';
import { MsvVariableModule } from './msvVariable/msvVariable.module';
import { MsvParametroModule } from './msvParametro/msvParametro.module';
import { MsvCriterioModule } from './msvCriterio/msvCriterio.module';

import { SvIpatTalonarioModule } from './svIpatTalonario/svIpatTalonario.module';
import { SvIpatConsecutivoModule } from './svIpatConsecutivo/svIpatConsecutivo.module';
import { SvIpatAsignacionModule } from './svIpatAsignacion/svIpatAsignacion.module';
import { SvIpatImpresoBodegaModule } from './svIpatImpresoBodega/svIpatImpresoBodega.module';
import { SvIpatImpresoAsignacionModule } from './svIpatImpresoAsignacion/svIpatImpresoAsignacion.module';
import { SvIpatImpresoMunicipioModule } from './svIpatImpresoMunicipio/svIpatImpresoMunicipio.module';
import { SvIpatModule } from './svIpat/svIpat.module';

import { PqoCfgTarifaModule } from './pqoCfgTarifa/pqoCfgTarifa.module';
import { PqoCfgPatioModule } from './pqoCfgPatio/pqoCfgPatio.module';
import { PqoCfgGruaModule } from './pqoCfgGrua/pqoCfgGrua.module';
import { PqoGruaCiudadanoModule } from './pqoGruaCiudadano/pqoGruaCiudadano.module';
import { PqoInmovilizacionModule } from './pqoInmovilizacion/pqoInmovilizacion.module';

import { CfgOrganismoTransitoModule } from './cfgOrganismoTransito/cfgOrganismoTransito.module';
import { CfgTipoProcesoModule } from './vhloCfgLimitacionTipoProceso/vhloCfgLimitacionTipoProceso.module';
import { CfgEntidadJudicialModule } from './cfgEntidadJudicial/cfgEntidadJudicial.module';
import { SvCfgGravedadAccidenteModule } from './svCfgGravedadAccidente/svCfgGravedadAccidente.module';
import { SvCfgClaseAccidenteModule } from './svCfgClaseAccidente/svCfgClaseAccidente.module';
import { CfgChoqueConModule } from './cfgChoqueCon/cfgChoqueCon.module';
import { SvCfgObjetoFijoModule } from './svCfgObjetoFijo/svCfgObjetoFijo.module';

import { VhloTpConvenioModule } from './vhloTpConvenio/vhloTpConvenio.module';
import { VhloTpAsignacionModule } from './vhloTpAsignacion/vhloTpAsignacion.module';
// import { SucursalModule } from './empresa/sucursal/new/sucursal.module';

import { GdDocumentoModule } from './gdDocumento/gdDocumento.module';
import { GdTrazabilidadModule } from './gdTrazabilidad/gdTrazabilidad.module';
import { GdCfgTipoCorrespondenciaModule } from './gdCfgTipoCorrespondencia/gdCfgTipoCorrespondencia.module';
import { GdCfgMedioCorrespondenciaModule } from './gdCfgMedioCorrespondencia/gdCfgMedioCorrespondencia.module';

import { FroInfraccionModule } from './froInfraccion/froInfraccion.module';
import { FroInfrCfgCategoriaModule } from './froInfrCfgCategoria/froInfrCfgCategoria.module';

import { PnalCfgCdoConsecutivoModule } from './pnalCfgCdoConsecutivo/pnalCfgCdoConsecutivo.module';
import { PnalCfgCargoModule } from './pnalCfgCargo/pnalCfgCargo.module';
import { PnalCfgTipoNombramientoModule } from './pnalCfgTipoNombramiento/pnalCfgTipoNombramiento.module';
import { PnalFuncionarioModule } from './pnalFuncionario/pnalFuncionario.module';
import { PnalTalonarioModule } from './pnalTalonario/pnalTalonario.module';
import { PnalAsignacionModule } from './pnalAsignacion/pnalAsignacion.module';

import { CfgCargoModule } from './cfgCargo/cfgCargo.module';

import { ImoReasignacionModule } from './imoReasignacIon/imoReasignacion.module';
import { ImoActaModule } from './imoActa/imoActa.module';
import { ImoAsignacionModule } from './imoAsignacion/imoAsignacion.module';
import { ImoCfgTipoModule } from './imoCfgTipo/imoCfgTipo.module';
import { ImoBusquedaModule } from './imoBusqueda/imoBusqueda.module';
import { ImoLoteModule } from "./imoLote/imoLote.module";


import { RnrsPreasignacionPlacaModule } from './rnrsPreasignacionPlaca/rnrsPreasignacionPlaca.module';

import { FroFacTramiteModule } from './froFacTramite/froFacTramite.module';
import { FroTrteCfgCuentaModule } from './froTrteCfgCuenta/froTrteCfgCuenta.module';

import { GestionTransportePublicoModule } from './gestionTransportePublico/gestionTransportePublico.module';
import { rnaRegistroInsumosModule } from './rnaRegistroInsumos/rnaRegistroInsumos.module';
//import { RnaPreasignacionInsumoModule } from './rnaPreasignacIonInsumo/rnaPreasignacionInsumo.module';
import { RnmaPreregistroModule } from './rnmaPreregistro/rnmaPreregistro.module';
import { RnrsPreregistroModule } from './rnrsPreregistro/rnrsPreregistro.module';
import { ReporteModule } from './reporte/reporte.module';
import { VhloCertificadoTradicionModule } from './vhloCertificadoTradicion/vhloCertificadoTradicion.module';

import { BpCfgTipoInsumoModule } from './bpCfgTipoInsumo/bpCfgTipoInsumo.module';
import { BpInsumoModule } from './bpInsumo/bpInsumo.module';
import { BpActividadModule } from './bpActividad/bpActividad.module';
import { BpCuentaModule } from './bpCuenta/bpCuenta.module';
import { BpProyectoModule } from './bpProyecto/bpProyecto.module';

import { FroFacturaModule } from './froFactura/froFactura.module';
import { FroRecaudoModule } from './froRecaudo/froRecaudo.module';
import { FroTramiteModule } from './froTramite/froTramite.module';
import { FroTrteCfgConceptoModule } from './froTrteCfgConcepto/froTrteCfgConcepto.module';
import { FroTrtePrecioModule } from './froTrtePrecio/froTrtePrecio.module';
import { FroTrteSolicitudModule } from './froTrteSolicitud/froTrteSolicitud.module';
import { FroReporteIngresosModule } from './froReporteIngresos/froReporteIngresos.module';
import { FroCfgTipoRecaudoModule } from './froCfgTipoRecaudo/froCfgTipoRecaudo.module';
import { FroAcuerdoPagoModule } from './froAcuerdoPago/froAcuerdoPago.module';

import { BpCdpModule } from './bpCdp/bpCdp.module';

import { DashboardComponent } from './dashboard.component'; 

import {TopNavComponent} from '../shared';
import {SidebarComponent} from '../shared';
import {FooterComponent} from '../shared';
import {RightsidebarComponent} from '../shared';

@NgModule({
  imports: [
    CvLcCfgTipoRestriccionModule,
    CommonModule,
    RouterModule,
    Ng2BootstrapModule.forRoot(),
    ToolTipModule,
    UserEmpresaModule,
    UserEmpresaTransporteModule,
    UserCiudadanoModule,
    UserCfgTipoIdentificacionModule,
    UserCfgGeneroModule,
    UserCfgGrupoSanguineoModule,
    UserCfgMenuModule,
    UserCfgRoleModule,
    UserUsuarioMenuModule,
    UserLicenciaConduccionModule,
    UserLicenciaTransitoModule,
    UserMedidaCautelarModule,
    UserCfgGrupoEtnicoModule,
    HomeModule,
    BancoModule,
    CfgPaisModule,
    CfgDepartamentoModule,
    CfgMunicipioModule,
    CfgModuloModule,
    CfgTipoInfractorModule,
    CfgAuditoriaModule,
    CfgSmlmvModule,
    cfgFestivoModule,
    CfgTipoClaseModule,
    UserLcCfgCategoriaModule,
    SvCapacitacionModule,
    SvIpatTalonarioModule,
    SvIpatConsecutivoModule,
    SvIpatAsignacionModule,
    SvIpatImpresoBodegaModule,
    SvIpatImpresoAsignacionModule,
    SvIpatImpresoMunicipioModule,
    SvCfgFuncionModule,
    SvCfgFuncionCriterioModule,
    SvCfgClaseActorViaModule,
    SvCfgTemaCapacitacionModule,
    SvCfgAreaModule,
    SvCfgTipoAreaModule,
    SvCfgAseguradoraModule,
    SvCfgCalzadaCarrilModule,
    SvCfgCardinalidadModule,
    SvCfgClaseChoqueModule,
    SvCfgCondicionViaModule,
    SvCfgControlViaModule,
    SvCfgDisenioModule,
    SvCfgEntidadAccidenteModule,
    SvCfgEstadoConductorModule,
    SvCfgEstadoIluminacionModule,
    SvCfgEstadoTiempoModule,
    SvCfgEstadoViaModule,
    SvCfgFallaModule,
    SvCfgGeometriaModule,
    SvCfgGradoExamenModule,
    SvCfgGravedadVictimaModule,
    SvCfgHipotesisModule,
    SvCfgHospitalModule,
    SvCfgIluminacionModule,
    SvCfgLugarImpactoModule,
    SvCfgMaterialModule,
    SvCfgMotivoAnulacionModule,
    SvCfgNacionalidadModule,
    SvCfgRequiereEmpresaModule,
    SvCfgResultadoExamenModule,
    SvCfgSectorModule,
    SvCfgSustanciaPeligrosaModule,
    SvCfgTipoControlModule,
    SvCfgTipoGeometriaModule,
    SvCfgTipoViaModule,
    SvCfgTipoVictimaModule,
    SvCfgUnidadReceptoraModule,
    SvCfgUtilizacionModule,
    SvCfgVisualModule,
    SvCfgVisualDisminuidaModule,
    SvCfgZonaModule,
    SvCfgClaseAccidenteModule,
    
    MsvEvaluacionModule,
    MsvCaracterizacionModule,
    MsvCategoriaModule,
    MsvVariableModule,
    MsvParametroModule,
    MsvCriterioModule,

    GdDocumentoModule,
    GdTrazabilidadModule,
    GdCfgTipoCorrespondenciaModule,
    GdCfgMedioCorrespondenciaModule,
    FroInfraccionModule,
    FroInfrCfgCategoriaModule,
    PqoCfgTarifaModule,
    PqoCfgPatioModule,
    PqoCfgGruaModule,
    PqoGruaCiudadanoModule,
    PqoInmovilizacionModule,
    PnalCfgCdoConsecutivoModule,
    PnalCfgCargoModule,
    PnalCfgTipoNombramientoModule,
    PnalFuncionarioModule,
    CfgCargoModule,
    PnalTalonarioModule,
    PnalAsignacionModule,
    FroFacTramiteModule,
    FroTrteCfgCuentaModule,
    CfgAdmFormatoModule,
    CfgAdmFormatoTipoModule,
    CfgBodegaModule,
    SvCfgSenialUnidadMedidaModule,
    SvCfgSenialTipoModule,
    SvCfgSenialColorModule,
    SvCfgSenialEstadoModule,
    SvCfgSenialLineaModule,
    SvCfgSenialProveedorModule,
    SvCfgSenialModule,
    SvSenialInventarioModule,
    SvCfgGravedadAccidenteModule,
    CvCdoComparendoModule,
    CvCdoTrazabilidadModule,
    CvCdoNotificacionModule,
    CvCdoCfgDescuentoModule,
    CvCdoCfgInteresModule,
    CvCdoCfgEstadoModule,
    CvCfgTipoRestriccionModule,
    CvAudienciaModule,
    CvAuCfgAtencionModule,
    CvAuCfgHorarioModule,
    CvAuCfgTipoModule,
    CvLcCfgMotivoModule,
    CvRestriccionModule,
    CvCfgInteresModule,
    CvCfgPorcentajeInicialModule,
    VhloRnaPreregistroModule,
    VhloCfgLimitacionCausalModule,
    VhloCfgLimitacionTipoModule,
    VhloCfgTipoVehiculoModule,
    VhloCfgTipoAlertaModule,
    VhloCfgCdaModule,
    VhloCfgOrigenRegistroModule,
    VhloCfgModalidadTransporteModule,
    VhloCfgRadioAccionModule,
    VhloCfgTransportePasajeroModule,
    VhloCfgTransporteEspecialModule,
    VhloCfgEmpresaGpsModule,
    VhloCfgTipoRodajeModule,
    VhloCfgTipoCabinaModule,
    VhloCfgTipoMaquinariaModule,
    VhloCfgClaseMaquinariaModule,
    VhloCfgSubpartidaArancelariaModule,
    VhloCfgCondicionIngresoModule,
    VhloPlacaSedeModule,
    VhloCfgPlacaModule,
    VhloLimitacionModule,
    VhloRnaPreasignacionPlacaModule,
    VhloSoatModule,
    VhloTecnoMecanicaModule,
    VhloBuscarModule,
    VhloVehiculoModule,
    VhloPropietarioModule,
    VhloCfgCarroceriaModule,
    VhloCfgMarcaModule,
    VhloCfgLineaModule,
    VhloCfgValorModule,
    VhloCfgClaseModule,
    VhloCfgColorModule,
    VhloCfgCombustibleModule,
    VhloCfgServicioModule,
    GestionTransportePublicoModule,
    CfgOrganismoTransitoModule,
    CfgChoqueConModule,
    SvCfgObjetoFijoModule,
    CfgEntidadJudicialModule,
    rnaRegistroInsumosModule,
    RnmaPreregistroModule,
    CfgTipoProcesoModule,
    SvIpatModule,
    CfgValorVehiculoModule,
    RnrsPreregistroModule,
    ReporteModule,
    registroEntregaProductoModule,
    RpcccInventarioDocumentalModule,
    UserCfgEmpresaTipoModule,
    UserCfgEmpresaServicioModule,
    VhloCertificadoTradicionModule,
    ImoReasignacionModule,
    ImoBusquedaModule,
    ImoAsignacionModule,
    ImoCfgTipoModule,
    ImoActaModule,
    ImoLoteModule,
    UserCfgTipoMedidaCautelarModule,
    CvMedidaCautelarModule,
    BpCfgTipoInsumoModule,
    BpInsumoModule,
    BpCuentaModule,
    BpActividadModule,
    BpProyectoModule,
    BpCdpModule,
    RnrsPreasignacionPlacaModule,
    VhloTpConvenioModule,
    VhloTpAsignacionModule,
    FroFacturaModule,
    FroRecaudoModule,
    FroAcuerdoPagoModule,
    FroTramiteModule,
    FroTrteCfgConceptoModule,
    FroTrtePrecioModule,
    FroTrteSolicitudModule,
    FroReporteIngresosModule,
    FroCfgTipoRecaudoModule,
  ],
  declarations: [DashboardComponent, TopNavComponent, SidebarComponent, FooterComponent, RightsidebarComponent],
  exports: [DashboardComponent, TopNavComponent, SidebarComponent, FooterComponent, RightsidebarComponent],
  providers: [],
})

export class DashboardModule { }
