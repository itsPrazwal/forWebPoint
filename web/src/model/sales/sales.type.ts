interface FieldTypeSale {
    sale: number,
    year: number,
    /*eslint-disable*/
    petroleum_product_id: number,
    country_id: number,
    /* eslint-enable */
}

interface FieldTypeSaleDB extends FieldTypeSale{
    id: number
}

export type {
  FieldTypeSale,
  FieldTypeSaleDB
}
