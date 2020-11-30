const mysql = require('mysql');
const { promisify } = require('util');

module.exports = class MysqlReceiver
{
    constructor(
        {host, user, password, database, port},
        table, sortfield
    )
    {
        this.options = {host, user, password, database, port};
        this.table = table;
        this.sortfield = sortfield;
        this.last = null;

        this.buffers = [];
    }

    bufferInto(buffer)
    {
        this.buffers.push(buffer);
    }

    async listen()
    {
        let connection = mysql.createConnection(this.options);
        connection.connect();
        let promiseQuery = promisify(connection.query).bind(connection);
        let result = await promiseQuery(`SELECT MAX(${this.sortfield}) AS lastSortField FROM ${this.table}`);
        let last = result[0].lastSortField;

        setTimeout(() => { this.fetchNext(last, promiseQuery); }, 1000);    
    }

    async fetchNext(last, promiseQuery)
    {
        let result = await promiseQuery(`
            SELECT *
            FROM ${this.table}
            WHERE ${this.sortfield} > ${last}
            ORDER BY ${this.sortfield} ASC
        `);
        if (result.length > 0) {
            last = result[result.length -1][this.sortfield];
        }

        console.log(result.length);
        console.log(result.length, `last: ${last}`);

        setTimeout(() => { this.fetchNext(last, promiseQuery); }, 1000);  
    }
}