$(function () {
  var $loginPane = $("#loginPane");
  var $registerPane = $("#registerPane");

  function showAuthSection(section) {
    var isRegister = section === "register";
    $loginPane.toggle(!isRegister);
    $registerPane.toggle(isRegister);
    $(".auth-tabs li").removeClass("active");
    $('.auth-tabs [data-auth-tab="' + section + '"]').parent().addClass("active");
    window.location.hash = isRegister ? "register" : "login";
  }

  $("[data-auth-tab]").on("click", function (e) {
    e.preventDefault();
    showAuthSection($(this).data("authTab"));
  });

  $("#loginForm").on("submit", function (e) {
    e.preventDefault();
    window.location.href = "index.html?auth=1";
  });

  $("#registerForm").on("submit", function (e) {
    e.preventDefault();
    this.reset();
    showAuthSection("login");
  });

  $(".button-checkbox").each(function () {
    var $widget = $(this);
    var $button = $widget.find("button");
    var $checkbox = $widget.find("input:checkbox");
    var color = $button.data("color");
    var settings = {
      on: { icon: "glyphicon glyphicon-check" },
      off: { icon: "glyphicon glyphicon-unchecked" }
    };

    $button.on("click", function () {
      $checkbox.prop("checked", !$checkbox.is(":checked"));
      $checkbox.triggerHandler("change");
      updateDisplay();
    });

    $checkbox.on("change", function () {
      updateDisplay();
    });

    function updateDisplay() {
      var isChecked = $checkbox.is(":checked");
      $button.data("state", isChecked ? "on" : "off");
      $button.find(".state-icon").removeClass().addClass("state-icon " + settings[$button.data("state")].icon);

      if (isChecked) {
        $button.removeClass("btn-default").addClass("btn-" + color + " active");
      } else {
        $button.removeClass("btn-" + color + " active").addClass("btn-default");
      }
    }

    function init() {
      updateDisplay();
      if ($button.find(".state-icon").length === 0) {
        $button.prepend("<i class=\"state-icon " + settings[$button.data("state")].icon + "\"></i>");
      }
    }

    init();
  });

  showAuthSection(window.location.hash === "#register" ? "register" : "login");
});
