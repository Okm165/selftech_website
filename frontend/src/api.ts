import axios from "axios";

const baseUrl: string = "/resourcesapi/";
export const resources: string = "/resources/";
export const quality: string = "_quality/";
export const thumbnail: string = "_thumbnail/";
export const tiles: string = "_tiles/";

export async function listDirQuality(url:string): Promise<Array<string>> {
    return (await axios.get<Array<string>>(baseUrl+quality+url)).data.map((str) => url + "/" + str);
}

export async function listDirThumbnail(url:string): Promise<Array<string>> {
    return (await axios.get<Array<string>>(baseUrl+thumbnail+url)).data.map((str) => url + "/" + str);
}

export async function listDirTiles(url:string): Promise<Array<string>> {
    return (await axios.get<Array<string>>(baseUrl+tiles+url)).data.map((str) => url + "/" + str);
}