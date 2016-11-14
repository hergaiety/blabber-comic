function fillTextWrapped(ctx, text, x, y, maxWidth, lineHeight, borderWidth) {
  // Borrowed with love from http://stackoverflow.com/questions/2936112/text-wrap-in-a-canvas-element
  let words = text.split(' ');
  let line = '';
  let bubblePadding = 10;
  let bubbleBorder = 1;

  maxWidth -= bubblePadding * 2;

  // White BG
  ctx.fillStyle = 'white';
  ctx.fillRect(
    x,
    y,
    maxWidth + (bubblePadding * 2),
    lineHeight
  );
  // Top border
  ctx.fillStyle = 'black';
  ctx.fillRect(
    x,
    y,
    maxWidth + (bubblePadding * 2),
    bubbleBorder
  );

  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      // White BG
      ctx.fillStyle = 'white';
      ctx.fillRect(
        x,
        y + bubblePadding,
        maxWidth + (bubblePadding * 2),
        lineHeight + bubblePadding
      );
      // Side borders
      ctx.fillStyle = 'black';
      ctx.fillRect( // Left
        x,
        y,
        bubbleBorder,
        lineHeight
      );
      ctx.fillRect( // Right
        x + maxWidth + (bubblePadding * 2) - bubbleBorder,
        y,
        bubbleBorder,
        lineHeight + (bubblePadding * 2)
      );
      // Text
      ctx.fillText(
        line,
        x + bubblePadding,
        y + bubblePadding
      );
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  // White BG
  ctx.fillStyle = 'white';
  ctx.fillRect(
    x,
    y + bubblePadding,
    maxWidth + (bubblePadding * 2),
    lineHeight + bubblePadding
  );
  // Side and Bottom Borders
  ctx.fillStyle = 'black';
  ctx.fillRect( // Bottom
    x,
    y + lineHeight *2,
    maxWidth + (bubblePadding * 2),
    bubbleBorder
  );
  ctx.fillRect( // Right
    x,
    y,
    bubbleBorder,
    lineHeight + (bubblePadding * 2)
  );
  ctx.fillRect( // Right
    x + maxWidth + (bubblePadding * 2) - bubbleBorder,
    y,
    bubbleBorder,
    lineHeight + (bubblePadding * 2)
  );

  // Text
  ctx.fillText(
    line,
    x + bubblePadding,
    y + bubblePadding
  );

  return y; // Useful for knowing how far down text rendered
}

module.exports = {
  fillTextWrapped
};
