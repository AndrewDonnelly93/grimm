(function () {

  /**
   * ������� ����� ��� ��������� ���
   * @param {Element} element
   * @param {string} className
   * @param {boolean=} action
   */
  function toggleClass(element, className, action) {
    if (action && element.className.indexOf(className) === -1) {
      element.className = !element.className.length ? className :
      element.className + ' ' + className;
    } else if (!action && element.className.indexOf(className) !== -1) {
      var classList = element.className.split(' ');
      classList.splice(classList.indexOf(className), 1);
      element.className = classList.join(' ');
    }
  }

  function openMainMenu() {
    var offsetTop = 0;
    window.addEventListener('click', function(e) {
      var menu = document.querySelector('.menu-section-main');
      var event = e;
      menu.querySelector('.quests').setAttribute('style', 'display:none');
      menu.querySelector('.back-to-prev').setAttribute('style', 'display:none');
      var targetClass = e.target.className;
      if (targetClass.indexOf('call-for-main-list') !== -1) {
        //console.log(targetClass);
        event.preventDefault();
        $("body").css("background-color", "#FFC946");
        offsetTop = window.pageYOffset;
        console.log('offset ' + offsetTop);
        document.querySelector('div').setAttribute('style', 'height:' + (parseInt(window.getComputedStyle(menu).height) + 'px; overflow-y: hidden'));
        toggleClass(menu, 'active', true);
        window.scrollTo(0, 0);
        console.log('scroll to: 0, 0');
        popupMenuFixed();
      } else if ((targetClass.indexOf('close-main-list') !== -1)) {
        $("body").css("background-color", "transparent");
        event.preventDefault();
        document.querySelector('div').setAttribute('style', 'height: auto; overflow-y: auto; overflow-x: hidden');
        toggleClass(menu, 'active');
        window.scrollTo(0, offsetTop);
        console.log('scroll to: ' + offsetTop);
      }
      openSubmenuInMainMenu();
    });
  }

  function slimScrollInitialise(className) {
    var $box = $(className);
    $box.mCustomScrollbar({
      scrollbarPosition: "inside",
      theme: "minimal",
      advanced: {
        updateOnContentResize: true
      }
    });
  }

  function openPrograms() {
    slimScrollInitialise(".programs-list-container");
    slimScrollInitialise(".programs-list.big");
    $(".program-name").on("click", function (e) {
      e.preventDefault();
      console.log('prevent default');
      $(".program-name").removeClass("active");
      $(this).addClass("active");
      $(this).parents("body").find(".program-information").hide();
      var currentSlide = $(this).attr("href");
      var link = $(currentSlide).find(".btn.more-btn").attr("href");
      $(currentSlide).find(".btn.more-btn").click(function(e) {
        e.preventDefault();
        console.log('h');
        location.href = link;
      });
      $(this).parents("body").find($(currentSlide)).show();
      $(this).parents(".programs-list-container").removeClass("anim");
    });
  }

  function changeProgramInformation(buttonClass) {
    $(buttonClass).on("hover", function () {
      $(this).css("cursor", "pointer");
    });
    var counter = 0;
    var firstActive = 0;
    // ���������� �������� ������� � ����
    var amountofActive;
    // ����� ���������� ������� � ����
    var allMenuItemsAmount;
    if (buttonClass.indexOf('big') !== -1) {
      amountofActive = 11;
      allMenuItemsAmount = $(document).find(".programs-list.big").find("li").length;

    } else {
      amountofActive = 5;
      allMenuItemsAmount = $(document).find(".programs-list.small").find("li").length;
    }
    $(buttonClass).on("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      var index = $(this).siblings(".programs-list").find("li.show:first").index();
      var currentActive = index + amountofActive;
      var menuList = $(this).siblings(".programs-list").find("li");
      // ���� �� ���������� ��� ���������, ������� � �������� show � ���������
      // show ����, ������� ���� ����� amountofActive �� ��������
      if (currentActive < allMenuItemsAmount) {
        menuList.eq(index).removeClass("show").addClass("inactive");
        menuList.eq(currentActive).removeClass("inactive").addClass("show");
      } else {
        // ���������� ������, ��������� show ��������� � 0 �� amountOfActive
        menuList.removeClass("show").addClass("inactive");
        for (var i = 0; i < amountofActive; i++) {
          toggleClass(menuList[i], 'inactive');
          toggleClass(menuList[i], 'show', true);
        }
      }
    });
  }

  function adaptiveImage() {
    var programsNames = $(".programs-names");
    if (programsNames.length) {
      if (programsNames.is(":visible")) {
        $(".program-image-content img").css({"min-height": "auto", "height": programsNames.height()});
      }
    }
    if ($(".holiday-gallery-list").length) {
      var imageSize = $(".holiday-gallery-list li:first").width();
      $(".holiday-gallery-list li img").each(function() {
        $(this).parent("li").css({"height": imageSize,
          "width": imageSize});
        $(this).css({"height": imageSize,
        "width": imageSize});
      });
    }
  }

  function openMorePrograms() {
    var buttonClass;
    if (window.matchMedia("screen and (max-width: 1919px").matches) {
      buttonClass = ".more-programs.small";
    } else {
      buttonClass = ".more-programs.big";
    }
    var condition;
    if (buttonClass.indexOf('big') !== -1) {
      condition = $(document).find(".programs-list.big").find("li.inactive");
    } else if (buttonClass.indexOf('small') !== -1) {
      condition = $(document).find(".programs-list.small").find("li.inactive");
    }
    if (condition.length) {
      changeProgramInformation(buttonClass);
    } else {
      $(buttonClass).hide();
    }
  }

  function openTeamInfo() {
    $(".table-menu a").on("click", function (e) {
      e.preventDefault();
      $(".table-menu>li").removeClass("active");
      var currentSlide = $(this).attr("href");
      $(this).parents("li").addClass("active");
      $(this).parents(".team-table").find(".main-cell").find(".team-mates>li").removeClass("active");
      $(this).parents(".team-table").find(".main-cell").find($(currentSlide)).addClass("active");
    });
  }

  function openSmallTeamInfo() {
    $(document).on("click", ".small-menu a", function (e) {
      e.preventDefault();
      $(".small-menu>li").removeClass("active");
      var currentSlide = $(this).attr("href");
      $(this).parents("li").addClass("active");
      $(this).parents(".team-table").find(".main-cell").find(".team-mates>li").removeClass("active");
      $(this).parents(".team-table").find(".main-cell").find($(currentSlide)).addClass("active");
    });
  }

  function createMap() {
    var useragent = navigator.userAgent;
    var mapdiv = document.getElementById("map");
    mapdiv.style.width = '50%';
    mapdiv.style.height = '100%';
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 59.98700, lng: 30.24201},
      zoom: 14
    });
    var grimm = {
      url: "assets/images/marker.png"
    };
    var marker = new google.maps.Marker({
      position: map.getCenter(),
      icon: grimm,
      map: map
    });
  }

  function callOwl(owlHeroes) {
    if (window.matchMedia("screen and (max-width: 1919px").matches) {
      owlHeroes.owlCarousel({
        margin: 0,
        nav: false,
        loop: true,
        autoWidth: false,
        items: 3
      });
    } else {
      owlHeroes.owlCarousel({
        margin: 193,
        nav: true,
        loop: false,
        items: 3
      });
    }
  }

  function callOpenPrograms() {
    openPrograms();
    if (window.matchMedia("screen and (max-width: 1919px").matches) {
      $(".programs-list.small").find("a.program-name").eq(0).click();
    } else {
      $(".programs-list.big").find("a.program-name").eq(0).click();
    }
  }

  function callTeam() {
    openTeamInfo();
    $(".side-block").is(":visible") ?
      $(".big-table-menu").find("li").eq(0).find("a").click()
    : $(".small-table-menu").find("li").eq(0).find("a").click();
  }

  function fixedMenu() {
    var menu = $(".bottom-menu");
    var menuPosition = menu.offset().top +
      2 * menu.height();
    var LIMIT_MENU_HEIGHT = 120;
    if (menu.outerHeight() >= LIMIT_MENU_HEIGHT) {
      menu.find(".contacts").css("margin-top", "13px");
    }
    // ��� ������� �������� ���� ����������� ��� �������, � ��������� ���
    // ����������� ������
    if ($("body").hasClass("index")) {
      var scrollTimeout;
      $(document).on("scroll", function () {
        clearTimeout(scrollTimeout);
        var self = $(this);
        scrollTimeout = setTimeout(function () {
          if (self.scrollTop() >= menuPosition) {
            menu.addClass("fixed").css("display", "block");
          } else {
            menu.removeClass("fixed").css("display", "none");
          }
        }, 100);
      });
    } else {
      menu.addClass("fixed");
      menu.next().css("margin-top", menu.outerHeight());
    }
  }

// ������������� ������� �������� ���� � ��������� ����
  function popupMenuFixed() {
    makeMenuFixed();
    window.addEventListener('click', function(e) {
      if (e.target.className.indexOf('menu')) {
        makeMenuFixed(e.target.className);
      }
    });
  }

  function makeMenuFixed(e) {
    var menu = document.querySelector('#menu');
    if (menu) {
      // ���� �������
      if (menu.className.indexOf('active') !== -1) {
        menu.setAttribute('style', 'position:absolute; bottom: auto');
       // document.querySelector('div').setAttribute('style', 'height:' + (parseInt(window.getComputedStyle(menu).height) + 'px; overflow-y: hidden'));
      } else {
        //document.querySelector('div').setAttribute('style', 'height: auto; overflow-y: auto; overflow-x: hidden');
      }
    }
  }

  function owlTeamMates() {
    if ($(".side-block").is(":hidden")) {
      if ($(".team-mates").length) {
        var maxListHeight = 0;
        var owlTeamMates = $(".team-mates");
        owlTeamMates.owlCarousel({
          margin: 0,
          nav: false,
          dotsEach: true,
          loop: true,
          autoWidth: false,
          autoplay: true,
          items: 1,
          stopOnHover: true
        });
        $(".team-mates .owl-item").each(function () {
          if ($(this).outerHeight() > maxListHeight) {
            maxListHeight = $(this).outerHeight();
          }
        });
        $(".team-mates .owl-item").css("height", maxListHeight + "px");
      }
    }
  }

  function openSubmenuInMainMenu() {
    document.querySelector('.quests').setAttribute('style', 'display:none');
    document.querySelector('#back-to-prev').setAttribute('style', 'display:none');
    window.addEventListener('click', function(e) {
     // console.log(e.target);
     if (e.target.className.indexOf('open-submenu') !== -1) {
          e.preventDefault();
          $('.block-title').css('display', 'none');
          document.querySelector('.open-submenu').setAttribute('style', 'display:inline-block');
          document.querySelector('#back-to-prev').setAttribute('style', 'display:inline-block');
          document.querySelector('.quests').setAttribute('style', 'display:block');
       } else if (e.target.id === 'back-to-prev') {
          e.preventDefault();
          $('.block-title').css('display', 'inline-block');
          document.querySelector('.quests').setAttribute('style', 'display:none');
          document.querySelector('#back-to-prev').setAttribute('style', 'display:none');
        } else {
          document.querySelector('.quests').setAttribute('style', 'display:none');
          document.querySelector('#back-to-prev').setAttribute('style', 'display:none');
          $('.block-title').css('display', 'inline-block');
        }
    });
  }

  $(function () {

    adaptiveImage();

    openMainMenu();

    $(".back-to-previos").on("click", function(e) {
      e.preventDefault();
      history.go(-1);
    });
   // popupMenuFixed();

    if ($(".bottom-menu").length) {
      fixedMenu();
    }

    //owlTeamMates();
    //
    //$(window).resize(function () {
    //  owlTeamMates();
    //});

    if ($(".owl-carousel").length) {
      var owlHeroes = $("#heroes");
      callOwl(owlHeroes);
      $(window).resize(function () {
        callOwl(owlHeroes);
      });
      var owlPlaces = $("#places");
    }

    if ($(".team-table").length) {
      callTeam();
      $(window).resize(function () {
        callTeam();
      });
    }
    if ($("#map").length) {
      createMap();
    }

    if (window.matchMedia("screen and (max-width: 1919px").matches) {
      if ($(".more-open-sb").length) {
        $(".open-programs-list").on("click", function (e) {
          e.stopPropagation();
          $(".programs-list-container").addClass("anim");
        });
        $(".open-programs-list .text-container").on("click", function (e) {
          e.stopPropagation();
          $(".programs-list-container").addClass("anim");
        });
      }
      $(document).click(function (event) {
        if ($(".programs-list-container").hasClass("anim")) {
          $(".programs-list-container").removeClass("anim");
        }
      });
    }


    //if ($(".more-programs").length) {
    //  openMorePrograms();
    //  $(window).resize(function () {
    //    openMorePrograms();
    //  });
    //}
    if ($(".programs-list .program-name").length) {
      callOpenPrograms();
      $(window).resize(function () {
        callOpenPrograms();
      });
    }

    if ($("#customer-phone").length) {
      $("#customer-phone").mask("x0y000z000q00q00", {
        translation: {
          "x": {
            pattern: /\+/,
            fallback: "+"
          },
          "y": {
            pattern: /\(/,
            fallback: "("
          },
          "z": {
            pattern: /\)/,
            fallback: ")"
          },
          "q": {
            pattern: /\-/,
            fallback: '-'
          },
          placeholder: "+_ (___) __-__-__"
        }
      });
    }

    if ($(".holiday-gallery-list").length) {
      $(".holiday-gallery-list").lightGallery({
        thumbnail: false,
        thumbMargin: 5,
        autoplay: true
      });
    }

    $(".main-menu li a").each(function() {
      if ($(this).attr("href") === "#programs") {
        $(this).click(function () {
          if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
              $('html,body').animate({
                scrollTop: target.offset().top
              }, 1000);
              return false;
            }
          }
        });
      }
    });

  });

})();