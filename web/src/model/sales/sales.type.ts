interface FieldTypeSale {
    sale: number,
    year: number,
    petroleum_product_id: number,
    country_id: number,
}

interface FieldTypeSaleDB extends FieldTypeSale{
    id: number
}

export type {
    FieldTypeSale,
    FieldTypeSaleDB
}