angular.module('app.controllers.Files', [
  'app.service.Preview', 'app.services.Document', 'app.services.File'
])
  .controller('FilesCtrl', function ($scope, $window, $mdDialog, $mdToast,
                                     PreviewService, DocumentService, FileService) {

    $scope.patient = {};
    $scope.data = {};
    $scope.isPreview = false;

    $scope.getOPDService = function (hn) {
      PreviewService.getOPDService(hn)
        .then(function (rows) {
          $scope.opdServices = rows;
        }, function (err) {
          console.log('Error: ' + err);
        })
    };

    $scope.getIPDService = function (hn) {
      PreviewService.getIPDService(hn)
        .then(function (rows) {
          $scope.ipdServices = rows;
        }, function (err) {
          console.log('Error: ' + err);
        })
    };

    $scope.getDocument = function (type, dateServ, serial) {
      var hn = $scope.query;

      DocumentService.getFileList(hn, type, dateServ, serial)
        .then(function (data) {
          $scope.data.files = data.files;
          $scope.data.path = data.urlPath;

        }, function (err) {
          console.log(err);
        });
    };

    // search
    $scope.doSearch = function () {
      if ($scope.query) {
        PreviewService.getPatientInfo($scope.query)
          .then(function (patient) {
            $scope.patient.hn = patient.hn;
            $scope.patient.fullname = patient.fullname;

            $scope.getOPDService(patient.hn);
            $scope.getIPDService(patient.hn);

          }, function (err) {
            console.log(err);
          });

      } else {
        $mdToast.show(
          $mdToast.simple()
            .textContent('กรุณาระบุ HN ที่ต้องการค้นหา')
            .position('right bottom')
            .hideDelay(3000)
        );
      }
    };

    // view file
    $scope.preview = function (ev, type, file) {

      var filePath = null;

      if (type == 'chart') {
        filePath = '../' + $scope.data.path.chart + '/' + file;
      } else if (type == 'xray') {
        filePath = '../' + $scope.data.path.xray + '/' + file;
      }  else if (type == 'ekg') {
        filePath = '../' + $scope.data.path.ekg + '/' + file;
      } else if (type == 'lab') {
        filePath = '../' + $scope.data.path.lab + '/' + file;
      } else {
        filePath = '../' + $scope.data.path.other + '/' + file;
      }

      $window.open(filePath, "_blank")
    };

    // view file
    $scope.remove = function (ev, type, file) {

      var confirm = $mdDialog.confirm()
        .title('Are you sure?')
        .textContent('คุณต้องการจะลบไฟล์นี้ ใช่หรือหม่')
        .ariaLabel('Remove file')
        .targetEvent(ev)
        .ok('ใช่')
        .cancel('ไม่ใช่');
      $mdDialog.show(confirm).then(function() {
        var filePath = null;
        var idx = null;

        if (type == 'chart') {
          filePath = $scope.data.path.chart + '/' + file;
        } else if (type == 'xray') {
          filePath = $scope.data.path.xray + '/' + file;
        }  else if (type == 'ekg') {
          filePath = $scope.data.path.ekg + '/' + file;
        } else if (type == 'lab') {
          filePath = $scope.data.path.lab + '/' + file;
        } else {
          filePath = $scope.data.path.other + '/' + file;
        }

        FileService.remove(filePath)
          .then(function () {
            // success

            if (type == 'chart') {
              idx = $scope.data.files.chart.indexOf(file);
              $scope.data.files.chart.splice(idx, 1);
            } else if (type == 'xray') {
              idx = $scope.data.files.xray.indexOf(file);
              $scope.data.files.xray.splice(idx, 1);
            }  else if (type == 'ekg') {
              idx = $scope.data.files.ekg.indexOf(file);
              $scope.data.files.ekg.splice(idx, 1);
            } else if (type == 'lab') {
              idx = $scope.data.files.lab.indexOf(file);
              $scope.data.files.lab.splice(idx, 1);
            } else {
              idx = $scope.data.files.other.indexOf(file);
              $scope.data.files.other.splice(idx, 1);
            };

            $mdToast.show(
              $mdToast.simple()
                .textContent('ลบไฟล์เสร็จเรียบร้อยแล้ว')
                .position('right bottom')
                .hideDelay(3000)
            );
          }, function (err) {
            $mdToast.show(
              $mdToast.simple()
                .textContent('ไม่สามารถลบไฟล์ได้ : ' + JSON.stringify(err))
                .position('right bottom')
                .hideDelay(3000)
            );
          })
      }, function() {

      });


    };

  });