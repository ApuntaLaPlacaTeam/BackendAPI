import axios from "axios";
import { Response, Request, NextFunction } from "express";
export class APIHackathon {
    private baseURL: string = "http://miraflores.cloudapi.junar.com/api/v2/datastreams/";
    private authPath: string = "/data.json/?auth_key=3e0e314caca6068b253fa0e3e716a9d2f4f03d75";

    public getTiposDeInfracciones = async ( req: Request, res: Response, next: NextFunction ): Promise<any> => {
        const pathPrefix = "TIPOS-DE-INFRA";
        let result = axios.request({
            url: this.baseURL + pathPrefix + this.authPath,
            method:"get"
        });
        return res.json(result);
    }
}