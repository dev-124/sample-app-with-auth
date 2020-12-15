// declare all properties on a object must be of the same type
declare type SamePropTypeOnly<T> = {
  [P: string]: T
}

// use IndexApi in a union with another type/interface to
// make that type indexable by string | number
declare interface IndexApi<T = void> {
  [key: string | number]: T
}
