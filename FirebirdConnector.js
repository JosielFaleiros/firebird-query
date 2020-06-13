import Firebird from 'node-firebird'

export default class FirebirdConnector {
  /**
     * node-firebird
     */
  constructor() {
    console.log('FirebirdConnector constructor() ')
  }

  async getConnection() {
    if (process.env.ERP_CON_ENABLED==='false') return undefined
    return this.connect()
  }

  connect() {
    var options = {}
    options.host = process.env.ERP_HOST
    options.port = process.env.ERP_PORT
    options.database = process.env.ERP_DATABASE
    options.user = process.env.ERP_USERNAME
    options.password = process.env.ERP_PASSWORD
    options.lowercase_keys = false // set to true to lowercase keys
    options.role = null            // default
    options.pageSize = 4096        // default when creating database
    return new Promise((resolve, reject) => {
      Firebird.attach(options, (err, db) => {
        if (err)
          reject(err)
        else resolve(db)
      })
    })
  }
}
