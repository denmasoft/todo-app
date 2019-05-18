angular.module('todoApp').config(Config);
Config.$inject = ['$interpolateProvider', '$routeProvider', '$httpProvider', 'IdleProvider', 'KeepaliveProvider','$compileProvider'];
function Config($interpolateProvider, $routeProvider, $httpProvider,IdleProvider, KeepaliveProvider,$compileProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $interpolateProvider.startSymbol('{{');
        $interpolateProvider.endSymbol('}}');
        IdleProvider.idle(10);
        IdleProvider.timeout(10);
        KeepaliveProvider.interval(5);
        $routeProvider.
             when("/",
        {
            templateUrl: 'src/app/views/tasks/list.html',
            controller: "tasksListCtrl",
            resolve: {
                    tasksLoader: function(tasksLoader){
                        return tasksLoader();
                    }
                }
        });
        $compileProvider.debugInfoEnabled(false);
}