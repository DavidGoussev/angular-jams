(function () {
    function timecode() {
        return function(seconds) {
            var seconds = Number.parseFloat(seconds);
            
            if (Number.isNaN(seconds)) {
                return '';
            }
            
            //refactor timecode to use Buzz's built-in toTimer method
            var output = buzz.toTimer(seconds);
            // add 'true' as 2nd argument to view timer data as 00:00:00 long
            
            return output;
        };
    }
    
    angular
        .module('angularJams')
        .filter('timecode', timecode);
    
})();