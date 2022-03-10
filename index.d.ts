declare const _exports: filetype;
export = _exports;
declare class filetype {
    /**
     * @param {String} type the type to get could be "name" | "mime"
     * @param {String} name the name to check for extension or mimetype
     * @returns {Promise<any>}
     */
    get(name: string): Promise<any>;
    /**
     * @param {String} srcName the name to search
     * @returns {Promise<any>}
     */
    search(srcName: string): Promise<any>;
}
