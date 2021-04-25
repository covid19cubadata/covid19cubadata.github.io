/*jshint esversion: 6 */
$.predict = {
  loaded: {},
  load: function (url, callback) {
    if (url in $.predict.loaded)
      return callback(Object.assign({}, $.predict.loaded[url]), false);
    cache = false;
    $.ajax({
      url: url,
      dataType: 'json',
      cache: cache,
      success: function (data) {
        $.predict.loaded[url] = Object.assign({}, data);
        callback(data, true);
      },
    });
  },
  plot: (url, selector) => {
    $.predict.load(url, (data) => {
      plotPredict(data.data, data.days, selector);
    });
  },
};

function plotPredict(plots, days, selector) {
  const types = {};
  const columns = [];
  let less_size = days.length;
  for (const plot of plots) {
    types[plot.name] = plot['c3-plot'];
    const col = [plot.name, ...plot.y];
    columns.push(col);
    if (plot.y.length < less_size) {
      less_size = plot.y.length;
    }
  }
  columns.push(['Fecha', ...days]);

  c3.generate({
    bindto: selector,
    data: {
      x: 'Fecha',
      columns: columns,
      type: 'scatter',
      types: types,
    },
    tooltip: {
      format: {
        value: function (value, r, id, index) {
          return value.toFixed(0); // 0 lugares despues de la coma
        },
      },
    },
    grid: {
      x: {
        lines: [{ value: days[less_size], text: 'Ahora', position: 'start' }],
      },
    },
    axis: {
      x: {
        padding: {
          left: 1,
          right: 1,
        },
        label: 'Fecha',
        type: 'categorical',
        tick: {
          values: [0, less_size, days.length - 1],
        },
        padding: {
          left: 2,
          right: 4,
        },
      },
      y: {
        label: {
          text: '# Infectados',
          position: 'outer-middle',
        },
      },
    },
  });
}
