describe('myCollections', function() {
  var $scope, $rootScope, $stateParams, myCollectionsController, $httpBackend, collectionFactory, userManagement;

  beforeEach(module('curates'));

  beforeEach(inject(function($injector) {

    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $stateParams = $injector.get('$stateParams');
    collectionFactory = $injector.get('collectionFactory');
    userManagement = $injector.get('userManagement');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');
    userManagement.user = {id: 1234, provider: 'github'};

    createController = function() {
      return $controller('myCollectionsController', {
        $scope: $scope,
        collectionFactory: collectionFactory,
        userManagement: userManagement,
        $stateParams: $stateParams
      });
    };
  }));

  it('should have a collection property on the $scope', function() {
    createController();
    expect($scope.collections).to.be.an('array');
  });

  it('should call collectionFactory.getUserCollections() and set $scope.collections to users collections', function() {
    var mockCollection = { links:[], title: 'Mock Collection', description: 'Mock description', user: {id: 1234, provider: 'github'}};
    $httpBackend.expectGET("/api/user/github/1234").respond(mockCollection);
    createController();
    $httpBackend.flush();
    expect($scope.collections).to.eql(mockCollection);
  });


});