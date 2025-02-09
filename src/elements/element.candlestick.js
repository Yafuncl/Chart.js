﻿'use strict';

module.exports = function(Chart) {

	var helpers = Chart.helpers,
		globalOpts = Chart.defaults.global;
		// defaultColor = globalOpts.defaultColor;

	globalOpts.elements.candlestick = {
		upCandleColor: 'rgba(102, 204, 204, 0.7)',
		downCandleColor: 'rgba(102, 204, 204, 0.7)',
		outlineCandleColor: 'rgba(200, 200, 200, 1)',
		outlineCandleWidth: 1.5,
		colorGris: 'rgba(200, 200, 200, 0.7)'
	};

	function isVertical(bar) {
		return bar._view.width !== undefined;
	}

	/**
	 * Helper function to get the bounds of the candle
	 * @private
	 * @param bar {Chart.Element.Candlestick} the bar
	 * @return {Bounds} bounds of the bar
	 */
	function getBarBounds(candle) {
		var vm = candle._view;
		var x1, x2, y1, y2;

		var halfWidth = vm.width / 2;
		x1 = vm.x - halfWidth;
		x2 = vm.x + halfWidth;
		y1 = vm.candle.c;
		y2 = vm.candle.o;


		return {
			left: x1,
			top: y1,
			right: x2,
			bottom: y2
		};
	}

	Chart.elements.Candlestick = Chart.Element.extend({
		draw: function() {
			var ctx = this._chart.ctx;
			var vm = this._view;
			var x = vm.x;
			var o = vm.candle.o;
			var h = vm.candle.h;
			var c = vm.candle.c;
			var barra = vm.candle.barra;

			ctx.strokeStyle = helpers.getValueOrDefault(vm.outlineCandleColor, globalOpts.elements.candlestick.outlineCandleColor);
			ctx.lineWidth = helpers.getValueOrDefault(vm.outlineCandleWidth, globalOpts.elements.candlestick.outlineCandleWidth);
			if (barra === 'gris') {
				ctx.fillStyle = helpers.getValueOrDefault(globalOpts.elements.candlestick.colorGris, globalOpts.elements.candlestick.colorGris);
			} else {
				ctx.fillStyle = helpers.getValueOrDefault(vm.downCandleColor, globalOpts.elements.candlestick.downCandleColor);
			}

			ctx.beginPath();
			ctx.moveTo(x + 220, h);
			ctx.lineTo(x - 20, h);
			ctx.stroke();
			ctx.fillRect(x - vm.width / 2, c, vm.width, o - c);
			ctx.strokeRect(x - vm.width / 2, c, vm.width, o - c);
			ctx.closePath();
		},
		height: function() {
			var vm = this._view;
			return vm.base - vm.y;
		},
		inRange: function(mouseX, mouseY) {
			var inRange = false;

			if (this._view) {
				var bounds = getBarBounds(this);
				inRange = mouseX >= bounds.left && mouseX <= bounds.right && mouseY >= bounds.top && mouseY <= bounds.bottom;
			}

			return inRange;
		},
		inLabelRange: function(mouseX, mouseY) {
			var me = this;
			if (!me._view) {
				return false;
			}

			var inRange = false;
			var bounds = getBarBounds(me);

			if (isVertical(me)) {
				inRange = mouseX >= bounds.left && mouseX <= bounds.right;
			} else {
				inRange = mouseY >= bounds.top && mouseY <= bounds.bottom;
			}

			return inRange;
		},
		inXRange: function(mouseX) {
			var bounds = getBarBounds(this);
			return mouseX >= bounds.left && mouseX <= bounds.right;
		},
		inYRange: function(mouseY) {
			var bounds = getBarBounds(this);
			return mouseY >= bounds.top && mouseY <= bounds.bottom;
		},
		getCenterPoint: function() {
			var vm = this._view;
			var x, y;

			var halfWidth = vm.width / 2;
			x = vm.x - halfWidth;
			y = (vm.candle.c + vm.candle.o) / 2;

			return {x: x, y: y};
		},
		getArea: function() {
			var vm = this._view;
			return vm.width * Math.abs(vm.y - vm.base);
		},
		tooltipPosition: function() {
			var vm = this._view;
			return {
				x: vm.x,
				y: (vm.candle.c + vm.candle.o) / 2
			};
		}
	});

};

