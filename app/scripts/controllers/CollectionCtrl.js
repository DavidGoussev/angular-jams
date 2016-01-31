(function() {
    function CollectionCtrl(Fixtures) {
        this.albums = Fixtures.getCollection(12);
        
    }
    
    angular
        .module('angularJams')
        .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
    
})();