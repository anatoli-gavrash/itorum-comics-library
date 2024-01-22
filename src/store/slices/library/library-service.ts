import type { ParamsComics, UrlParts, MarvelResponseData } from "./library.types";

const urlParts: UrlParts = {
  baseUrl: 'https://gateway.marvel.com',
  version: 'v1',
  type: 'public',
  resources: 'comics',
};

const comicsParams: ParamsComics = {
  apikey: import.meta.env.VITE_PUBLIC_KEY,
  limit: 100,
}

const fetchData = async (url: string): Promise<Response> => {
  return await fetch(url);
}

const fetchComics = async (customParams?: ParamsComics): Promise<MarvelResponseData> =>{
  let params = comicsParams;
  if (customParams) params = {...comicsParams, ...customParams};

  const url: string = Object.values(urlParts).join('/');
  const param: string = Object.entries(comicsParams).map((pair) => pair.join('=')).join('&');
  const finalUrl: string = url + '?' + param;

  return (await fetchData(finalUrl)).json();
};

export {fetchComics};
