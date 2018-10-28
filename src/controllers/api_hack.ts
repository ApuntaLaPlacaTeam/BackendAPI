import axios from "axios";
import { default as Infraccion, IInfraccion, IUbicacion, IInfraccionModel } from "../models/Infraccion";
import { Response, Request, NextFunction } from "express";


export class InfraccionClass implements IInfraccion {
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
    placaDeRodaje: string;
    linkFoto: string;
    dniDenunciante: string;
    ubicacion: IUbicacion;
    descripcion: string;

    public setAPIData(nro: any, anio: any, mes: string, fecha: string, nroActaControl: any, codigoInfraccion: string, tenorInfraccion: string, situacionActa: string, actasAnuladas: string, apellidosConductor: string, nombresConductor: string, nroLicenciaConductor: string, placaDeRodaje: string, tipoDeVia: string, lugarDeIntervencion: string, cuadra: string, codRuta: string, empresaTransporte: string, inspector: string) {
        this.nro = parseInt( nro );
        this.anio = parseInt( anio );
        this.mes = mes;
        this.fecha = fecha;
        this.nroActaControl = parseInt( nroActaControl );
        this.codigoInfraccion = codigoInfraccion;
        this.tenorInfraccion = tenorInfraccion;
        this.situacionActa = situacionActa;
        this.actasAnuladas = parseInt( actasAnuladas );
        this.apellidosConductor = ( apellidosConductor == "0" ? "" : apellidosConductor );
        this.nombresConductor = ( nombresConductor == "0" ? "" : nombresConductor );
        this.nroLicenciaConductor = nroLicenciaConductor;
        this.placaDeRodaje = placaDeRodaje;
        this.tipoDeVia = tipoDeVia;
        this.lugarDeIntervencion = lugarDeIntervencion;
        this.cuadra = cuadra;
        this.codRuta = codRuta;
        this.empresaTransporte = empresaTransporte;
        this.inspector = inspector;
        return this;
    }

    public setFromIInfraccionModel( iinfraccionModel: IInfraccionModel ) {
        this.nro = iinfraccionModel.nro;
        this.anio = iinfraccionModel.anio;
        this.mes = iinfraccionModel.mes;
        this.fecha = iinfraccionModel.fecha;
        this.nroActaControl = iinfraccionModel.nroActaControl;
        this.codigoInfraccion = iinfraccionModel.codigoInfraccion;
        this.tenorInfraccion = iinfraccionModel.tenorInfraccion;
        this.situacionActa = iinfraccionModel.situacionActa;
        this.actasAnuladas = iinfraccionModel.actasAnuladas;
        this.apellidosConductor = iinfraccionModel.apellidosConductor;
        this.nombresConductor = iinfraccionModel.nombresConductor;
        this.nroLicenciaConductor = iinfraccionModel.nroLicenciaConductor;
        this.placaDeRodaje = iinfraccionModel.placaDeRodaje;
        this.tipoDeVia = iinfraccionModel.tipoDeVia;
        this.lugarDeIntervencion = iinfraccionModel.lugarDeIntervencion;
        this.cuadra = iinfraccionModel.cuadra;
        this.codRuta = iinfraccionModel.codRuta;
        this.empresaTransporte = iinfraccionModel.empresaTransporte;
        this.inspector = iinfraccionModel.inspector;
        this.linkFoto = iinfraccionModel.linkFoto;
        this.dniDenunciante = iinfraccionModel.dniDenunciante;
        this.ubicacion = iinfraccionModel.ubicacion;
        this.descripcion = iinfraccionModel.descripcion;
        return this;
    }

    public setSaveData(linkFoto: string, placaDeRodaje: string, dniDenunciante: string, ubicacion: any, descripcion: string): void {
        this.linkFoto = linkFoto;
        this.placaDeRodaje = placaDeRodaje;
        this.dniDenunciante = dniDenunciante;
        this.ubicacion = ubicacion;
        this.descripcion = descripcion;
    }
}

export class TipoInfraccion {
    codigo: string;
    nro: number;
    tipoDeInfraccion: string;
    cantidadDeInfracciones: number;

    constructor( codigo: string, nro: any, tipoDeInfraccion: string, cantidadDeInfracciones: any ) {
        this.codigo = codigo;
        this.nro = parseInt( nro );
        this.tipoDeInfraccion = tipoDeInfraccion;
        this.cantidadDeInfracciones = parseInt( cantidadDeInfracciones );
    }
}

export class InfraccionxUbicacion {
    anio: number;
    codigo: string;
    ubicacion: string;
    codigoMes: string;
    mes: string;
    cantidad: number;

    constructor( anio: any, codigo: any, ubicacion: string, codigoMes: string, mes: string, cantidad: any ) {
        this.anio = parseInt( anio );
        this.codigo = codigo;
        this.ubicacion = ubicacion;
        this.codigoMes = codigoMes;
        this.mes = mes;
        this.cantidad = parseInt( cantidad );
    }
}

export class APIHackathon {
    private baseURL: string = "http://miraflores.cloudapi.junar.com/api/v2/datastreams/";
    private authPath: string = "/data.json/?auth_key=3e0e314caca6068b253fa0e3e716a9d2f4f03d75";

    public getTiposDeInfracciones = async ( req: Request, res: Response, next: NextFunction ): Promise<any> => {
        const pathPrefix = "TIPOS-DE-INFRA";
        const result = await axios.request({
            url: this.baseURL + pathPrefix + this.authPath,
            method: "get"
        });

        const arrayData = result.data.result.fArray;
        const arrayResult = [];

        // analyzeData
        for (let index = 5; index < arrayData.length; index += 5) {
            arrayResult.push( new TipoInfraccion(
                arrayData[ index ].fStr,
                arrayData[ index + 1 ].fStr,
                arrayData[ index + 2 ].fStr,
                arrayData[ index + 3 ].fStr
            ));
        }
        res.json( arrayResult );
    }

    public postGuardarInfraccion = async ( req: Request, res: Response, next: NextFunction ): Promise<any> => {
        const infraccionToSave = new Infraccion( req.body );
        await infraccionToSave.save();
        res.json( infraccionToSave );
    }

    public getInfraccionesXUbicacion = async ( req: Request, res: Response, next: NextFunction ): Promise<any> => {
        const pathPrefix = "INFRA-POR-UBICA";
        const result = await axios.request({
            url: this.baseURL + pathPrefix + this.authPath,
            method: "get"
        });

        const arrayData = result.data.result.fArray;
        const arrayResult = [];

        // analyzeData
        for (let index = 6; index < arrayData.length; index += 6) {
            arrayResult.push( new InfraccionxUbicacion (
                ( arrayData[ index ] ? arrayData[ index ].fStr : "0"),
                ( arrayData[ index ] ? arrayData[ index + 1 ].fStr : ""),
                ( arrayData[ index ] ? arrayData[ index + 2 ].fStr : ""),
                ( arrayData[ index ] ? arrayData[ index + 3 ].fStr : ""),
                ( arrayData[ index ] ? arrayData[ index + 4 ].fStr : ""),
                ( arrayData[ index ] ? arrayData[ index + 5 ].fStr : "0")
            ));
        }
        res.json( arrayResult );
    }

    public getInfracciones = async ( req: Request, res: Response, next: NextFunction ): Promise<any> => {
        const pathPrefix = "INFRA";
        const result = await axios.request({
            url: this.baseURL + pathPrefix + this.authPath,
            method: "get"
        });

        const arrayData = result.data.result.fArray;
        const arrayResult = [];

        // analyzeData
        for (let index = 20; index < arrayData.length; index += 20) {
            const infraccion = new InfraccionClass();
            arrayResult.push( infraccion.setAPIData(
                ( arrayData[ index ] ? arrayData[ index ].fStr : "0"),
                ( arrayData[ index ] ? arrayData[ index + 1 ].fStr : "0"),
                ( arrayData[ index ] ? arrayData[ index + 2 ].fStr : ""),
                ( arrayData[ index ] ? arrayData[ index + 3 ].fStr : ""),
                ( arrayData[ index ] ? arrayData[ index + 4 ].fStr : "0"),
                ( arrayData[ index ] ? arrayData[ index + 5 ].fStr : ""),
                ( arrayData[ index ] ? arrayData[ index + 6 ].fStr : ""),
                ( arrayData[ index ] ? arrayData[ index + 7 ].fStr : ""),
                ( arrayData[ index ] ? arrayData[ index + 8 ].fStr : ""),
                ( arrayData[ index ] ? arrayData[ index + 9 ].fStr : ""),
                ( arrayData[ index ] ? arrayData[ index + 10 ].fStr : ""),
                ( arrayData[ index ] ? arrayData[ index + 11 ].fStr : ""),
                ( arrayData[ index ] ? arrayData[ index + 12 ].fStr : ""),
                ( arrayData[ index ] ? arrayData[ index + 13 ].fStr : ""),
                ( arrayData[ index ] ? arrayData[ index + 14 ].fStr : ""),
                ( arrayData[ index ] ? arrayData[ index + 15 ].fStr : ""),
                ( arrayData[ index ] ? arrayData[ index + 16 ].fStr : ""),
                ( arrayData[ index ] ? arrayData[ index + 17 ].fStr : ""),
                ( arrayData[ index ] ? arrayData[ index + 18 ].fStr : "")
            ));
        }

        // Agregandole Los valores de Mongo
        const infraccionesDB = await Infraccion.find({});
        const infraccionesParsed = infraccionesDB.map( iinfraccionModel => {
            const newInfraccion = new InfraccionClass();
            return newInfraccion.setFromIInfraccionModel( iinfraccionModel );
        });

        res.json( [ ...arrayResult, ...infraccionesParsed  ] );
    }
}