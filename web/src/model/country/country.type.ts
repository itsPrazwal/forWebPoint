interface FieldTypeCountry {
    name: string
}

interface FieldTypeCountryDB extends FieldTypeCountry{
    id: number
}

export type {
  FieldTypeCountry,
  FieldTypeCountryDB
}
