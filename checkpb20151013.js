var regex = /<pb id="(\d+\.\d+[a-z])"\/>/;
var suspectregex = /pb.?id/;

var fs = require('fs');
var glob = require('glob');
var lastvol = '';
var lastid = '';
var nextpage1 = '';
var nextpage2 = '';

var check_pbtag_format = function(fn, str, i) {
	if (str.match(suspectregex) && !str.match(regex)) {
		console.log('error', str, fn, 'line', i + 1, "wrong pb tag format");
	};
}

var check_first_pb = function(fn, pb) { // first pb id of 'first file' in a volumn don't start from '0a' or '1a'; 
	if ((pb.substring(pb.length - 2) !== '0a') && (pb.substring(pb.length - 2) !== '1a')) {
		console.log('error', pb, fn, 'pb id not start from "0a" or "1a"'); 
	}
}

var nextpage = function(pb) {
	var volpb = pb.split('.'), pg = '', pg2 = '', vol = '';
	if (volpb.length > 1) {
		vol = volpb[0] + '.';
		pg = volpb[1];
	} else {
		pg = volpb[0];
	}

	if (pg.substring(pg.length - 1) === 'a') {          // if pg = 1a;
		pg = pg.substring(0, pg.length - 1) + 'b';      // next pg = 1b;
	} else if (pg.substring(pg.length - 1) === 'b') {   // if pg = 1b;
		pg2 = pg.substring(0, pg.length - 1) + 'c';     // next pg = 1c;
		pg = parseInt(pg.substring(0, pg.length - 1)) + 1 + 'a'; // or next pg = 2a;
	} else if (pg.substring(pg.length - 1) === 'c') {   // if pg = 1c;
		pg = pg.substring(0, pg.length - 1) + 'd';      // next pg = 1d;
	} else if (pg.substring(pg.length - 1) === 'd') {   // if pg = 1d;
		pg = parseInt(pg.substring(0, pg.length - 1)) + 1 + 'a'; // next pg = 2a; 
	}
	nextpage1 = vol + pg;
	nextpage2 = vol + pg2;
}

processfile = function(fn) {
	var vol = fn.split('/')[2];
	var arr = fs.readFileSync(fn.trim(),'utf8').replace(/\r\n/g, '\n').split('\n');

	if (lastvol !== vol) { //only first file in a volumn enters this route;
		lastvol = vol;
		lastid = '';
		for (var i = 0; i < arr.length; i++) {
			check_pbtag_format(fn, arr[i], i);
			arr[i].replace(regex, function(m, m1) {
				if (!lastid) {
					check_first_pb(fn, m1);
					lastid = m1; return;
				}
				nextpage(lastid);
				if (m1 !== nextpage1 && m1 !== nextpage2) {
					console.log('error', '(' + lastid + ')', m1, fn, 'line', i + 1);
				}	
				lastid = m1;				
			});
		}	
	} else if (lastvol === vol) { //if not first file in a volumn, then enters this route;
		for (var i = 0; i < arr.length; i++) {
			check_pbtag_format(fn, arr[i], i);
			arr[i].replace(regex, function(m, m1) {
				nextpage(lastid);
				if (m1 !== nextpage1 && m1 !== nextpage2) {
					console.log('error', '(' + lastid + ')', m1, fn, 'line', i + 1); 
				}
			lastid = m1;
			});
		}			
	}
}

glob('../jiangkangyur/[0-9][0-9][0-9]/{.*,*}.xml', {nosort: true}, function(err, files) {
	files.map(processfile);
});