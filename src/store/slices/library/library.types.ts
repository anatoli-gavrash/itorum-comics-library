export interface Library {
  response: MarvelResponseData | null
  status: 'empty' | 'loading' | 'done' | 'error'
}

export interface UrlParts {
  baseUrl: string
  version: 'v1'
  type: 'public'
  resources: 'comics'
  id?: number
}

export interface LibraryActionValues {
  idList: number[],
  customParams: ParamsComics
}

export interface Params {
  apikey?: string
}

export interface ParamsComics extends Params {
  format?: string
  formatType?: string
  noVariants?: boolean
  dateDescriptor?: string
  dateRange?: number
  title?: string
  titleStartsWith?: string
  startYear?: number
  issueNumber?: number
  diamondCode?: string
  digitalId?: number
  upc?: string
  isbn?: string
  ean?: string
  issn?: string
  hasDigitalIssue?: boolean
  modifiedSince?: string
  creators?: number
  characters?: number
  series?: number
  events?: number
  stories?: number
  sharedAppearances?: number
  collaborators?: number
  orderBy?: string
  limit?: number
  offset?: number
}

export interface MarvelResponseData {
  code?: number
  status?: string
  copyright?: string
  attributionText?: string
  attributionHTML?: string
  data?: ComicsData
  etag?: string
}

export interface ComicsData {
  offset?: number
  limit?: number
  total?: number
  count?: number
  results?: Comic[]
}

export interface Comic {
  id?: number
  digitalId?: number
  title?: string
  issueNumber?: number
  variantDescription?: string
  description?: string
  modified?: string
  isbn?: string
  upc?: string
  diamondCode?: string
  ean?: string
  issn?: string
  format?: string
  pageCount?: number
  textObjects: [
    {
      type?: string
      language?: string
      text?: string
    }
  ]
  resourceURI?: string
  urls?: [
    {
      type?: string
      url?: string
    }
  ]
  series?: ComicResource
  variants?: ComicResource[]
  collections?: ComicResource[]
  collectedIssues?: ComicResource[]
  dates?: [
    {
      type: string
      date: string
    }
  ]
  prices?: [
    {
      type?: string
      price?: number
    }
  ]
  thumbnail?: ComicImage
  images?: ComicImage[]
  creators?: ComicListPerson
  characters?: ComicListPerson
  stories?: ComicListStory
  events?: ComicList
}

export interface ComicResource {
  resourceURI?: string
  name?: string
}

export interface ComicResourcePerson extends ComicResource {
  role?: string
}

export interface ComicResourceStory extends ComicResource {
  type?: string
}

export interface ComicImage {
  path?: string
  extension?: string
}

export interface ComicList {
  available?: number
  returned?: number
  collectionURI?: string
  items?: ComicResource[]
}

export interface ComicListPerson extends ComicList {
  items?: ComicResourcePerson[]
}

export interface ComicListStory extends ComicList {
  items?: ComicResourceStory[]
}
