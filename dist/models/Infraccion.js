"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ubicacionSchema = new mongoose_1.Schema({
    lat: Number,
    long: Number
});
const infraccionSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
const Infraccion = mongoose_1.model("Infraccion", infraccionSchema);
exports.default = Infraccion;
//# sourceMappingURL=Infraccion.js.map