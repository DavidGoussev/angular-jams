(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};

        /**
        * @desc Current album object taken from Fixtures to obtain songs array for index
        * @type {Object}
        */ 
        var currentAlbum = Fixtures.getAlbum();
        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;


        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(song);
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                  SongPlayer.currentTime = currentBuzzObject.getTime();  
                });
            });
            
            currentBuzzObject.bind('volumechange', function() {
                $rootScope.$apply(function() {
                    SongPlayer.volume = currentBuzzObject.getVolume();
                });
            });

            SongPlayer.currentSong = song;
        };


        /**
        * @function playSong
        * @desc Plays current Buzz object and sets playing prop of song to true
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /**
        * @function SongPlayer.stop
        * @desc Private method stops currently playing song
        * @param {Object} song
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };
        
        /**
        * @function getSongIndex
        * @desc Obtain index of song from songs array
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
        * @desc Current song playing object, set to public attribute
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        
        /**
        * @desc Current playback time in seconds of currently playing song / current volume of song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        
        SongPlayer.volume = null;

        /**
        * @function SongPlayer.play
        * @desc Public method click handler creates Buzz object from song arg and calls own play method
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {

                setSong(song);
                playSong(song);

            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {

                    playSong(song);

                }
            }
        };
        

        /**
        * @function SongPlayer.pause
        * @desc Public method click handler pauses currently playing song
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        * @function SongPlayer.previous
        * @desc Public method click handler to access previous song via index from songs array
        * @param
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            var song = currentAlbum.songs[currentSongIndex];
            
            if (currentSongIndex < 0) {
                stopSong(song);
            } else {
                
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        * @function SongPlayer.next
        * @desc Public method click handler to access next song via index from songs array
        * @param
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            var song = currentAlbum.songs[currentSongIndex];
            
            if (currentSongIndex > currentAlbum.songs.length - 1) {
                stopSong(song);
            } else {
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
        };

        return SongPlayer;
    }

    angular
        .module('angularJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);

})();