/**
 * en_US locale
 * @constructor
 */
T2W.LV_LV = function(){};

/**
 * Translator dictionary
 * @constant
 * @type {Object}
 */
T2W.LV_LV.DICTIONARY = {
  zero: "nullle",
  ones: ["", "viens", "divi", "trīs", "četri", "pieci", "seši", "septiņi", "astoņi", "deviņi"],
  teens: ["desmit", "vienpadsmit", "divpadsmit", "trīspadsmit", "četrpadsmit", " piecpadsmit", "sešpadsmit", "septiņpadsmit", "astoņpadsmit", "deviņpadsmit"],
  tens: ["", "", "divdesmit", "trīsdesmit", "četrdesmit", "piecdesmit", "sešdesmit", "septiņdesmit", "astoņdesmit", "deviņdesmit"],
  hundred: "simts",
  radix: ["", "tūkstotis", "miljons"],
  delimiters: ["-", "un"]
};


/**
 * Token length
 * @constant
 * @type {number}
 */
T2W.LV_LV.TOKEN_LENGTH = 3;

/**
 * Max numbers for this locale
 * @constant
 * @type {number}
 */
T2W.LV_LV.MAX_NUMBERS = 9;

/**
 * Translate numbers to words
 * @public
 * @param {array} numbers
 * @param {number} index
 * @return {string}
 */
T2W.LV_LV.prototype.translate = function( numbers ) {
	
	// Check max value	
	if(numbers.length * T2W.LV_LV.TOKEN_LENGTH > T2W.LV_LV.MAX_NUMBERS){
		throw {
			name : "Error",
			message : "The length of numbers is longer than the maximum value(" + T2W.LV_LV.MAX_NUMBERS + ")."
		};	
	}		
	
	// Deal with zero value	
	if(numbers[T2W.SINGLE_INDEX] === 0 && numbers.length === 1){
		return T2W.LV_LV.DICTIONARY.zero;
	}
	
	var words = [];
	for(var idx = 0, max = numbers.length; idx < max; idx++){				
		words.unshift( this._getTrio( this.tokenize( numbers[idx], 1 ), idx, max));	
	}
	
	return words.join("");								
};

/**
 * Converts first three numbers to words.
 * @private
 * It solves exceptions in the English language.
 * @param {Array} numbers
 * @param {number} index
 * @param {number} max - length of tokens
 * @return {string}
 */
T2W.LV_LV.prototype._getTrio = function( numbers, index, max){
	var hundred = '';
	var ten = '';
	var single = '';
	var radix = this._getRadix(numbers, index);
	
	if(numbers[T2W.HUNDRED_INDEX]){
		hundred = numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX] 
			? this._getOnes( numbers[ T2W.HUNDRED_INDEX ] ) + " " + T2W.LV_LV.DICTIONARY.hundred + ' ' + T2W.LV_LV.DICTIONARY.delimiters[1] + ' '
			: this._getOnes( numbers[ T2W.HUNDRED_INDEX ] ) + " " + T2W.LV_LV.DICTIONARY.hundred;
	}
	
	if( numbers[ T2W.TEN_INDEX ] ){			
		ten = this._getTeens( numbers[T2W.SINGLE_INDEX]);			
	}
						
	if( numbers[ T2W.TEN_INDEX ] >=2 ){
		ten = numbers[T2W.SINGLE_INDEX] 
			? this._getTens( numbers[T2W.TEN_INDEX]) + T2W.LV_LV.DICTIONARY.delimiters[0] + this._getOnes( numbers[T2W.SINGLE_INDEX])
			: this._getTens( numbers[T2W.TEN_INDEX]); 	
	}
							
	if( !numbers[ T2W.TEN_INDEX ] ){
		single = this._getOnes( numbers[T2W.SINGLE_INDEX]);
	}
				
	if(index+1 < max && (numbers[T2W.HUNDRED_INDEX] || numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX]) ){
		hundred = ' ' + hundred;
	}
	
	if( index === 0 && index+1 < max && !numbers[ T2W.HUNDRED_INDEX ] && (numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX] )){
		hundred	 = ' ' + T2W.LV_LV.DICTIONARY.delimiters[1] + ' ';
	}
								
	return hundred + ten + single + radix;		
};

/**
 * Get ones
 * helper method to access the dictionary
 * @private
 * @param {number} number
 * @param {number} index
 * @return {string}
 */
T2W.LV_LV.prototype._getOnes = function( number) {
	return T2W.LV_LV.DICTIONARY.ones[ number ];
};

/**
 * Get tens
 * helper method to access the dictionary
 * @private
 * @param {number} number
 * @return {string}
 */
T2W.LV_LV.prototype._getTens = function( number ) {
	return T2W.LV_LV.DICTIONARY.tens[ number ];
};

/**
 * Get teens
 * helper method to access the dictionary
 * @private
 * @param {number} number
 * @return {string}
 */
T2W.LV_LV.prototype._getTeens = function(number ){
	return T2W.LV_LV.DICTIONARY.teens[ number ];
};

/**
 * Get radix
 * convert radix to words
 * @private
 * @param {Array} numbers
 * @param {number} index
 * @return {string}
 */
T2W.LV_LV.prototype._getRadix = function( numbers, index ) {
	var radix = '';
	if( index > 0 && (numbers[T2W.HUNDRED_INDEX] || numbers[T2W.TEN_INDEX] || numbers[T2W.SINGLE_INDEX])){	
		radix = ' ' + T2W.LV_LV.DICTIONARY.radix[ index ];
	}
			
	return radix;
};
