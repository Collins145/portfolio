// external js: masonry.pkgd.js
//itemSelector: '.grid-item',
//columnWidth: 160,
// gutter: 20

//});

//testing masonry
$("#grid2 img").each(function () {
  var $this = $(this);
  $this.wrap('<div class="item"><a></a></div>');
  $("a").removeAttr("href");
});
$("#grid2").addClass("effect-2");

$(window).load(function () {
  var $container = $(".grid");
  // initialize
  $container.masonry({
    //columnWidth: 200,
    itemSelector: ".item",
  });
  $(".item > a").removeAttr("href");
});
