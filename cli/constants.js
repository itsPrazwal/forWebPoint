const generateQuery = (tableName, additionalAtt) => `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, ${additionalAtt})`;
const generateInsetPlaceholder = (data = 0, subDataLength = 1) => {
    const tempArray1 = [...Array(subDataLength)].map(() => 0)
    const tempArray2 = [...Array(data.length / subDataLength)].map(() => 0)
    if(data.length){
        return tempArray2.map(() => `(${subDataLength > 1 ? tempArray1.map(() => '?').join(',') : '?'})`).join(',')
    }
    return ''
}

const tableNames = {
    PETROLEUM: 'petroleum_product',
    COUNTRY: 'country',
    SALES: 'sales',
}

const createTableQuery = {
    [tableNames.PETROLEUM]: generateQuery(tableNames.PETROLEUM, 'name TEXT'),
    [tableNames.COUNTRY]: generateQuery(tableNames.COUNTRY, 'name Text'),
    [tableNames.SALES]: generateQuery(tableNames.SALES, `petroleum_product_id INTEGER, country_id INTEGER, sale INTEGER, year INTEGER, FOREIGN KEY(petroleum_product_id) REFERENCES petroleum_product(id), FOREIGN KEY(country_id) REFERENCES country(id)`)
}

const insertTableQuery = {
    [tableNames.PETROLEUM]: `INSERT INTO ${tableNames.PETROLEUM}(name) VALUES `,
    [tableNames.COUNTRY]: `INSERT INTO ${tableNames.COUNTRY}(name) VALUES `,
    [tableNames.SALES]: `INSERT INTO ${tableNames.SALES}(petroleum_product_id, country_id, sale, year) VALUES `
}

const selectAllTableQuery = {
    [tableNames.PETROLEUM]: `SELECT * FROM ${tableNames.PETROLEUM}`,
    [tableNames.COUNTRY]: `SELECT * FROM ${tableNames.COUNTRY}`,
    [tableNames.SALES]: `SELECT * FROM ${tableNames.SALES}`
}

export {
    createTableQuery,
    tableNames,
    insertTableQuery,
    selectAllTableQuery,
    generateInsetPlaceholder
}