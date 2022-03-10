/**
 * @param {String} type the type could be "name" | "url" | "file"
 * @param {String} name the extension name to search
 */
export function get(name: string): Promise<{
  name: string;
  source: string;
  results: any[];
}>;
