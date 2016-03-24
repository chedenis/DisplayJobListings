var appName = "jobsearch";
angular.module(appName)
    .controller("jobSearch.controller", ["$scope", "$uibModal", "jobFactory", "jobService", "adminService", "gaqService",
        function ($scope, $uibModal, jobFactory, jobService, adminService, gaqService) {           
            jobFactory.setStart("0");
            jobFactory.setLimit("20");
          
            $scope.jobsOnly;
            $scope.JobTitle;
            $scope.ZipCode;
            $scope.admins;
            $scope.aNewGaq;

           
           
           $scope.createNewGaq = function(theNewGaq){
               console.log("got here again");
               console.log(theNewGaq);
               gaqService.create({
                   value: theNewGaq 
                });
           }
           
           gaqService.get(function(data){
                 var _gaq = _gaq || [];
                _gaq.push(['_setAccount', data.value]);
                _gaq.push(['_trackPageview']);

                (function() {
                    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
                })();
                
            })           
           
           
           $scope.adminDataLookup = function(anAdmin){
               adminService.login(anAdmin, function(response){
                 $scope.admins = response;      
               })
           }
           
            $scope.jobsSearch = function(start, limit){
                jobFactory.setStart(start);
                jobFactory.setLimit(limit);
                jobFactory.setLocation($scope.ZipCode);
                jobFactory.setJobTitle($scope.JobTitle);
                $scope.jobs = jobService.list(
                    function(){
                        $scope.jobsOnly = $scope.jobs.response.results[0].result;
                    }
                );
            }
            
              $scope.adminLogin = function adminLogin() {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '../loginModal.html',
                    controller: 'loginModal.controller',
                    size: 'sm'
                });

                modalInstance.result.then(function (adminUser) {
                    if (adminUser) {
                        $scope.admins = $scope.adminDataLookup(adminUser);
                    }else {
                        $scope.admins = undefined;
                    }
                });

            };
        }])
        
  