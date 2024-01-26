import type { ParamsComics, UrlParts, MarvelResponseData } from "./library.types";

const urlParts: UrlParts = {
  baseUrl: 'https://gateway.marvel.com',
  version: 'v1',
  type: 'public',
  resources: 'comics',
};

const comicsParams: ParamsComics = {
  apikey: import.meta.env.VITE_PUBLIC_KEY
}

const createUrl = (pathParts: UrlParts, params?: ParamsComics): string => {
  const url: string = Object.values(pathParts).join('/');
  let finalParams = '';

  if (params) {
    const tempParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== ''));
    finalParams = '?' + Object.entries(tempParams).map((pair) => pair.join('=')).join('&');
  }

  return url + finalParams;
};

const fetchData = async (url: string): Promise<Response> => {
  return await fetch(url);
}

const fetchComic = async (id: number, customParams?: ParamsComics): Promise<MarvelResponseData> => {
  const finalUrlParts: UrlParts = {...urlParts, id}
  let params = comicsParams;

  if (params) params = {...comicsParams, ...customParams};

  return (await fetchData(createUrl(finalUrlParts, params))).json();
};

const fetchComics = async (customParams?: ParamsComics): Promise<MarvelResponseData> =>{
  let params = comicsParams;

  if (customParams) params = {...comicsParams, ...customParams};

  return (await fetchData(createUrl(urlParts, params))).json();
};

const getLocalData = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || '');
};

const setLocalData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export {fetchComic, fetchComics};
