(function() {
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

  var flag = false;
  function GeneralPrice() {
    this.sliderTimeCost = 0;
    this.sliderHeroesCost = 0;
    this.questCost = 0;
    this.placeCost = 0;
    this.featuresCost = 0;
    this.cost = 0;
  }

  GeneralPrice.prototype.setSliderTimeCost = function (value) {
    if (value) {
      this.sliderTimeCost = value;
    }
    this.setCost();
  };

  GeneralPrice.prototype.setSliderHeroesCost = function (value) {
    if (value) {
      this.sliderHeroesCost = value;
    }
    this.setCost();
  };

  GeneralPrice.prototype.setQuestCost = function (value) {
    if (value) {
      this.questCost = value;
    }
    this.setCost();
  };

  GeneralPrice.prototype.setPlaceCost = function (value) {
    this.placeCost = value;
    this.setCost();
  };

  GeneralPrice.prototype.addFeatureCost = function (value) {
    if (value) {
      this.featuresCost += value;
    }
    this.setCost();
  };

  GeneralPrice.prototype.removeFeatureCost = function (value) {
    if (value) {
      this.featuresCost -= value;
    }
    this.setCost();
  };

  GeneralPrice.prototype.setCost = function () {
    this.cost = this.sliderTimeCost +
      this.sliderHeroesCost + this.questCost +
    this.featuresCost;
    if ($(".general-rent").length) {
      console.log(this.placeCost);
      (this.placeCost === 0) ?
        $(".general-rent").hide()
        : $(".general-rent").show();
    }
    if ($(".general-price").length) {
      $(".general-price .price").text(this.getCost());
    }
    if ($(".general-price").length) {
      if (this.featuresCost > 0) {
        // some additional features
        $(".general-price .from").text('от');
      } else {
        console.log(flag);
        if (!flag) {
          $(".general-price .from").text('');
        }
      }
    }
  };

  GeneralPrice.prototype.getCost = function () {
    return this.cost;
  };

  function SliderCalculate(dataInputArray) {
    this.dataInput = dataInputArray;
    this.price = dataInputArray[0].cost;
  }

  SliderCalculate.prototype.setCost = function (value, getFunction) {
    (getFunction) ? this.price = getFunction(value, this)
      : this.price = value;
    if ($(".general-price").length) {
      // choice is more (heroes/time)
      if (this.getCost() === this.getDataInput()[this.getDataInput().length - 1].cost) {
        flag = true;
        $(".general-price .from").text('от');
      } else {
        flag = false;
        // choice is different from more
        generalPrice.featuresCost === 0 ?
          // no additional features
          $(".general-price .from").text('')
          // some additional features
       :  $(".general-price .from").text('от');
    }
  }
  };


  SliderCalculate.prototype.getDataInput = function () {
    return this.dataInput;
  };

  SliderCalculate.prototype.getCost = function () {
    return this.price;
  };

  function getSliderCost(value, slider) {
    value = parseInt(value, 10);
    for (var i = 0; i < slider.dataInput.length; i++) {
      if (slider.dataInput[i].sliderInput === value) {
        return slider.dataInput[i].cost;
      }
    }
    return false;
  }

  SliderCalculate.prototype.setPrice = function (price) {
    this.price = price;
  };

  function Quest() {
    this.applyData();
  }

  Quest.prototype.applyData = function () {
    var xhr = new XMLHttpRequest();
    if ($("body").find(".main").length) {
      url = $("body").hasClass("mobile") ? '../data/quests.json' : 'data/quests.json';
    } else {
      url = $("body").hasClass("mobile") ? '../../data/quests.json' : '../data/quests.json';
    }
    xhr.open('GET', url);
    xhr.timeout = 15000;
    xhr.ontimeout = function (e) {
      console.log('timeout');
    };
    xhr.onerror = function (e) {
      console.log('error');
    };
    xhr.onreadystatechange = (function (e) {
      if (xhr.status === 200 && xhr.readyState === 4) {
        var rawData = JSON.parse(e.target.response);
        this.programs = rawData;
        this.setPrice(rawData[0].price);
      }
    }).bind(this);
    xhr.send();
  };

  Quest.prototype.setPrice = function (price) {
    this.price = price;
  };

  Quest.prototype.getPrice = function (price) {
    return this.price;
  };

  function selectQuest(generalPrice, currentQuest) {
    var currentProgram = $(".select-scenario").siblings(".options")
      .find("li.selected").attr("data-raw-value");
    var currentPrice = getQuestCost(currentProgram, currentQuest);
    currentQuest.setPrice(currentPrice);
    generalPrice.setQuestCost(currentQuest.getPrice());
  }

  function getQuestCost(program, quest) {
    for (var i = 0; i < quest.programs.length; i++) {
      if (quest.programs[i].program === program) {
        return quest.programs[i].price;
      }
    }
    return false;
  }

  function Place(dataInput) {
    this.places = dataInput;
    this.price = dataInput[0].price;
  }

  Place.prototype.setPrice = function (price) {
    this.price = price;
  };

  Place.prototype.getPrice = function (price) {
    return this.price;
  };

  function getPlaceCost(currentPlace, selectedPlace) {
    for (var i = 0; i < currentPlace.places.length; i++) {
      if (currentPlace.places[i].place === selectedPlace) {
        return currentPlace.places[i].price;
      }
    }
    return false;
  }

  function setCurrentPlaceCost(generalPrice, currentPlace) {
    $(document).on("click", ".places .owl-item", function () {
      $(this).parents(".places").find(".place").removeClass("current");
      $(this).find(".place").addClass("current");
      var selectedPlace = $(this).find(".place").attr("data-place");
      var currentPrice = getPlaceCost(currentPlace, selectedPlace);
      currentPlace.setPrice(currentPrice);
      generalPrice.setPlaceCost(currentPlace.getPrice());
    });
  }

  function Features(dataInput) {
    this.features = dataInput;
  }

  function getFeaturePrice(currentFeature, featureList) {
    for (var i = 0; i < featureList.features.length; i++) {
      if (featureList.features[i].feature === currentFeature) {
        return featureList.features[i].price;
      }
    }
    return false;
  }

  function setFeatures(featureList, generalPrice) {
    $(".another-features-list").find(":checkbox").on("click", function () {
      var $this = $(this);
      var currentFeature = $this.attr("id");
      var currentFeaturePrice = getFeaturePrice(currentFeature, featureList);
      if ($this.is(":checked")) {
        generalPrice.addFeatureCost(currentFeaturePrice);
      } else {
        generalPrice.removeFeatureCost(currentFeaturePrice);
      }
    });
  }

  function getDataByAJAX(data) {
    var xhr = new XMLHttpRequest();
    if ($("body").find(".main").length) {
      url = $("body").hasClass("mobile") ? '../data/' + data + '.json' : 'data/' + data + '.json';
    } else {
      url = $("body").hasClass("mobile") ? '../../data/' + data + '.json' : '../data/' + data + '.json';
    }
    xhr.open('GET', url);
    xhr.ontimeout = function (e) {
      console.log('timeout');
    };
    xhr.onerror = function (e) {
      console.log('error');
    };
    xhr.onreadystatechange = function (e) {
      if (xhr.status === 200 && xhr.readyState === 4) {
        var dataInput = JSON.parse(e.target.response);
        switch (data) {
          case 'timeSlider':
            var timeSliderCalculate = new SliderCalculate(dataInput);
            generalPrice.setSliderTimeCost(timeSliderCalculate.getCost());
            $("#slider-range-time").slider({
              range: "min",
              min: 1,
              max: 7,
              step: 1,
              value: 1,
              animate: true,
              slide: function (event, ui) {
                $("#slider-time").val(ui.value);
                timeSliderCalculate.setCost($("#slider-time").val(),
                  getSliderCost);
                generalPrice.setSliderTimeCost(timeSliderCalculate.getCost())
              },
              change: function (event, ui) {
                $("#slider-time").val(ui.value);
                timeSliderCalculate.setCost($("#slider-time").val(),
                  getSliderCost);
                generalPrice.setSliderTimeCost(timeSliderCalculate.getCost());
              }
            });
            $("#slider-time").val($("#slider-range-time").slider("value"));
            break;
          case 'heroesSlider':
            var heroesSliderCalculate = new SliderCalculate(dataInput);
            generalPrice.setSliderHeroesCost(heroesSliderCalculate.getCost());
            $("#slider-range-heroes").slider({
              range: "min",
              min: 1,
              max: 6,
              step: 1,
              value: 1,
              animate: true,
              slide: function (event, ui) {
                $("#slider-heroes").val(ui.value);
                heroesSliderCalculate.setCost($("#slider-heroes").val(),
                  getSliderCost);
                generalPrice.setSliderHeroesCost(heroesSliderCalculate.getCost());
              },
              change: function (event, ui) {
                $("#slider-heroes").val(ui.value);
                heroesSliderCalculate.setCost($("#slider-heroes").val(),
                  getSliderCost);
                generalPrice.setSliderHeroesCost(heroesSliderCalculate.getCost());
              }
            });
            $("#slider-heroes").val($("#slider-range-heroes").slider("value"));
            break;
          case 'features':
            var featuresList = new Features(dataInput);
            setFeatures(featuresList, generalPrice);
            break;
          case 'places':
            var currentPlace = new Place(dataInput);
            var owlPlaces = $("#places");
            owlPlaces.owlCarousel({
              margin: 27,
              autoWidth: true,
              nav: true,
              loop: true,
              items: 3
            });
            setCurrentPlaceCost(generalPrice, currentPlace);
            generalPrice.setPlaceCost(currentPlace.getPrice());
            break;
        }
      }
    };
    xhr.send();
  }

  var generalPrice = new GeneralPrice();

  function sendCallbackForm() {
    var callbackForm = $(".callback-form");
    var offsetTop = 0;
    $(document).on("click", function (e) {
      if ($(e.target).hasClass("open-callback-form")) {
        offsetTop = window.pageYOffset;
       // console.log('offset from callback: ' + offsetTop);
       // $("body").css({"position": "fixed", "overflow-y": "scroll"});
        e.preventDefault();
        //console.log('prevent default from callback');
        e.stopPropagation();
        //console.log('stopPropagatio from callback');
        var $this = $(this);
        if ($this.parents("body").find(".calculate-wrapper").length) {
          var calculationForm = $this.parents("body").find(".calculate-wrapper");
          calculationForm.clone().appendTo(callbackForm);
          callbackForm.find(".calculate-wrapper").css("display", "none");
        }
        if (!callbackForm.hasClass("active")) {
          callbackForm.addClass("active");
        }
      } else if (!($(e.target).parents(".callback-form-wrapper").length)) {
          if (callbackForm.hasClass("active")) {
            $(document).find(".callback-form").find(".calculate-wrapper").remove();
            callbackForm.removeClass("active");
            window.scrollTo(0, offsetTop);
          }
      } else if (e.target.className.indexOf("close-form") !== -1) {
          if (callbackForm.hasClass("active")) {
          //  console.log('from callback scrolled to: ' + offsetTop);
         //   $("body").css({"position": "relative", "overflow-y": "auto"});
            $(document).find(".callback-form").find(".calculate-wrapper").remove();
            callbackForm.removeClass("active");
            window.scrollTo(0, offsetTop);
          }
        }
    });
  }

  $(function () {

    if ($(".callback-form").length) {
      sendCallbackForm();
    }

    if ($("#slider-range-time").length) {
      // slider with select time of event
      var timeSliderCalculate = getDataByAJAX('timeSlider');
    }

    if ($("#slider-range-heroes").length) {
      // slider with select amount of heroes
      var heroesSliderCalculate = getDataByAJAX('heroesSlider');
    }

    if ($(".select-scenario").length) {
      // select scenario of event
      var fancySelect = $(".select-scenario");
      var currentQuest = new Quest();
      generalPrice.setQuestCost(currentQuest.getPrice());
      fancySelect.fancySelect({forceiOS: true}).on('change.fs', function () {
        selectQuest(generalPrice, currentQuest);
      });
      slimScrollInitialise(".options");
    }

    if ($(".owl-carousel").length) {
      // select place of event
      var currentPlace = getDataByAJAX('places');
    }
    if ($(".another-features-list").length) {
      var featuresList = getDataByAJAX('features');
    }

  });

})();