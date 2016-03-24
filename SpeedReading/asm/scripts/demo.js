/*
Copyright (c) 2015 by Nate Wiley (http://codepen.io/natewiley/pen/zluCe)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
$(function() {
  'use strict';

  function Bar(options) {
    var uid = _.uniqueId();
    this.options = _.defaults({}, options, {
      'uid': uid,
      'id': 'progressbar-' + uid,
      'dir': 1,
      'total': 100,
      'width': 30,
      'height': 30,
      'reference': 200,
      'state': '',
      'time': 1.5,
      'container': 'body'
    });

    this.$element = $('<div id="' + this.options.id + '" class="wrap"></div>');
    this.update();

    this.$element.appendTo(this.options.container);
  }

  Bar.prototype.update = function(options) {
    options || (options = {});

    var hasScore = 'score' in options;
    options = _.merge(this.options, options);

    var html = [],
        reference = options.reference,
        score = options.score;

    if (hasScore) {
      options.total = Math.floor((score / reference) * 100);
    }
    var css = [[
      '#<%= id %> .c {',
      '  width: <%= width %>px;',
      '  height: <%= height %>px;',
      '  margin-top: 20px;',
      '  opacity: 0;',
      '  position: absolute;',
      '}'
    ]];

    this.$element[0].className = 'wrap';
    if (options.state) {
      this.$element.addClass(options.state);
    }
    _.times(options.total, function() {
      html.push('<div class="c"></div>');
      css.push([
        '#<%= id %> .c:nth-child(<%= index %>) {',
        '  left: <%= (index / 2) %>vw;',
        '  animation-name: anim<%= uid + "-" + index %>;',
        '  animation-duration: <%= time %>s;',
        '  animation-delay: <%= (dir > 0 ? index : total - index - 1) * (time / total) %>s;',
        '  animation-iteration-count: 1;',
        '  animation-direction: <%= (dir > 0 ? "normal" : "reverse") %>;',
        '  animation-fill-mode: both;',
        '  background: hsla(<%= index * 2.5 %>, 100%, 50%, 1);',
        '}',
        '#<%= id %>.processing .c:nth-child(<%= index %>) {',
        '  animation-name: anim<%= uid + "-" + index %>;',
        '  animation-delay: 0s;',
        '  animation-iteration-count: infinite;',
        '  animation-direction: alternate;',
        '}',
        '@keyframes anim<%= uid + "-" + index %> {',
        '  0% {',
        '    opacity: 0;',
        '    transform: translate3d(<%= _.random(-25, 25, true) %>vh, <%= _.random(-25, 25, true) %>vw, <%= index %>px);',
        '  }',
        '  100% {',
        '    opacity: 100;',
        '    transform: translate3d(0,0,0);',
        '  }',
        '}'
      ]);
    });

    if (this.$style) {
        this.$style.remove();
    }
    this.$style = $('<style id="style_' + this.uid + '">' +
      _.map(css, function(entry, index) {
        return _.template(entry.join('\n'))(_.assign({}, options, { 'index': index }));
      }, this).join('\n') +
    '</style>');

    this.$element.html(html.join('\n'));
    StyleFix.styleElement(this.$style.appendTo('head')[0]);
  };

  var bar1 = new Bar({ 'container': '#bar1', 'total': 24, 'state': 'processing' });
  var bar2 = new Bar({ 'container': '#bar2', 'total': 24, 'state': 'processing' });

  JetStream.onEnd(function(score) {
    $('#bar1-status').text('completed');
    bar1.update({ 'state': '', 'score': score });
    JetStream.removeEndListeners();
    JetStream.clearPlans();

    JetStream.onEnd(function(score) {
      $('#bar2-status').text('completed');
      bar2.update({ 'state': '', 'score': score });
      JetStream.removeEndListeners();
      JetStream.clearPlans();
    });

    addNoAsmPlans();
    $('#bar2-status').text('running');
    _.defer(JetStream.start);
  });

  JetStream.switchToQuick();
  addAsmPlans();
  $('#bar1-status').text('running');
  $('#bar2-status').text('queued');
  _.defer(JetStream.start);
});