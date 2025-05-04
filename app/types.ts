export interface Params<Keys extends string = string> {
  params: Promise<Record<Keys, string>>;
}

export interface SearchParams<Keys extends string = string> {
  searchParams: Promise<Record<Keys, string | undefined>>;
}
