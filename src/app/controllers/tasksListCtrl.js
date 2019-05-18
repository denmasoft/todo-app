(function() {
    'use strict';
    function tasksListCtrl($scope, $task, tasksLoader, localStorageService) {

        $scope.tasksList = tasksLoader._tasks;
        
        $scope.localStorageTasks = function(){
            localStorageService.set('tasks', $scope.tasksList);
        }

        $scope.findAllTasks = function() {
            $scope.tasksLoaded = false;
            $scope.tasksList = [];

            function findAllTasksSuccess(tasks) {
                $scope.tasksList = tasks;
                $scope.tasksLoaded = true;
                $scope.localStorageTasks();
            }

            function findAllTasksFailure(reason) {
                $scope.tasksError = reason;
                $scope.tasksLoaded = true;
            }
            $task.findAll().then(findAllTasksSuccess, findAllTasksFailure);
        };
        $scope.addNewTask = function (newTask) {
            if (newTask && $scope.tasksList.indexOf(newTask) === -1) {
                $scope.tasksList.push({
                    taskName: newTask,
                    isDone: false
                });
                $scope.localStorageTasks();
            }
        };
        $scope.removeTask = function (index) {
            $scope.tasksList.splice(index, 1);
            $scope.isEditPanelVisible = false;
            $scope.localStorageTasks();
        };
        $scope.showEdit = function (taskIndex) {
            $scope.currentEditingTaskIndex = taskIndex;
            $scope.isEditPanelVisible = $scope.isEditPanelVisible || !$scope.isEditPanelVisible;
            $scope.currentEditingTaskText = $scope.tasksList[taskIndex].taskName;
        };
        $scope.editTask = function () {
            $scope.tasksList[$scope.currentEditingTaskIndex].taskName = $scope.currentEditingTaskText;
            $scope.isEditPanelVisible = false;
            $scope.localStorageTasks();
        };
    }
    angular.module('todoApp').controller('tasksListCtrl', tasksListCtrl); 
    tasksListCtrl.$inject = ['$scope', '$task', 'tasksLoader', 'localStorageService'];   
})();
