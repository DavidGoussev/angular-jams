(function() {
    function seekBar($document) {
        /**
        * @function calculatePercent
        * @desc Determines percentage fill of seekBar from mouse event
        * @param {Object} seekBar, event
        */
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };

        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: { 
                onChange: '&'
            },
            link: function(scope, element, attributes) {
                scope.value = 0;
                scope.max = 100;

                var seekBar = $(element);
                
                attributes.$observe('value', function(newValue) {
                    scope.value = newValue;
                });
                
                attributes.$observe('max', function(newValue) {
                    scope.max = newValue;
                });

                /**
                * @function percentString
                * @desc Calculates percentage string for use in determiming fill & thumb position on DOM
                * @param
                */
                var percentString = function() {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                };

                /**
                * @function scope.fillStyle
                * @desc Creates visual fill on seekBar via css width of percentString
                * @param
                */
                scope.fillStyle = function() {
                    return {width: percentString()};
                };

                /**
                * @function scope.thumbStyle
                * @desc Creates thumb on seekBar set to immediate css left of fill
                * @param
                */
                
                scope.thumbStyle = function() {
                    return {left: percentString()};
                };

                /**
                * @function scope.onClickSeekBar
                * @desc click handler to determine position of fill on seekBar from click event
                * @param {Object} event
                */
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                    notifyOnChange(scope.value);
                };

                /**
                * @function scope.trackThumb
                * @desc Binds mouse events on thumb to $document
                * @param
                */
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                            notifyOnChange(scope.value);
                        });
                    });

                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
                
                
                /**
                * @function notifyOnChange
                * @desc Notifies onChange attribute that the scope.value has changed
                * @param {Object} newValue
                */
                var notifyOnChange = function(newValue) {
                    if (typeof scope.onChange === 'function') {
                        scope.onChange({value: newValue});
                    }
                };
            }
        };
    }

    angular
        .module('angularJams')
        .directive('seekBar', ['$document', seekBar]);
})();