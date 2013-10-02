// npm install wget
// npm install csv
// works with http://www.iso.org/iso/home/standards/country_codes/country_names_and_code_elements_txt.htm

var fs = require('fs');
var csv = require('csv');
var wget = require('wget');
var result = [];
var opts = { delimiter: ';', escape: '"' };

var retrieveFile = function(src) {
    var download = wget.download(src, 'countries.htm');
    download.on('error', function (err) {
        console.log(err);
    });
    download.on('end', function (output) {
        console.log('done downloading ' + src);
        constructArray('countries.htm');
    });
    download.on('progress', function (progress) {
        console.log(progress);
    });
}

var constructArray = function(csvfile) {
    csv()
        .from.path(csvfile, opts)
        .on('record', function (row, index) {
            var entry = {};
            entry['label'] = row[0];
	        entry['value'] = row[1];
            result.push(entry);
        })
        .on('end', function() {
            console.log('the result is \n\n\n' + result.toString());
            console.log(JSON.stringify(result, null, 4));
        });
}

// main entry function
retrieveFile('http://www.iso.org/iso/home/standards/country_codes/country_names_and_code_elements_txt.htm');

