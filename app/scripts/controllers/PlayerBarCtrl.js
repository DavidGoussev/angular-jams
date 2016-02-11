//inject $scope as dependency in first step of  rootscope removal refactor

(function () {
    function PlayerBarCtrl($scope, Fixtures, SongPlayer) {
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
        
        
//        onTimeUpdate function called in SongPlayer.Js instead of $rootscope.$apply
        this.songPlayer.onTimeUpdate = function(e) {
            SongPlayer.currentTime = this.getTime(); 
            $scope.$apply();
        };
        
        
//        destroys scope when page navigates off
        $scope.$on('$destroy', function() {
           SongPlayer.onTimeUpdate = null; 
        });
        
        
        this.songPlayer.onVolumeChange = function(e) {
            SongPlayer.volume = this.getVolume();
            $scope.$apply();
        };
        
        $scope.$on('$destroy', function () {
            SongPlayer.onVolumeChange = null;
        });
    }
    
    angular
        .module('angularJams')
        .controller('PlayerBarCtrl', ['$scope', 'Fixtures', 'SongPlayer', PlayerBarCtrl]);
})();