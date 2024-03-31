/*
	Forty by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

// https://stackoverflow.com/a/20087506
function modifierHeld(event) {
  // Don't stop the user if they're trying to open a new tab.
  return (
    event.ctrlKey || 
    event.shiftKey || 
    event.metaKey || // apple
    (event.button && event.button == 1) // middle click, >IE9 + everyone else
  );
}

// https://stackoverflow.com/a/24056766
function historyBackWithFallback(fallbackUrl) {
  fallbackUrl = fallbackUrl || '/';
  var prevPage = window.location.href;

  window.history.back();

  setTimeout(function(){ 
      if (window.location.href == prevPage) {
          window.location.href = fallbackUrl; 
      }
  }, 750);
}

(function ($) {
  skel.breakpoints({
    xlarge: "(max-width: 1680px)",
    large: "(max-width: 1280px)",
    medium: "(max-width: 980px)",
    small: "(max-width: 736px)",
    xsmall: "(max-width: 480px)",
    xxsmall: "(max-width: 360px)",
  });

  /**
   * Applies parallax scrolling to an element's background image.
   * @return {jQuery} jQuery object.
   */
  $.fn._parallax =
    skel.vars.browser == "ie" || skel.vars.browser == "edge" || skel.vars.mobile
      ? function () {
          return $(this);
        }
      : function (intensity) {
          var $window = $(window),
            $this = $(this);

          if (this.length == 0 || intensity === 0) return $this;

          if (this.length > 1) {
            for (var i = 0; i < this.length; i++)
              $(this[i])._parallax(intensity);

            return $this;
          }

          if (!intensity) intensity = 0.25;

          $this.each(function () {
            var $t = $(this),
              on,
              off;

            on = function () {
              $t.css(
                "background-position",
                "center 100%, center 100%, center 0px"
              );

              $window.on("scroll._parallax", function () {
                var pos =
                  parseInt($window.scrollTop()) - parseInt($t.position().top);

                $t.css(
                  "background-position",
                  "center " + pos * (-1 * intensity) + "px"
                );
              });
            };

            off = function () {
              $t.css("background-position", "");

              $window.off("scroll._parallax");
            };

            skel.on("change", function () {
              if (skel.breakpoint("medium").active) off();
              else on();
            });
          });

          $window
            .off("load._parallax resize._parallax")
            .on("load._parallax resize._parallax", function () {
              $window.trigger("scroll");
            });

          return $(this);
        };

  $(function () {
    var $window = $(window),
      $body = $("body"),
      $wrapper = $("#wrapper"),
      $header = $("#header"),
      $banner = $("#banner"),
      $menu = $("#menu");

    // Disable animations/transitions until the page has loaded.
    $body.addClass("is-loading");

    window.setTimeout(function () {
      $body.removeClass("is-loading");
    }, 200);

    // Clear transitioning state on unload/hide.
    $window.on("unload pagehide", function () {
      window.setTimeout(function () {
        $(".is-transitioning").removeClass("is-transitioning");
      }, 250);
    });

    // Fix: Enable IE-only tweaks.
    if (skel.vars.browser == "ie" || skel.vars.browser == "edge")
      $body.addClass("is-ie");

    // Fix: Placeholder polyfill.
    $("form").placeholder();

    // Prioritize "important" elements on medium.
    skel.on("+medium -medium", function () {
      $.prioritize(
        ".important\\28 medium\\29",
        skel.breakpoint("medium").active
      );
    });

    // Scrolly.
    $(".scrolly").scrolly({
      offset: function () {
        return $header.height() - 2;
      },
    });

    // Adjust all links to fade out.
    var $fadeTime = 200;
    window.setTimeout(function () {
      var $links = $("a");
      $links.each(function () {
        var $link = $(this);
        // Only process internal links that aren't anchors, haven't been explicitly filtered, and don't open a new tab.
        if (((this.pathname === window.location.pathname && this.href.includes("#")) ||
             this.host !== window.location.host || $link.attr("target") == "_blank" ||
             $link.hasClass("no-link-fade")) && !$link.hasClass("yes-link-fade"))
          return;
  
        $link.on("click", function (event) {
          if (modifierHeld(event)) return;
          var href = $link.attr("href");
  
          // Prevent default.
          event.stopPropagation();
          event.preventDefault();
  
          // Start transitioning.
          $wrapper.addClass("is-transitioning");
  
          // Hide menu (if visible).
          window.setTimeout(function () {
            $menu._hide();
          }, $fadeTime);
  
          // Redirect.
          window.setTimeout(function () {
            if ($link.attr("target") == "_blank") window.open(href);
            else location.href = href;
          }, $fadeTime);
        });
      });
    }, 200);

    // Tiles.
    var $tiles = $(".tiles > article");

    $tiles.each(function () {
      var $this = $(this),
        $image = $this.find(".image"),
        $img = $image.find("img"),
        $link = $this.find(".link"),
        x;

      // Image.

      // Set image.
      $this.css("background-image", "url(" + $img.attr("src") + ")");

      // Set position.
      if ((x = $img.data("position"))) $image.css("background-position", x);

      // Hide original.
      $image.hide();

      // Link.
      if ($link.length > 0) {
        $x = $link.clone().text("").addClass("primary").appendTo($this);

        $x.attr("aria-label", $link.text());

        $link = $link.add($x);

        $link.on("click", function (event) {
          if (modifierHeld(event)) return;
          var href = $link.attr("href");

          // Prevent default.
          event.stopPropagation();
          event.preventDefault();

          // Start transitioning.
          $this.addClass("is-transitioning");
          $wrapper.addClass("is-transitioning");

          // Redirect.
          window.setTimeout(function () {
            if ($link.attr("target") == "_blank") window.open(href);
            else location.href = href;
          }, $fadeTime);
        });
      }
    });

    // Header.
    if (skel.vars.IEVersion < 9) $header.removeClass("alt");

    if ($banner.length > 0 && $header.hasClass("alt")) {
      $window.on("resize", function () {
        $window.trigger("scroll");
      });

      $window.on("load", function () {
        $banner.scrollex({
          bottom: $header.height() + 10,
          terminate: function () {
            $header.removeClass("alt");
          },
          enter: function () {
            $header.addClass("alt");
          },
          leave: function () {
            $header.removeClass("alt");
            $header.addClass("reveal");
          },
        });

        window.setTimeout(function () {
          $window.triggerHandler("scroll");
        }, 100);
      });
    }

    // Banner.
    $banner.each(function () {
      var $this = $(this),
        $image = $this.find(".image"),
        $img = $image.find("img");

      // Parallax.
      $this._parallax(0.275);

      // Image.
      if ($image.length > 0) {
        // Set image.
        $this.css("background-image", "url(" + $img.attr("src") + ")");

        // Hide original.
        $image.hide();
      }
    });

    // Menu.
    $menu.wrapInner('<div class="inner"></div>');
    var $menuInner = $menu.children(".inner");
    $menu._locked = false;

    $menu._lock = function () {
      if ($menu._locked) return false;

      $menu._locked = true;

      window.setTimeout(function () {
        $menu._locked = false;
      }, 350);

      return true;
    };

    $menu._show = function () {
      if ($menu._lock()) $body.addClass("is-menu-visible");
    };

    $menu._hide = function () {
      if ($menu._lock()) $body.removeClass("is-menu-visible");
    };

    $menu._toggle = function () {
      if ($menu._lock()) $body.toggleClass("is-menu-visible");
    };

    $menuInner
      .on("click", function (event) {
        event.stopPropagation();
      })
      .on("click", "a", function (event) {
        if (modifierHeld(event)) return;
        var href = $(this).attr("href");

        event.preventDefault();
        event.stopPropagation();

        // Hide.
        $menu._hide();

        // Redirect.
        window.setTimeout(function () {
          window.location.href = href;
        }, 250);
      });

    $menu
      .appendTo($body)
      .on("click", function (event) {
        event.stopPropagation();
        event.preventDefault();

        $body.removeClass("is-menu-visible");
      })
      .append('<a class="close no-fade" href="#menu">Close</a>');

    $body
      .on("click", 'a[href="#menu"]', function (event) {
        event.stopPropagation();
        event.preventDefault();

        // Toggle.
        $menu._toggle();
      })
      .on("click", function (event) {
        // Hide.
        $menu._hide();
      })
      .on("keydown", function (event) {
        // Hide on escape.
        if (event.keyCode == 27) $menu._hide();
      });
    
    // Code block formatting
    var $codeBlocks = $("figure.highlight pre code");
    $codeBlocks.each(function() {
      // Check if the code block has a child table element
      if ($(this).find("table").length == 0) {
        // Add 1em padding to the code block
        $(this).css("padding", "1em");
      }
    });

    // Smooth scrolling for anchor links
    // https://stackoverflow.com/a/7717572
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      // Don't scroll if the href is #menu
      if ($(this).attr("href") == "#menu") return;
      anchor.addEventListener('click', function (e) {
        if (modifierHeld(e)) return;
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    // Hide previous page link if referrer was not this website
    if (document.referrer.indexOf(window.location.hostname) == -1) {
      $("previous-page").hide();
    }
  });
})(jQuery);
