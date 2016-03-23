    
   //changes ip
    var appName = "jobsearch";
        angular.module(appName)
        .service('adminService', [
            "$resource", "jobFactory", 
            function ($resource, jobFactory) {
               console.log("got to adminservice");
               //104.236.240.201
                return $resource("http://localhost:3000/admin", {},
                    {
                        login: { method: "POST", params: {}, isArray: true }
                    }
                );
        }]);