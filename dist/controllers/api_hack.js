"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Infraccion_1 = __importDefault(require("../models/Infraccion"));
class InfraccionClass {
    setAPIData(nro, anio, mes, fecha, nroActaControl, codigoInfraccion, tenorInfraccion, situacionActa, actasAnuladas, apellidosConductor, nombresConductor, nroLicenciaConductor, placaDeRodaje, tipoDeVia, lugarDeIntervencion, cuadra, codRuta, empresaTransporte, inspector) {
        this.nro = parseInt(nro);
        this.anio = parseInt(anio);
        this.mes = mes;
        this.fecha = fecha;
        this.nroActaControl = parseInt(nroActaControl);
        this.codigoInfraccion = codigoInfraccion;
        this.tenorInfraccion = tenorInfraccion;
        this.situacionActa = situacionActa;
        this.actasAnuladas = parseInt(actasAnuladas);
        this.apellidosConductor = (apellidosConductor == "0" ? "" : apellidosConductor);
        this.nombresConductor = (nombresConductor == "0" ? "" : nombresConductor);
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
    setFromIInfraccionModel(iinfraccionModel) {
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
        this._id = iinfraccionModel._id;
        return this;
    }
    setSaveData(linkFoto, placaDeRodaje, dniDenunciante, ubicacion, descripcion) {
        this.linkFoto = linkFoto;
        this.placaDeRodaje = placaDeRodaje;
        this.dniDenunciante = dniDenunciante;
        this.ubicacion = ubicacion;
        this.descripcion = descripcion;
    }
}
exports.InfraccionClass = InfraccionClass;
class TipoInfraccion {
    constructor(codigo, nro, tipoDeInfraccion, cantidadDeInfracciones) {
        this.codigo = codigo;
        this.nro = parseInt(nro);
        this.tipoDeInfraccion = tipoDeInfraccion;
        this.cantidadDeInfracciones = parseInt(cantidadDeInfracciones);
    }
}
exports.TipoInfraccion = TipoInfraccion;
class InfraccionxUbicacion {
    constructor(anio, codigo, ubicacion, codigoMes, mes, cantidad) {
        this.anio = parseInt(anio);
        this.codigo = codigo;
        this.ubicacion = ubicacion;
        this.codigoMes = codigoMes;
        this.mes = mes;
        this.cantidad = parseInt(cantidad);
    }
}
exports.InfraccionxUbicacion = InfraccionxUbicacion;
class APIHackathon {
    constructor() {
        this.baseURL = "http://miraflores.cloudapi.junar.com/api/v2/datastreams/";
        this.authPath = "/data.json/?auth_key=3e0e314caca6068b253fa0e3e716a9d2f4f03d75";
        this.getTiposDeInfracciones = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const pathPrefix = "TIPOS-DE-INFRA";
            const result = yield axios_1.default.request({
                url: this.baseURL + pathPrefix + this.authPath,
                method: "get"
            });
            const arrayData = result.data.result.fArray;
            const arrayResult = [];
            // analyzeData
            for (let index = 5; index < arrayData.length; index += 5) {
                arrayResult.push(new TipoInfraccion(arrayData[index].fStr, arrayData[index + 1].fStr, arrayData[index + 2].fStr, arrayData[index + 3].fStr));
            }
            res.json(arrayResult);
        });
        this.postGuardarInfraccion = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const infraccionToSave = new Infraccion_1.default(req.body);
            yield infraccionToSave.save();
            res.json(infraccionToSave);
        });
        this.getInfraccionesXUbicacion = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const pathPrefix = "INFRA-POR-UBICA";
            const result = yield axios_1.default.request({
                url: this.baseURL + pathPrefix + this.authPath,
                method: "get"
            });
            const arrayData = result.data.result.fArray;
            const arrayResult = [];
            // analyzeData
            for (let index = 6; index < arrayData.length; index += 6) {
                arrayResult.push(new InfraccionxUbicacion((arrayData[index] ? arrayData[index].fStr : "0"), (arrayData[index] ? arrayData[index + 1].fStr : ""), (arrayData[index] ? arrayData[index + 2].fStr : ""), (arrayData[index] ? arrayData[index + 3].fStr : ""), (arrayData[index] ? arrayData[index + 4].fStr : ""), (arrayData[index] ? arrayData[index + 5].fStr : "0")));
            }
            res.json(arrayResult);
        });
        this.getInfracciones = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const queryObject = { dniDenunciante: req.query.dniDenunciante };
            const arrayResult = [];
            let infraccionesDB = [];
            if (!queryObject.dniDenunciante) {
                const pathPrefix = "INFRA";
                const result = yield axios_1.default.request({
                    url: this.baseURL + pathPrefix + this.authPath,
                    method: "get"
                });
                const arrayData = result.data.result.fArray;
                // analyzeData
                for (let index = 20; index < arrayData.length; index += 20) {
                    const infraccion = new InfraccionClass();
                    arrayResult.push(infraccion.setAPIData((arrayData[index] ? arrayData[index].fStr : "0"), (arrayData[index] ? arrayData[index + 1].fStr : "0"), (arrayData[index] ? arrayData[index + 2].fStr : ""), (arrayData[index] ? arrayData[index + 3].fStr : ""), (arrayData[index] ? arrayData[index + 4].fStr : "0"), (arrayData[index] ? arrayData[index + 5].fStr : ""), (arrayData[index] ? arrayData[index + 6].fStr : ""), (arrayData[index] ? arrayData[index + 7].fStr : ""), (arrayData[index] ? arrayData[index + 8].fStr : ""), (arrayData[index] ? arrayData[index + 9].fStr : ""), (arrayData[index] ? arrayData[index + 10].fStr : ""), (arrayData[index] ? arrayData[index + 11].fStr : ""), (arrayData[index] ? arrayData[index + 12].fStr : ""), (arrayData[index] ? arrayData[index + 13].fStr : ""), (arrayData[index] ? arrayData[index + 14].fStr : ""), (arrayData[index] ? arrayData[index + 15].fStr : ""), (arrayData[index] ? arrayData[index + 16].fStr : ""), (arrayData[index] ? arrayData[index + 17].fStr : ""), (arrayData[index] ? arrayData[index + 18].fStr : "")));
                }
                infraccionesDB = yield Infraccion_1.default.find({});
            }
            else {
                infraccionesDB = yield Infraccion_1.default.find(queryObject);
            }
            // Agregandole Los valores de Mongo
            const infraccionesParsed = infraccionesDB.map(iinfraccionModel => {
                const newInfraccion = new InfraccionClass();
                return newInfraccion.setFromIInfraccionModel(iinfraccionModel);
            });
            res.json([...arrayResult, ...infraccionesParsed]);
        });
        this.getMisInfracciones = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // Agregandole Los valores de Mongo
            const infraccionesDB = yield Infraccion_1.default.find();
            const infraccionesParsed = infraccionesDB.map(iinfraccionModel => {
                const newInfraccion = new InfraccionClass();
                return newInfraccion.setFromIInfraccionModel(iinfraccionModel);
            });
            res.json(infraccionesParsed);
        });
    }
}
exports.APIHackathon = APIHackathon;
//# sourceMappingURL=api_hack.js.map