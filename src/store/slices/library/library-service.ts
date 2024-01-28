import type { ParamsComics, UrlParts, MarvelResponseData, ComicsData, LibraryActionValues } from "./library.types";

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
    const tempParams = Object.fromEntries(Object.entries(params).filter((pair) => pair[1] !== ''));
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

const fetchComicsFromIdList = async (values: LibraryActionValues): Promise<MarvelResponseData> => {
  const {idList, customParams} = values;
  
  const fetchList = idList
    .toSorted((a, b) => a - b)
    .slice(
      customParams?.offset ? customParams.offset : 0,
      customParams?.limit && customParams?.offset ? customParams.offset + customParams.limit : 20
    ).map((id) => fetchComic(id));

  const customComicsData: ComicsData = {
    offset: customParams?.offset || 0,
    limit: customParams?.limit || 20,
    total: idList.length,
    count: fetchList.length,
  };

  const responseArray = await Promise.all(fetchList);
  const response = responseArray.reduce((accumResponse, response) => {
    if (accumResponse.etag) {
      if (accumResponse?.data) {
        accumResponse.data = {...accumResponse.data, ...customComicsData};
      }

      delete(accumResponse.etag)
    };

    if (accumResponse.data?.results && response.data?.results?.[0]) {
      accumResponse.data.results.push(response.data.results[0]);
    }

    return accumResponse;
  });

  return response;
};

export {fetchComic, fetchComics, fetchComicsFromIdList};
