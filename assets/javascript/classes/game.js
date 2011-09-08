/**
 * Main game class
 * Manages pretty much all game related stuff
 * Including timers etc
 */
var Game = new Class({
	initialize: function(options) {
		// Copy config
		this.sprites = options.sprites;
		this.display = options.display;
		this.raiseCat = false;
		
		// Add events
		document.addEvents({
			keydown: this.enableRaiseCat.bind(this),
			keyup: this.disableRaiseCat.bind(this)
		});
		
		// Initialise intervals
		this.intervals = [];
		
		// Display everything (at 24 fps)
		this.intervals.push(setInterval(this.displayAll.bind(this), 1000 / 24));
		
		// Calculate cat movement (at 16 fps)
		this.intervals.push(setInterval(this.moveCat.bind(this), 1000 / 16));
		
		// Set the cats starting position
		this.sprites.cat.setPosition({
			x: 50,
			y: 100
		});
	},
	moveCat: function() {
		var original = this.sprites.cat.position.y
		
		if(this.raiseCat) {
			// Raise
			this.sprites.cat.setPosition({
				x: 50,
				y: original - 5
			});
		}
		else {
			// Drop
			this.sprites.cat.setPosition({
				x: 50,
				y: original + 5
			});
		}
	},
	displayAll: function() {
		// Draw the background
		this.sprites.background.draw(this.display);
		
		// Draw the cat
		this.sprites.cat.draw(this.display);
	},
	enableRaiseCat: function(e) {
		if(e.code === 85) {
			this.raiseCat = true;
		}
	},
	disableRaiseCat: function(e) {
		if(e.code === 85) {
			this.raiseCat = false;
		}
	},
	stop: function() {
		// Remove events
		document.removeEvents({
			keydown: this.enableRaiseCat,
			keyup: this.disableRaiseCat
		});
		
		// Stop all intervals
		this.intervals.each(function(interval) {
			clearInterval(interval);
		});
	}
});