// declare a JSON data structure to hold our configuration details
let config = {}
// lets add an element just for SQL connection details
config.sql = {}
// You have to put your own details in the code below
// PORT: this varies depending on WHERE youre database is, local or remote (doc.gold.ac.uk)
config.sql.port = 3307
// if it[s local (MAMP/WAMP) this should be 'localhost'
config.sql.host = "doc.gold.ac.uk"
// your ID for doc.gold.ac.uk OR 'root' for MAMP/WAMP
config.sql.user = "jhu007"
// your DATABASE password OR '' for MAMP/WAMP (i.e. empty, no password, nada, unless you changed it!)
config.sql.password = "Hesoyam0714!"
// the name of the DATABASE
config.sql.database = "jhu007_rrcbase"

// let the rest of the code see this data
module.exports = config;

