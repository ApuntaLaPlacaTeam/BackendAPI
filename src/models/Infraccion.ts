import { Document, Schema, Model, model } from "mongoose";

export interface IUbicacion {
    lat: number;
    long: number;
}

const ubicacionSchema = new Schema({
    lat: Number,
    long: Number
});

export interface IInfraccion {
    // API Miraflores
    nro: number;
    anio: number;
    mes: string;
    fecha: string;
    nroActaControl: number;
    codigoInfraccion: string;
    tenorInfraccion: string;
    situacionActa: string;
    actasAnuladas: number;
    apellidosConductor: string;
    nombresConductor: string;
    nroLicenciaConductor: string;
    tipoDeVia: string;
    lugarDeIntervencion: string;
    cuadra: string;
    codRuta: string;
    empresaTransporte: string;
    inspector: string;
    // App Fields To Save
    placaDeRodaje: string;
    linkFoto: string;
    dniDenunciante: string;
    ubicacion: IUbicacion;
    descripcion: string;

    public setAPIData( nro: any, anio: any, mes: string, fecha: string, nroActaControl: any, codigoInfraccion: string, tenorInfraccion: string, situacionActa: string, actasAnuladas: string, apellidosConductor: string, nombresConductor: string, nroLicenciaConductor: string, placaDeRodaje: string, tipoDeVia: string, lugarDeIntervencion: string, cuadra: string, codRuta: string, empresaTransporte: string, inspector: string ): void ;
    public setSaveData( linkFoto: string, placaDeRodaje: string, dniDenunciante: string, ubicacion: Ubicacion, descripcion: string ): void;
}

interface IInfraccionModel extends IInfraccion, Document { }

const infraccionSchema = new Schema({
    // API Miraflores
    nro: Number,
    anio: Number,
    mes: String,
    fecha: String,
    nroActaControl: Number,
    codigoInfraccion: String,
    tenorInfraccion: String,
    situacionActa: String,
    actasAnuladas: Number,
    apellidosConductor: String,
    nombresConductor: String,
    nroLicenciaConductor: String,
    tipoDeVia: String,
    lugarDeIntervencion: String,
    cuadra: String,
    codRuta: String,
    empresaTransporte: String,
    inspector: String,
    // App Fields To Sav,
    placaDeRodaje: String,
    linkFoto: String,
    dniDenunciante: String,
    ubicacion: ubicacionSchema,
    descripcion: String,
}, { timestamps: true } );

const Infraccion = model<IInfraccionModel>( "Infraccion", infraccionSchema );
export default Infraccion;