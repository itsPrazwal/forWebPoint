type FunctionWithParams<T> = (p: T) => void
type FunctionWithParamsAndReturn<T, R> = (p: T) => R
type GenericArray<T> = T[]

interface ErrorObject {
    error: string
}

export type {
    ErrorObject,
    GenericArray,
    FunctionWithParams,
    FunctionWithParamsAndReturn
}