class EnumHelpers {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getNamesAndValues<T extends number>(e: any) {
    return EnumHelpers.getNames(e).map((n) => ({ name: n, value: e[n] as T }))
  }

  static getNames(e: unknown) {
    return EnumHelpers.getObjValues(e).filter((v) => typeof v === 'string') as string[]
  }

  static getValues<T extends number>(e: unknown) {
    return EnumHelpers.getObjValues(e).filter((v) => typeof v === 'number') as T[]
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static getObjValues(e: any): (number | string)[] {
    return Object.keys(e).map((k) => e[k])
  }
}

export const enumHelpers = EnumHelpers
