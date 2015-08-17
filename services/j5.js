/**
 * Created by Jairo Martinez on 8/15/15.
 */

var five = require("johnny-five");

var board = {};
var lcd = {};
var rly1 = {};
var rly2 = {};

var btnBack = {};
var btnMenu = {};
var btnHome = {};
var btnEntr = {};
var btnNvUp = {};
var btnNvDn = {};
var btnNvLt = {};
var btnNvRt = {};

function _btnsSetup() {
	btnEntr = new five.Button({
		pin:      2,
		isPullup: true
	});

	btnHome = new five.Button({
		pin:      3,
		isPullup: true
	});

	btnBack = new five.Button({
		pin:      8,
		isPullup: true
	});

	btnMenu = new five.Button({
		pin:      9,
		isPullup: true
	});

	btnNvRt = new five.Button({
		pin:      5, //
		isPullup: true
	});

	btnNvDn = new five.Button({
		pin:      4, //
		isPullup: true
	});

	btnNvUp = new five.Button({
		pin:      7, //
		isPullup: true
	});

	btnNvLt = new five.Button({
		pin:      6,
		isPullup: true
	});
}

function _btns() {
	_btnsSetup();

	btnMenu.on("down", function () {
		console.log("Btn Menu");
		lcd.print("Menu");
	});

	btnHome.on("down", function () {
		console.log("Btn Home");
	});

	btnEntr.on("down", function () {
		console.log("Btn Enter");
	});

	btnBack.on("down", function () {
		console.log("Btn Back");
	});

	btnNvUp.on("down", function () {
		console.log("Btn Up");
	});

	btnNvDn.on("down", function () {
		console.log("Btn Down");
	});

	btnNvLt.on("down", function () {
		console.log("Btn Left");
	});

	btnNvRt.on("down", function () {
		console.log("Btn Right");
	});
}

function _lcd() {
	lcd = new five.LCD({
		controller: "PCF8574",
		address:    0x20,
		rows:       4,
		cols:       20
	});

	lcd.clear();
	lcd.home();

	this.repl.inject({
		lcd: lcd
	});
}

/**
 * Setup Relays
 * @private
 */
function _relays() {
	rly1 = new five.Relay(10);
	rly2 = new five.Relay(11);

	setTimeout(function () {
		rly1.on();
		rly2.on();
	}, 1000);
}

/**
 * Initialize
 * @private
 */
function _init() {
	_btns();
	_lcd();
	_relays();
}

///////////////////////////////////////////////////
//

var j5 = function (){

};

/**
 * Initialize Module
 * @param opts
 * @param cb
 */
j5.prototype.init = function (opts, cb) {
	cb = (typeof cb === 'function') ? cb : function () {};

	opts = opts || { port: "/dev/ttyAMA0" };
	board = new five.Board(opts);

	try {
		board.on("ready", function () {
			_init();
			cb(null);
		});
	}
	catch(ex){
		cb(ex,null);
	}
};

/**
 * Send Message To The LCD
 * @param msg
 * @param row
 * @param col
 */
j5.prototype.message = function(msg,row,col){
	row = row || 0;
	col = col || 0;

	lcd.cursor(row, col).print(msg);
};

module.exports = new j5();