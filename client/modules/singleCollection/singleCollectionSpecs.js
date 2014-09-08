describe('singleCollectionController', function() {
  var $scope, $rootScope, $location, $state, $stateParams, singleCollectionController, $httpBackend, collectionFactory, userManagement;

  beforeEach(module('curates'));

  beforeEach(inject(function($injector) {
    
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $state = $injector.get('$state');
    $stateParams = $injector.get('$stateParams');
    collectionFactory = $injector.get('collectionFactory');
    userManagement = $injector.get('userManagement');
    $scope = $rootScope.$new();

    $stateParams.url = 'anewcollection';
    $state.url = $stateParams.url;
    userManagement.user.id = 1234;
    userManagement.user.provider = 'github';

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('singleCollectionController', {
        $scope: $scope,
        collectionFactory: collectionFactory,
        userManagement: userManagement,
        $state: $state,
        $stateParams: $stateParams
      });
    };
  }));

  it('should have a notYetUpvoted property on the $scope', function() {
    createController();
    expect($scope.notYetUpvoted).to.be.a('boolean');
  });

  it('should have a collection property on the $scope', function() {
    createController();
    expect($scope.collection).to.be.an('object');
  });

  it('should have a isUser property on the $scope', function() {
    createController();
    expect($scope.isUser).to.be.an('boolean');
  });

  it('should have an upVote method on the $scope', function() {
    createController();
    expect($scope.upVote).to.be.an('function');
  });

  it('should have a clone method on the $scope', function() {
    createController();
    expect($scope.clone).to.be.an('function');
  });

  it('should call collectionFactory.getCollection() and set isUser to true', function() {
    var mockCollection = { user: {id: 1234, provider: 'github'} };
    $httpBackend.expectGET("/api/collection/anewcollection").respond(mockCollection);
    $httpBackend.expectGET("modules/collectionsList/collectionsList.html").respond(200, '');
    createController();
    $httpBackend.flush();
    expect($scope.isUser).to.eql(true);
    expect($scope.collection).to.eql(mockCollection);
  });

  it('should call collectionFactory.getCollection() and set isUser to false when user.id does not match', function() {
    var mockCollection = { user: {id: 1, provider: 'github'} };
    $httpBackend.expectGET("/api/collection/anewcollection").respond(mockCollection);
    $httpBackend.expectGET("modules/collectionsList/collectionsList.html").respond(200, '');
    createController();
    $httpBackend.flush();
    expect($scope.isUser).to.eql(false);
    expect($scope.collection).to.eql(mockCollection);
  });

  it('should call collectionFactory.getCollection() and set isUser to false when provider does not match', function() {
    var mockCollection = { user: {id: 1234, provider: 'facebook'} };
    $httpBackend.expectGET("/api/collection/anewcollection").respond(mockCollection);
    $httpBackend.expectGET("modules/collectionsList/collectionsList.html").respond(200, '');
    createController();
    $httpBackend.flush();
    expect($scope.isUser).to.eql(false);
    expect($scope.collection).to.eql(mockCollection);
  });

  it('should call collectionFactory.getCollection(), then upVote successfully', function() {
    var mockCollection = { user: {id: 1234, provider: 'github'}, stars: 0 };
    $httpBackend.expectGET("/api/collection/anewcollection").respond(mockCollection);
    $httpBackend.expectGET("modules/collectionsList/collectionsList.html").respond(200, '');
    createController();
    $httpBackend.flush();
    $scope.upVote();
    expect($scope.notYetUpvoted).to.eql(false);
    expect($scope.collection.stars).to.eql(1);
  });

});