(function() {
    'use strict';

    function tasks($http, $q) {
        var tasksDefer;
        /**
         * Fetch tasks on server or from promise
         * @returns {promise}
         */
        function fetch() {
            if (!tasksDefer) {
                tasksDefer = $q.defer();
                $http.get("./tasks.json") // hardcoded url
                    .success(tasksLoadSuccess)
                    .error(tasksLoadError);
            }

            /**
             * Callback called when http request was successful
             * @param response
             */
            function tasksLoadSuccess(response) {
                var tasks = [];

                angular.forEach(response, function(value, key) {
                    tasks.push(new Task(value));
                });

                tasksDefer.resolve(tasks);
            }

            /**
             * Callback to be called when the http request failed
             * @param response
             */
            function tasksLoadError(response) {
                tasksDefer.reject('Could not load the tasks from the server');
            }

            return tasksDefer.promise;
        }

        /**
         * Find all tasks
         * @return {promise}
         */
        function findAll() {
            var findAllDefer = $q.defer();

            fetch().then(fetchSuccess, fetchFailure);

            /**
             * Callback called when fetching contacts was successful
             * @param tasks
             */
            function fetchSuccess(tasks) {
                findAllDefer.resolve(tasks);
            }

            /**
             * Callback called when fetching the contacts failed
             * @param reason
             */
            function fetchFailure(reason) {
                findAllDefer.reject('Could not find all tasks: ' + reason);
            }

            return findAllDefer.promise;
        }

        /**
         * Create new task on server
         * @return {promise}
         */
        function create(task, token) {
            var createDefer = $q.defer();

            if (!task instanceof Task) {
                createDefer.reject('Not a valid task');
            } else {

                $http({
                        method: 'POST',
                        url: "",//Routing.generate('task_task_new'),
                        data: $.extend({ _token: token }, task),
                        transformRequest: function(obj) {
                            var str = [];
                            for (var p in obj)
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    })
                    .success(taskCreateSuccess)
                    .error(taskCreateError);
            }


            function taskCreateSuccess(response) {
                tasksDefer = null;
                var task = new Task(response);
                createDefer.resolve(task);
            }

            function taskCreateError(errors) {
                createDefer.reject(errors);
            }

            return createDefer.promise;
        }

        /**
         * Update existing task on server
         * @return {promise}
         */
        function update(task, token) {
            var updateDefer = $q.defer();

            if (!task instanceof Task) {
                updateDefer.reject('Not a valid task');
            } else {

                $http({
                        method: 'POST',
                        url: ""/*Routing.generate('task_task_edit')*/,
                        data: $.extend({ _token: token }, task),
                        transformRequest: function(obj) {
                            var str = [];
                            for (var p in obj)
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    })
                    .success(taskUpdateSuccess)
                    .error(taskUpdateError);
            }

            function taskUpdateSuccess(response) {
                tasksDefer = null;
                var task = new Task(response);
                updateDefer.resolve(task);
            }

            function taskUpdateError(errors) {
                updateDefer.reject(errors);
            }

            return updateDefer.promise;
        }

        function deleteTask(task, token) {
            var deleteDefer = $q.defer();

            if (!task instanceof Task) {
                deleteDefer.reject('Not a valid task');
            } else {

                $http({
                        method: 'POST',
                        url: ""/*Routing.generate('task_task_remove')*/,
                        data: $.extend({ _token: token }, task),
                        transformRequest: function(obj) {
                            var str = [];
                            for (var p in obj)
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    })
                    .success(taskDeleteSuccess)
                    .error(taskDeleteError);
            }

            function taskDeleteSuccess() {
                tasksDefer = null;
                deleteDefer.resolve();
            }

            function taskDeleteError(errors) {
                deleteDefer.reject(errors);
            }

            return deleteDefer.promise;
        }

        return {
            findAll: findAll,
            create: create,
            update: update,
            deleteTask: deleteTask
        };
    };
    angular.module('todoApp').service('$task', tasks);
    tasks.$inject = ['$http', '$q'];
})();