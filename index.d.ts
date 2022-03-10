/**
 * @param {String} type the type could be "name" | "url" | "file"
 * @param {String} name the extension name to search
 */
export function get(name: string): Promise<{
  name: string;
  source: string;
  results: any[];
}>;
/**
 * @param {String} mimetype the name of mimetype
 */
export function getByMime(mimetype: string): Promise<{
  name: string;
  source: string;
  results: any[];
}>;
/**
 * @param {String} term the name to search
 * @returns {Promise}
 */
export function searchBy(term: string): Promise<any>;
