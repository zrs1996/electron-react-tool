type keyType = string | number | symbol
type ObjectType = { [key: keyType]: any }
type DataType = 'object' | 'array' | 'map' | 'set' | 'weakMap'
export type {
  keyType,
  ObjectType,
  DataType
}