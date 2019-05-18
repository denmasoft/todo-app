function Task(data)
{
    if (!!data) {
        angular.extend(this, data);
    };
}