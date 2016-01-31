(function() {
    function AlbumCtrl(Fixtures) {
        this.albumData = Fixtures.getAlbum();
    }
    
    angular
        .module('angularJams')
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
    
})();