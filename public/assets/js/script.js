//////////////////////////////////////////////////////////////////////////////////////////
// Init function PushState
//////////////////////////////////////////////////////////////////////////////////////////

var call = {

    firstInit: function() {
        // run everywhere
        Global.reveal();
        Global.headroom();
        Global.scrollMeta();

    },
    init: function() {
        // getting location path
        var sPath = window.location.pathname;

        // run on specific page


    }
}

// call this when the page first load when page load
call.firstInit();
call.init();
