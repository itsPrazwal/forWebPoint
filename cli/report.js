import {tableNames} from "./constants.js";
import {selectFromTable} from "./config/database.js";

const selectSumSalesQuery = `
SELECT pe.name, SUM(sa.sale) as totalSales
FROM ${tableNames.PETROLEUM} pe, ${tableNames.SALES} sa
WHERE pe.id=sa.petroleum_product_id
GROUP BY sa.petroleum_product_id
`;

const selectMaxSaleQuery = `
SELECT s.year, s.countryName, MAX(s.totalSale) as maxSale FROM (
    SELECT co.name as countryName, sa.year as year, SUM(sa.sale) as totalSale
    FROM ${tableNames.SALES} sa, ${tableNames.COUNTRY} as co
    WHERE sa.country_id = co.id
    GROUP BY sa.year, sa.country_id
) s
GROUP BY s.year
`;

const selectMinSaleQuery = `
SELECT s.year, s.countryName, MIN(s.totalSale) as minSale FROM (
    SELECT co.name as countryName, sa.year as year, SUM(sa.sale) as totalSale
    FROM ${tableNames.SALES} sa, ${tableNames.COUNTRY} as co
    WHERE sa.country_id = co.id
    GROUP BY sa.year, sa.country_id
) s
GROUP BY s.year
`;

(async () =>{
    const res = await selectFromTable('', selectSumSalesQuery)
    console.log('List the total sale of each petroleum: \n', res)
})();

(async () =>{
    const res = await selectFromTable('', selectMaxSaleQuery)
    console.log('List the max sale country of each year: \n', res)
})();

(async () =>{
    const res = await selectFromTable('', selectMinSaleQuery)
    console.log('List the min sale country of each year (excluding 0): \n', res)
})();