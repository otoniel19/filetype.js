declare const _exports: utils;
export = _exports;
declare class utils {
    get(url: any): Promise<any>;
    normalize(name: any): any;
    getRate(n: any): "rare" | "uncommon" | "average" | "common" | "very common" | undefined;
}
