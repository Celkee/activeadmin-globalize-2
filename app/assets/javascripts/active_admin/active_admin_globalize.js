$(
  function () {
    var translations = function () {
      // Hides or shows the + button and the remove button.
      var updateLocaleButtonsStatus = function ($dom) {
        $dom.find(".add-locale").each(
          function () {
            var $addLocale = $(this);
            return $addLocale.find('ul li:not(.hidden)').length === 0 ?
              $addLocale.hide()
              : $addLocale.show();
          }
        );
      };

      // Hides or shows the locale tab and its corresponding element in the add menu.
      var toggleTab = function ($tab, active) {
        var $addButton = $tab.parents("ul").find('.add-locale li:has(a[href="' + $tab.attr("href") + '"])');
        if (active) {
          $tab.addClass("hidden").show().removeClass("hidden");
          return $addButton.hide().addClass("hidden");
        } else {
          $tab.addClass("hidden").hide().addClass("hidden");
          return $addButton.show().removeClass("hidden");
        }
      };

      return $(".activeadmin-translations > ul").each(
        function () {
          var $dom = $(this);
          // true when tabs are used in show action, false in form
          var showAction = $dom.hasClass("locale-selector");

          if (!$dom.data("ready")) {
            $dom.data("ready", true);
            var $tabs = $("li > a", this);
            // content to toggle is different according to current action
            var $contents = $(this).siblings(showAction ? "div.field-translation" : "fieldset");

            $tabs.click(
              function (event) {
                var $tab = $(this);
                $tabs.not($tab).removeClass("active");
                $tab.addClass("active");
                $contents.hide();
                $contents.filter($tab.attr("href")).show();
                return event.preventDefault();
              }
            );

            $tabs.eq(0).click();

            // Add button and other behavior is not needed in show action
            if (showAction) {
              return;
            }

            // Collect tha available locales.
            var availableLocales = [];
            $tabs.not(".default").each(
              function () {
                return availableLocales.push($("<li></li>").append($(this).clone().removeClass("active")));
              }
            );

            // Create a new tab as the root of the drop down menu.
            var $addLocaleButton = $('<li class="add-locale"><a href="#">+</a></li>');
            $addLocaleButton.append($("<ul></ul>").append(availableLocales));

            // Handle locale addition
            $addLocaleButton.find("ul a").click(
              function (event) {
                var href = $(this).attr("href");
                var $tab = $tabs.filter('[href="' + href + '"]');
                toggleTab($tab, true);
                $tab.click();
                updateLocaleButtonsStatus($dom);
                return event.preventDefault();
              }
            );

            // Remove a locale from the tab.
            var $removeButton = $('<span class="remove">x</span>').click(
              function (event) {
                event.stopImmediatePropagation();
                event.preventDefault();
                var $tab = $(this).parent();
                toggleTab($tab, false);
                if ($tab.hasClass("active")) {
                  $tabs.not(".hidden").eq(0).click();
                }

                return updateLocaleButtonsStatus($dom);
              }
            );

            // Add the remove button to every tab.
            $tabs.not(".default").append($removeButton);

            // Add the new button at the end of the locale list.
            $dom.append($addLocaleButton);

            $tabs.each(
              function () {
                var $tab = $(this);
                var $content = $contents.filter($tab.attr("href"));
                var containsErrors = $content.find(".input.error").length > 0;
                $tab.toggleClass("error", containsErrors);
                // Find those tabs that are in use.
                var hide = true;
                // We will not hide the tabs that have any error.
                if ($tab.hasClass("error") || $tab.hasClass("default")) {
                  hide = false;
                } else {
                  // Check whether the input fields are empty or not.
                  $content.find("[name]").not('[type="hidden"]').each(
                    function () {
                      if ($(this).val()) {
                        // We will not hide the tab because it has some data.
                        hide = false;
                        return false;
                      }
                    }
                  );
                }

                return toggleTab($tab, !hide);
              }
            );

            // Remove the fields of hidden locales before form submission.
            var $form = $dom.parents("form");
            if (!$form.data("ready")) {
              $form.data("ready");
              $form.submit(
                function () {
                  // Get all translations (the nested ones too).
                  return $(".activeadmin-translations > ul").each(
                    function () {
                      // Get the corresponding fieldsets.
                      var $fieldsets = $(this).siblings("fieldset");
                      return $("li:not(.add-locale) > a.hidden", this).each(
                        function () {
                          var $tab = $(this);
                          var localeClassSelector = $tab.attr("href");
                          // check if it's an existing translation otherwise remove it
                          var $currentFieldset = $fieldsets.filter(localeClassSelector);
                          var $translationId = $("input[id$=_id]", $currentFieldset);
                          if (!$translationId.val()) {
                            // remove the fieldset from dom so it won't be submitted
                            return $currentFieldset.remove();
                          } else if ($(".activeadmin-translations > ul > li:not(.add-locale) > a[href='" + localeClassSelector + "']:not(.hidden)").length === 0) {
                            // mark it for database removal appending a _destroy element
                            var $destroy = $("<input/>").attr(
                              {
                                type: "hidden",
                                name: $translationId.attr("name").replace("[id]", "[_destroy]"),
                                id: $translationId.attr("id").replace("_id", "_destroy"),
                                value: "1"
                              }
                            );
                            return $destroy.appendTo($currentFieldset);
                          } else {
                            // clear the particular fields for the existing translation
                            return $currentFieldset.find("input[type=text],textarea").val("");
                          }
                        }
                      );
                    }
                  );
                }
              );
            }

            // Initially update the buttons' status
            updateLocaleButtonsStatus($dom);
            return $tabs.filter(".default").click();
          }
        }
      );
    };

    // this is to handle elements created with has_many
    $("a").on(
      "click",
      function () {
        return setTimeout(
          function () {
            return translations();
          },
          50
        );
      }
    );

    // Used to toggle translations values for inline fields
    $("a.ui-translation-trigger").click(
      function (event) {
        var $locale = $(this).data("locale");
        var $td = $(this).closest("td");
        $(".field-translation", $td).hide();
        $(".locale-" + $locale, $td).show();
        $(this).parent().children("a.ui-translation-trigger").removeClass("active");
        $(this).addClass("active");
        return event.preventDefault();
      }
    );

    return translations();
  }
);
