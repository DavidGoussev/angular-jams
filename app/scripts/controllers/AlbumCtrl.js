(function() {
    function AlbumCtrl() {
        this.albumData = angular.copy(albumPicasso);
    }
    
    angular
        .module('angularJams')
        .controller('AlbumCtrl', AlbumCtrl);
    
})();