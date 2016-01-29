angular.module('app.directive.PDF', [])
  .directive('ngPdfObject', function () {
  return {
    replace: 'true',
    scope:{
      url : "@url",
      height: "@height",
      width: "@width"
    },
    template: '<div id="pdf"><div>',
    link: function (scope, elem, attrs) {
      console.log(scope.url);
      var find = '%2F';
      var re = new RegExp(find, 'g');

      var url = scope.url.replace(re, '/');
      new PDFObject({ url: url, height:scope.height }).embed("pdf");
    }
  };
});