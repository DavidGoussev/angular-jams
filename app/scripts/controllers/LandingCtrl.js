(function() {
    function LandingCtrl() {
        this.heroTitle = "Turn the Music WAY UP!";
    }
    
    angular
        .module('angularJams')
        .controller('LandingCtrl', LandingCtrl);
})();