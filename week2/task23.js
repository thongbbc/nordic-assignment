
const fs = require('fs')
const formatDistance = require("date-fns/formatDistanceStrict");
const VN_LOCAL = require("date-fns/locale/vi");
const xlsx = require('xlsx')
const FORMAT = require('date-fns/format');

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function calculateDistanceDate(date) {
  return formatDistance(date, new Date(), {locale: VN_LOCAL});
}

function buildWorkSheet(data) {
  return xlsx.utils.json_to_sheet(data);
}

function buildWorkBook(wb, wbName, ws, wsName) {
  xlsx.utils.book_append_sheet(wb, ws, wsName);
  xlsx.writeFile(wb, wbName);
  console.log(`Save file [${wbName}] - successfully`)
}

function readFileAndConvert() {
  try {
    const response = fs.readFileSync('products.json')
    const result = JSON.parse(response)
    result.forEach(item => {
      const price = numberWithCommas(item.price)
      const time = calculateDistanceDate(new Date(item.dateUpdated))
      const updated = FORMAT(new Date(item.dateUpdated), 'MM/dd/yyyy'); 
      item.updated = updated
      delete item.dateUpdated;
      console.log(`${item.name} - ${price}VND - Cập nhật cách đây: ${time}`)
    })
    const WB = xlsx.utils.book_new();
    buildWorkBook(WB, 'products.xlsx', buildWorkSheet(result), 'Page 1');
    return response
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = {
  readFileAndConvert
}