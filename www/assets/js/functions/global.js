//
// global
var Global = (function() {
    var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    // return true or false

    var $body = $('body');
    var $nav = $('nav');


    // disable zoom on phones
    document.addEventListener('touchmove', function(event) {
        event = event.originalEvent || event;
        if (event.scale !== 1) {
            event.preventDefault();
        }
    }, false);

    function reactionAnimation() {
        var pinCount = 15;
        var wannaTry = [];
        var triedIt = [];
        var loveIt = [];
        var maybe = [];
        for (var i = 0; i < pinCount; i++) {

            wannaTry[i + 1] = lottie.loadAnimation({
                container: document.getElementById('wanna-try-' + [i + 1]),
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: 'assets/animation/wanna-try.json'
            });


            triedIt[i + 1] = lottie.loadAnimation({
                container: document.getElementById('tried-it-' + [i + 1]),
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: 'assets/animation/tried-it.json'
            });

            loveIt[i + 1] = lottie.loadAnimation({
                container: document.getElementById('love-it-' + [i + 1]),
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: 'assets/animation/love-it.json'
            });

            maybe[i + 1] = lottie.loadAnimation({
                container: document.getElementById('maybe-' + [i + 1]),
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: 'assets/animation/maybe.json'
            });
        }

        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        var obj;

        function deselectReaction(ele, value) {
            if (ele.parent().parent().find('._active').length >= 1) {
                var reactionData = ele.parent().parent().find('._active').data('reaction');
                if (reactionData == 'triedIt') {
                    obj = triedIt;
                }
                if (reactionData == 'loveIt') {
                    obj = loveIt;
                }
                if (reactionData == 'maybe') {
                    obj = maybe;
                }
                if (reactionData == 'wannaTry') {
                    obj = wannaTry;
                }
                // console.log(reactionData);
                obj[value].playSegments([48, 62], true);
            }
        }
        $.each(arr, function(index, value) {
            $('#wanna-try-' + value).on('click', function() {
                deselectReaction($(this), value);
                wannaTry[value].playSegments([0, 47], true);
            });

            $('#tried-it-' + value).on('click', function() {
                deselectReaction($(this), value);
                triedIt[value].playSegments([0, 47], true);
            });

            $('#love-it-' + value).on('click', function() {
                deselectReaction($(this), value);
                loveIt[value].playSegments([0, 47], true);
            });

            $('#maybe-' + value).on('click', function() {
                deselectReaction($(this), value);
                maybe[value].playSegments([0, 47], true);
            });
        });
    }

    function reactionGrid() {
        // init Isotope
        var $grid = $('.masonry-layout').isotope({
            itemSelector: '.item',
            stagger: 30,
            masonry: {
                columnWidth: 176,
                gutter: 8
            }
        });
        var isotope = $grid.data('isotope');
        var currentReactionID;
        var currentPinItem;

        $('.wanna-try-btn').on('click', function() {

            // update state
            $('.reaction-btn').removeClass('_active');
            $(this).addClass('_active');
            // get id
            currentReactionID = $(this).parent().parent().data('closeup-id');
            currentPinItem = $('.pin-id-' + currentReactionID);
            // add state to grid item
            currentPinItem.removeClass('love-it wanna-try maybe tried-it');
            currentPinItem.addClass('wanna-try');
            currentPinItem.find('.reaction-marker').addClass('_hidden');
            currentPinItem.find('span.wanna-try').removeClass('_hidden');
            $grid.isotope('layout');

        });

        //
        $('.love-it-btn').on('click', function() {

            // update state
            $('.reaction-btn').removeClass('_active');
            $(this).addClass('_active');
            // get id
            currentReactionID = $(this).parent().parent().data('closeup-id');
            currentPinItem = $('.pin-id-' + currentReactionID);
            // add state to grid item
            currentPinItem.removeClass('love-it wanna-try maybe tried-it');
            currentPinItem.addClass('love-it');
            currentPinItem.find('.reaction-marker').addClass('_hidden');
            currentPinItem.find('span.love-it').removeClass('_hidden');
            $grid.isotope('layout');

        });
        //
        $('.tried-it-btn').on('click', function() {
            // update state
            $('.reaction-btn').removeClass('_active');
            $(this).addClass('_active');
            // get id
            currentReactionID = $(this).parent().parent().data('closeup-id');
            currentPinItem = $('.pin-id-' + currentReactionID);
            // add state to grid item
            currentPinItem.removeClass('love-it wanna-try maybe tried-it');
            currentPinItem.addClass('tried-it');
            currentPinItem.find('.reaction-marker').addClass('_hidden');
            currentPinItem.find('span.tried-it').removeClass('_hidden');
            $grid.isotope('layout');

        });
        //
        $('.maybe-btn').on('click', function() {
            // update state
            $('.reaction-btn').removeClass('_active');
            $(this).addClass('_active');

            // get id
            currentReactionID = $(this).parent().parent().data('closeup-id');
            currentPinItem = $('.pin-id-' + currentReactionID);
            // add state to grid item
            currentPinItem.removeClass('love-it wanna-try maybe tried-it');
            currentPinItem.addClass('maybe');
            currentPinItem.find('.reaction-marker').addClass('_hidden');
            currentPinItem.find('span.maybe').removeClass('_hidden');
            $grid.isotope('layout');

        });

        ////////////

        // bind filter button click
        var filterLists = $('.filter-sheet li');
        var pinCountString;
        var emptyStateString;
        filterLists.on('click', function() {
            filterLists.removeClass('_active');
            $(this).addClass('_active');
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({
                filter: filterValue
            });
            if ($(this).attr('data-filter') == '*') {
                $('.show-sheet').removeClass('_active');
                $('.show-sheet').text('Filter');
            } else {
                $('.show-sheet').addClass('_active');
                $('.show-sheet').text('Filter(1)');
            }
            updateReactionPinCount();
            $('body').removeClass('_sheet-is-on');

            if ($(this).attr('data-filter') == '*') {
                pinCountString = '';
                emptyStateString = '';
            }
            if ($(this).attr('data-filter') == '.wanna-try') {
                pinCountString = ' I wanna try';
                emptyStateString = ' you wanna try';
            }
            if ($(this).attr('data-filter') == '.tried-it') {
                pinCountString = ' I tried';
                emptyStateString = ' you tried';
            }
            if ($(this).attr('data-filter') == '.love-it') {
                pinCountString = ' I love';
                emptyStateString = ' you love';
            }
            if ($(this).attr('data-filter') == '.maybe') {
                pinCountString = ' with maybe';
                emptyStateString = ' with maybe';
            }
            $('span.reaction').text(pinCountString);
            $('span.empty-reaction').text(emptyStateString);
        });

        function updateReactionPinCount() {
            $('.pin-count span').text(isotope.filteredItems.length + ' ');
            if (isotope.filteredItems.length == 0) {
                $('.empty-state').removeClass('_hidden');
            } else {
                $('.empty-state').addClass('_hidden');
            }
        }
    }

    function autoTags() {
        // init Isotope
        var $grid = $('.masonry-layout').isotope({
            itemSelector: '.item',
            stagger: 30,
            masonry: {
                columnWidth: 176,
                gutter: 8
            }
        });
        // filter functions
        var filterFns = {

            starsGreaterThan4: function() {
                var number = $(this).find('.number').text();
                $('.number-wrap').removeClass('_hidden');
                return parseInt(number) > 3;
            },

            lessThan30: function() {
                var time = $(this).find('.time').text();
                $('.time-wrap').removeClass('_hidden');
                return parseInt(time) < 30;

            },

            serve2: function() {
                var serve = $(this).find('.serve').text();
                $('.serve-wrap').removeClass('_hidden');
                return parseInt(serve) == 2;
            }
        };
        // bind filter button click
        $('.auto-generate-tags-bar .button-sml').on('click', function() {
            $('.time-wrap').addClass('_hidden');
            $('.serve-wrap').addClass('_hidden');
            $('.number-wrap').addClass('_hidden');
            var filterValue = $(this).attr('data-filter');
            // use filterFn if matches value
            filterValue = filterFns[filterValue] || filterValue;
            $grid.isotope({
                filter: filterValue
            });
        });
        // change is-checked class on buttons
        $('.auto-generate-tags-bar .button-sml').on('click', function() {
            $('.button-sml').removeClass('_is-checked');
            $(this).addClass('_is-checked');
        });

    }

    function updateCloseupState(scrollpos) {
        var cst;
        var el = $('.icon-button.back');
        $('.closeup.scroll-area').on('scroll', function() {
            cst = $(this).scrollTop();

            if (cst > scrollpos) {
                el.addClass('_active');
            } else {
                el.removeClass('_active');
            }
        });
    }

    function backButton() {
        var gst;
        var el = $('.icon-button.back');



        $('.pingrid.scroll-area').on('scroll', function() {
            gst = $(this).scrollTop();

            if (gst > 15) {
                el.addClass('_active');
            } else {
                el.removeClass('_active');
            }
        });
    }

    function bodyMovin() {
        var pinCount = 15;
        var anim = [];
        for (var i = 0; i < pinCount; i++) {
            anim[i + 1] = lottie.loadAnimation({
                container: document.getElementById('star-' + [i + 1]),
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: 'assets/animation/star/data.json'
            });
        }

        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        $.each(arr, function(index, value) {
            $('.star-' + value).on('click', function() {
                if ($('.star-' + value).hasClass('_active')) {
                    $('.star-' + value).removeClass('_active');
                    anim[value].goToAndStop(0, true);
                } else {
                    $('.star-' + value).addClass('_active');
                    anim[value].play();
                }
            });
        });



    };

    function organicTagsGrid() {

        var input = $('.composer input');
        var newTag;
        $('.new-tag').on('click', function() {
            $('body').addClass('_keyboard-is-on');
            input.val('');
            setTimeout(function() {
                input.focus();
            }, 450);
        });
        $('#confirm-tag').on('click', function() {
            $('body').removeClass('_keyboard-is-on');
            newTag = input.val();
            var newFilterBtn =  '<div data-filter=".' + newTag + '" class="button-sml multiple">' + newTag + '</div>';
            var newTagUI = '<div data-tag="' + newTag + '" class="usg-tag button-sml">' + newTag + '</div>';

            // add new ui to filter bar on grid
            $('.usg-tag-bar').append(newFilterBtn);

            // add new ui to label it module on closeup
            $('.new-tag').before(newTagUI);

        });
        var $gridFour = $('.masonry-layout').isotope({
            itemSelector: '.item',
            masonry: {
                columnWidth: 176,
                gutter: 8,
                horizontalOrder: true,
                fitWidth: true,
                originLeft: true
            }
        });
        // layout the grid
        $gridFour.imagesLoaded().progress(function() {
            $gridFour.isotope('layout');
        });
        // click event
        $('.usg-tags-wrap').on('click', '.usg-tag',function() {
            // which tag
            var curTag = $(this).data('tag');

            // which pin
            var curPin = $(this).parent().data('closeup-id');

            // update state
            if ($(this).hasClass('_active')) {
                $(this).removeClass('_active');
                // remove class to Pin
                $('#pin-' + curPin).removeClass(curTag);
            } else {
                $(this).addClass('_active');
                // add class to Pin
                $('#pin-' + curPin).addClass(curTag);
            }




        });
        var isotope = $gridFour.data('isotope');
        // filtering on grid
        $('.usg-tag-bar').on('click', '.button-sml', function() {
            $('.usg-tag-bar .button-sml').removeClass('_is-checked');
            $(this).addClass('_is-checked');
            var filterValue = $(this).attr('data-filter');
            $gridFour.isotope({
                filter: filterValue
            });

            // show empty state if pin count is 0
            if (isotope.filteredItems.length == 0) {
                $('.empty-state').removeClass('_hidden');
            } else {
                $('.empty-state').addClass('_hidden');
            }
        });



    }

    function states() {

        var currentCloseupID;
        $('.item').on('click', function() {

            // get id
            currentCloseupID = $(this).data('closeup-id');

            //  switch state
            $('body').addClass('_closeup-is-on');
            $('.closeup.scroll-area').scrollTop(0);
            // show the right module
            $('.main-card-wrapper').addClass('_hidden');
            $('.reaction-card-wrapper').addClass('_hidden');
            $('.cu-' + currentCloseupID).removeClass('_hidden');
            var imgHeight = $('.cu-' + currentCloseupID).find('img').height();
            // console.log(imgHeight);
            // run backbutton function

            updateCloseupState(imgHeight);
        });

        $('.pin-img-wrapper .star').click(function(e) {
            e.stopPropagation();
        });


        $('.icon-button.back').on('click', function() {
            $('body').removeClass('_closeup-is-on');
            $('body').removeClass('_keyboard-is-on');
        })
    }

    function reactions() {

    }

    function modal() {
        // filter sheet
        $('.show-sheet').on('click', function() {
            $('body').addClass('_sheet-is-on');
        });

        $('.close-sheet').on('click', function() {
            $('body').removeClass('_sheet-is-on');
        });

        $('.overlay').on('click', function() {
            $('body').removeClass('_sheet-is-on');
            $('body').removeClass('_keyboard-is-on');
        });


    }

    function likeThisGrid() {
        var $likeThisGrid = $('.more-like-this-grid').isotope({
            itemSelector: '.disco-pin',
            masonry: {
                columnWidth: 176,
                gutter: 8,
                horizontalOrder: true,
                fitWidth: true,
                originLeft: true
            }
        });

        $likeThisGrid.imagesLoaded().progress(function() {
            $likeThisGrid.isotope('layout');
        });
    }

    function filter() {

        var $grid = $('.masonry-layout').isotope({
            itemSelector: '.item',
            masonry: {
                columnWidth: 176,
                gutter: 8,
                horizontalOrder: true,
                fitWidth: true,
                originLeft: true
            }
        });

        function renderGrid() {
            $grid.imagesLoaded().progress(function() {
                $grid.isotope('layout');
            });
        }

        function updateCount() {
            var num = $('.item:not(._hidden)').length;
            // console.log(num);
            $('.pin-count span.num').html(num + ' ');

        }
        renderGrid();

        $('.filter-sheet li').on('click', function() {
            $('.filter-sheet li').removeClass('_active');
            $(this).addClass('_active');
        });


        // show all pins
        $('.show-all-pins').on('click', function() {
            $('.item').removeClass('_hidden');
            renderGrid();
            $('body').removeClass('_sheet-is-on');
            updateCount();
            $('span.pin-type').addClass('_hidden');
            $('.empty-state').addClass('_hidden');
            $('.show-sheet').removeClass('_active');
            $('.show-sheet').text('Filter');
        });

        // show stars only
        $('.show-stars-only').on('click', function() {
            $('.show-sheet').addClass('_active');
            $('.show-sheet').text('Filter(1)');
            $('.item').addClass('_hidden');
            $('.star._active').parent().parent().removeClass('_hidden');
            renderGrid();
            $('body').removeClass('_sheet-is-on');
            updateCount();
            $('span.pin-type').removeClass('_hidden');
            if ($('.item:not(._hidden)').length == 0) {
                $('.empty-state').removeClass('_hidden');
            }
        });
    }



    return {
        states: states,
        modal: modal,
        filter: filter,
        autoTags: autoTags,
        reactionGrid: reactionGrid,
        backButton: backButton,
        bodyMovin: bodyMovin,
        reactionAnimation: reactionAnimation,
        likeThisGrid: likeThisGrid,
        organicTagsGrid: organicTagsGrid
    }
})();