/**
 * @param {String} extension the extension name to search
 */
export function get(extension: string): Promise<{
  name: string;
  source: string;
  results: any[];
}>;
