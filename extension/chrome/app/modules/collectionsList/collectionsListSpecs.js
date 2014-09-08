describe('ShortenController', function() {
  var $scope, $rootScope, $location, collectionsListController, $httpBackend, collectionFactory;

  beforeEach(module('curates'));
  beforeEach(inject(function($injector) {
    
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    collectionFactory = $injector.get('collectionFactory');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('collectionsListController', {
        $scope: $scope,
        collectionFactory: collectionFactory
      });
    };
  }));

  it('should have a listData property on the $scope', function() {
    createController();
    expect($scope.listData).to.be.an('array');
  });

  it('should have a predicate property on the $scope', function() {
    createController();
    expect($scope.predicate).to.be.a('string');
  });

  it('should call collectionFactory.getListData() when controller is loaded', function() {
    var mockCollections = [{},{},{}];
    $httpBackend.expectGET("/api/all").respond(mockCollections);
    createController();
    $httpBackend.flush();
    expect($scope.listData).to.eql(mockCollections);
  });

});