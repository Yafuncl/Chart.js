'use strict';

module.exports = function(Chart) {

	Chart.Financial = function(context, config) {
		config.type = 'financial';

		return new Chart(context, config);
	};

};
