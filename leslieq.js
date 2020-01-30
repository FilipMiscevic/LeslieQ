class LeslieQ {
	
	constructor (source, mode='OFF') {
		this.source  = source;
		this.context = source.context;

		this.osc      = this.context.createOscillator();
		this.oscGain  = this.context.createGain();
		this.osc.type = 'sine';
		this.osc.connect(this.oscGain);
		this.oscGain.connect(this.source.playbackRate); 
		this.SLOW_FREQ = 5;
		this.FAST_FREQ = 9;
		this.FAST_GAIN = 0.019;
		this.SLOW_GAIN = 0.018;
		this.setMode(mode);
	};

	start () {
		this.osc.start();
	}

	stop () {
		this.osc.stop();
	}

	setMode (mode, transition=true) {
		//fast, slow, and off
		var endTime = transition? 3:0;

		if (mode == 'FAST'){
			this.osc.frequency.linearRampToValueAtTime(this.FAST_FREQ, this.context.currentTime + endTime);
			this.oscGain.gain.linearRampToValueAtTime (this.FAST_GAIN, this.context.currentTime + endTime)
		} else if (mode == 'SLOW') {
			this.osc.frequency.linearRampToValueAtTime(this.SLOW_FREQ, this.context.currentTime + endTime);
			this.oscGain.gain.linearRampToValueAtTime (this.SLOW_GAIN, this.context.currentTime + endTime)
		} else {
			this.osc.frequency.linearRampToValueAtTime(0, this.context.currentTime + endTime);
			this.oscGain.gain.linearRampToValueAtTime (0, this.context.currentTime + endTime)
		}

	}


};

var leslie;

window.addEventListener('click', function() {

	leslie = new LeslieQ(source);
	leslie.start();

}, {once:true} );