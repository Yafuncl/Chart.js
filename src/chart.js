/**
 * @namespace Chart
 */
var Chart = require('./core/core.js')();

require('./core/core.helpers')(Chart);
require('./platforms/platform.js')(Chart);
require('./core/core.canvasHelpers')(Chart);
require('./core/core.element')(Chart);
require('./core/core.plugin.js')(Chart);
require('./core/core.animation')(Chart);
require('./core/core.controller')(Chart);
require('./core/core.datasetController')(Chart);
require('./core/core.layoutService')(Chart);
require('./core/core.scaleService')(Chart);
require('./core/core.ticks.js')(Chart);
require('./core/core.scale')(Chart);
require('./core/core.interaction')(Chart);
require('./core/core.tooltip')(Chart);

require('./elements/element.arc')(Chart);
require('./elements/element.line')(Chart);
require('./elements/element.point')(Chart);
require('./elements/element.rectangle')(Chart);
require('./elements/element.candlestick')(Chart);

require('./scales/scale.linearbase.js')(Chart);
require('./scales/scale.category')(Chart);
require('./scales/scale.linear')(Chart);
require('./scales/scale.logarithmic')(Chart);
require('./scales/scale.radialLinear')(Chart);
require('./scales/scale.time')(Chart);
require('./scales/scale.financialLinear')(Chart);

// Controllers must be loaded after elements
// See Chart.core.datasetController.dataElementType
require('./controllers/controller.bar')(Chart);
require('./controllers/controller.bubble')(Chart);
require('./controllers/controller.doughnut')(Chart);
require('./controllers/controller.line')(Chart);
require('./controllers/controller.polarArea')(Chart);
require('./controllers/controller.radar')(Chart);
require('./controllers/controller.financial')(Chart);

require('./charts/Chart.Bar')(Chart);
require('./charts/Chart.Bubble')(Chart);
require('./charts/Chart.Doughnut')(Chart);
require('./charts/Chart.Line')(Chart);
require('./charts/Chart.PolarArea')(Chart);
require('./charts/Chart.Radar')(Chart);
require('./charts/Chart.Scatter')(Chart);
require('./charts/Chart.Financial')(Chart);

// Loading built-it plugins
var plugins = [];

plugins.push(
    require('./plugins/plugin.filler.js')(Chart),
    require('./plugins/plugin.legend.js')(Chart),
    require('./plugins/plugin.title.js')(Chart)
);

Chart.plugins.register(plugins);

module.exports = Chart;
if (typeof window !== 'undefined') {
  window.Chart = Chart;
}