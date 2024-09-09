sap.ui.define([], function () {
    "use strict";
    
    return {
        status: function (sta) {
           var star=parseInt(sta)
           let val=star>=19?"Minor":"Adult";
           return val;
        }
    };
});
