(function () {

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

  function adaptiveImage() {
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

  function openMainMenu() {
    var offsetTop = 0;
    window.addEventListener('click', function(e) {
      var menu = document.querySelector('#menu');
      var event = e;
      menu.querySelector('.quests-list').setAttribute('style', 'display:none');
      var targetClass = e.target.className;
      if (targetClass.indexOf('call-for-main-list') !== -1) {
        //console.log(targetClass);
        event.preventDefault();
        $("body").css("background-color", "#FFC946");
        offsetTop = window.pageYOffset;
        console.log('offset' + offsetTop);
        toggleClass(menu, 'active', true);
        window.scrollTo(0, 0);
        popupMenuFixed();
      } else if ((targetClass.indexOf('close-main-list') !== -1)) {
        $("body").css("background-color", "transparent");
        event.preventDefault();
        toggleClass(menu, 'active');
        window.scrollTo(0, offsetTop);
        //console.log('scroll to: ' + offsetTop);
      }
      openSubmenuInMainMenu();
    });
  }

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
        document.querySelector('div').setAttribute('style', 'height:' + (parseInt(window.getComputedStyle(menu).height) + 'px; overflow-y: hidden'));
      } else {
        document.querySelector('div').setAttribute('style', 'height: auto; overflow-y: auto; overflow-x: hidden');
      }
    }
  }

  function openSubmenuInMainMenu() {
    document.querySelector('.quests-list').setAttribute('style', 'display:none');
    window.addEventListener('click', function(e) {
      if ($(e.target).parents('.open-submenu').length) {
        e.preventDefault();
        if ($('.quests-list').is(":hidden")) {
          $('.menu-list li').css('display', 'none');
          document.querySelector('.open-submenu').setAttribute('style', 'display:block');
          document.querySelector('.quests-list').setAttribute('style', 'display:block');
        } else {
          document.querySelector('.quests-list').setAttribute('style', 'display:none');
          $('.menu-list li').css('display', 'block');
        }
      } else {
        document.querySelector('.quests-list').setAttribute('style', 'display:none');
        $('.menu-list li').css('display', 'block');
      }
    });
  }

function changeProgramInformation() {
  var buttonClass = ".more-programs";
  var counter = 0;
  var firstActive = 0;
  // ���������� �������� ������� � ����
  var amountofActive;
  // ����� ���������� ������� � ����
  var allMenuItemsAmount;
  amountofActive = 6;
  allMenuItemsAmount = $(document).find(".programs-list").find("li").length;
  $(buttonClass).on("click", function(e) {
    e.stopPropagation();
    e.preventDefault();
    var index = $(document).find(".programs-list").find("li.show:first").index();
    var currentActive = index + amountofActive;
    var menuList = $(document).find(".programs-list").find("li");
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


function openPrograms() {
  $(".back-to-menu").hide();
  $(".program-name").on("click", function(e) {
    e.preventDefault();
    $(".program-name").removeClass("active");
    $(".back-to-menu").show();
    $(this).addClass("active");
    $(this).parents("body").find(".programs-block").hide();
   // $(this).parents("body").find(".program-information").hide();
    var currentSlide = $(this).attr("href");
    $(this).parents("body").find(".programs-table").addClass("active");
    $(this).parents("body").find($(currentSlide)).show();
  });
}

function switchToProgramsMenu() {
  $(document).on("click",".back-to-menu",function(e) {
    e.preventDefault();
    $(this).hide();
    $(this).parents("body").find(".programs-table").removeClass("active");
    $(this).parents("body").find(".programs-block").show();
  });
}

function createMap() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById("map");
  mapdiv.style.width = '100%';
  mapdiv.style.height = '450px';
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 59.98700, lng: 30.24201},
    zoom: 14
  });
  var grimm = {
    url: "../assets/images/marker.png"
  };
  var marker = new google.maps.Marker({
    position: map.getCenter(),
    icon: grimm,
    map: map
  });
}

function activePaymentList() {
  $(document).on("click",".payment-list>li",function(e) {
    e.preventDefault();
    $(".payment").removeClass("active").siblings("input").attr("checked",false);
    $(this).find(".payment").addClass("active").siblings("input[type=radio]").attr("checked","checked");
  });
}

$(function() {

  $("#back-to-previos").on("click", function(e) {
    e.preventDefault();
    history.go(-1);
  });

  adaptiveImage();

  openMainMenu();

  function heroesCarouselCallback(e) {
    var owlStatusCurrent = $(".owl-status .current");
    var owlStatusTotal = $(".owl-status .total");
    var owls = Array.prototype.filter.call(document.querySelectorAll('#heroes .owl-item'), function(owl) {
      return owl.className.indexOf('cloned') === -1;
    });
    console.log(owls);
    for (var i = 0; i < owls.length; i++) {
      if (owls[i].className.indexOf('active') !== -1) {
        owlStatusCurrent.html(i + 1);
        break;
      }
    }
    owlStatusTotal.html(owls.length);
  }

  if ($(".mobile").length) {
    if ($(".programs-list .program-name").length) {
      openPrograms();
      changeProgramInformation();
      switchToProgramsMenu();
    }
  }
  if ($(".owl-carousel").length) {
    var owlHeroes = $("#heroes");
    $(".owl-status .current").html('1');
    $(".owl-status .total").html($("#heroes>.hero").length);
    owlHeroes.owlCarousel({
      margin: 0,
      loop: true,
      autoWidth: false,
      dots: false,
      items: 1,
      dotsEach: false,
      nav: false
    }).on('changed.owl.carousel', heroesCarouselCallback);

    var owlPlaces = $("#places");
    if (!window.matchMedia("screen and (max-width: 500px").matches) {
      owlPlaces.owlCarousel({
        margin: 0,
        nav: true,
        loop: true,
        autoWidth: false,
        dots: false,
        items: 3,
        dotsEach: false
      });
    } else {
      owlPlaces.owlCarousel({
        margin: 0,
        nav: true,
        loop: true,
        autoWidth: false,
        dots: false,
        items: 1,
        dotsEach: false
      });
    }
  }

  if ($(".team-mates").length) {
    var maxListHeight = 0;
    var owlTeamMates = $(".team-mates");
    owlTeamMates.owlCarousel({
      margin: 0,
      nav: false,
      loop: true,
      autoWidth: false,
      dots: true,
      items: 1,
      dotsEach: true
    });
    $(".team-mates .owl-item").each(function() {
      if ($(this).outerHeight() > maxListHeight) {
        maxListHeight = $(this).outerHeight();
      }
    });
    $(".team-mates .owl-item").css("height", maxListHeight + "px");
  }

  if ($("#map").length) {
    createMap();
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

  if ($(".programs-list").length) {
    slimScrollInitialise(".programs-list");
  }

  var programTable =  $(".programs-table");
  if (programTable.length) {
    programTable.owlCarousel({
      margin: 0,
      nav: false,
      loop: true,
      autoWidth: true,
      singleItem:true,
      dots: false
    });
  }
  if ($(".payment-list").length) {
    activePaymentList();
  }
});
})();