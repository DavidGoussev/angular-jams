(function() {
    function AlbumCtrl(Fixtures, SongPlayer) {
        this.albumData = Fixtures.getAlbum();
        this.SongPlayer = SongPlayer;
    }
    
    angular
        .module('angularJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
    
})();