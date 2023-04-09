type keyType = string | number | symbol
type ObjectType = { [key: keyType]: any }
type DataType = 'object' | 'array' | 'map' | 'set' | 'weakMap'
type FrontAppType = {
  appName?: string,
  id?: string,
  projectPath?: string,
}

export type {
  keyType,
  ObjectType,
  DataType,
  FrontAppType
}