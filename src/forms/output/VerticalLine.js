
/** Returns a dashed vertical line at a given
 *     horizontal position with a given label. For
 *     use with anything using the same API as
 *     react-chartjs-2.
 *
 * @class
 */
class VerticalLine {

  constructor () {
    this.xRange = [];
    this.income = 0;
  }

  afterDatasetsDraw = (chart) => {
    const xRange = this.xRange,
          income = this.income;

    const i = xRange.findIndex((val) => {
      return income < val;
    });
    const positionBetweenTwoPoints = (income - xRange[ i - 1 ]) / (xRange[ i ] - xRange[ i - 1 ]);

    const data = chart.getDatasetMeta(0).data;
    const prevX = data[ i - 1 ]._model.x;
    const currX = data[ i ]._model.x;
    const offset = Math.floor(positionBetweenTwoPoints * (currX - prevX) + prevX);

    const ctx = chart.chart.ctx;
    const scale = chart.scales[ 'y-axis-0' ];

    ctx.save();

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(50, 50, 50, 0.5)';
    ctx.lineWidth = 2;
    ctx.setLineDash([
      5,
      5, 
    ]);
    ctx.moveTo(offset, scale.top);
    ctx.lineTo(offset, scale.bottom);
    ctx.stroke();

    ctx.fillStyle = 'rgba(50, 50, 50, 0.5)';
    ctx.textAlign = 'left';
    const lineHeight = ctx.measureText('M').width * 1.2;
    const xMargin = 5;
    const yMargin = 200;
    ctx.fillText('Future', offset + xMargin, yMargin);
    ctx.fillText('Income', offset + xMargin, lineHeight + yMargin);

    ctx.restore();
  };
}


export { VerticalLine };
