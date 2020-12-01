const oracledb = require('oracledb');
const conStr = require('../config/conStr')

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function getPasswd(username) {
  let connection;

  try {
    connection = await oracledb.getConnection( 
        conStr);
    let sqlQuery = `select password from RPT_USERS where username='${username}'`
    console.log(sqlQuery)
    const result = await connection.execute(sqlQuery);

    let passwd = result.rows[0].PASSWORD
    console.log("rows",passwd);
    return passwd
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

// run('dongwj');
module.exports = getPasswd