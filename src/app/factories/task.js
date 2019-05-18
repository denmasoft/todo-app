(function() {
    'use strict';

    function tasksLoader($q, $task) {
        return function() {
            var _tasks = $task.findAll();
            return $q.all([_tasks]).then(function(results) {
                return {
                    _tasks: results[0]
                };
            });
        };
    };
    angular.module('todoApp').factory('tasksLoader', tasksLoader);
    tasksLoader.$inject = ['$q', '$task'];
})();