interface FieldTypeProduct {
    name: string
}

interface FieldTypeProductDB extends FieldTypeProduct{
    id: number
}

export type {
    FieldTypeProduct,
    FieldTypeProductDB
}