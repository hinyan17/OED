/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const Meter = require('../../models/Meter');
const Database = require('../../models/database');
const DB = require('../../db');
const { expectArrayOfUnitsToBeEquivalent } = require('../../util/compareUnits');
const { mocha, expect } = require('../common');

mocha.describe('Enums JS to DB', () => {
	mocha.it('can equate Meter.type to SQL enum', async () => {
        const conn = DB.getConnection();
        let serverEnum = [];
        let jsObject = [];
        conn.result(Database.sqlFile('meter/get_meter_enum.sql')).then(data => {
            let resultArray = data.rows;
            resultArray.forEach((item) =>{
                serverEnum.push(item.unnest);
            });
            for(let key in Meter.type) {
                if (Meter.type.hasOwnProperty(key)) {
                    let value = Meter.type[key];
                    jsObject.push(value);
                }
            }
            serverEnum.sort();
            jsObject.sort();
            expect(serverEnum.toString()).to.equal(jsObject.toString());
            expect(serverEnum.length).to.equal(jsObject.length);
        })
    })
})
