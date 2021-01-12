import nodeXlsx from 'node-xlsx'
import crypto from 'crypto'
const fs = require('fs')

export default class SpreadSheetService {

  static async createXlsxFile(filepath, fileName, data) {
    return new Promise((resolve, reject) => {
      const buffer = nodeXlsx.build([{ name: 'sheet-0', data: data }])
      if (!filepath || !fileName) return resolve(buffer)
      fs.writeFile(require('path').join(__dirname, '.' + filepath, fileName), buffer, (err) => {
        if (err) reject(err)
        console.log('Done...')
        resolve(filepath + fileName)
      })
    })
  }

  static getName(originalName, filepath = '/files/') {
    let float = originalName
    while (SpreadSheetService.isThere(float, filepath)) {
      float = SpreadSheetService.randomString(10) + '.' + float.split('.')[1]
    }
    return float
  }

  static randomString(length = 20) {
    return crypto.randomBytes(length).toString('hex')
  }

  static isThere(fullfile, filepath) {
    return fs.existsSync(require('path').join(__dirname, '.' + filepath, fullfile))
  }
}
