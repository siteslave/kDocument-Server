'use strict';

let fs = require('fs');
let path = require('path');
let Q = require('q');
let Finder = require('fs-finder');

module.exports = {
  getFileList(hn, type, dateServ, serial) {
    let q = Q.defer();
    let rootPath = './public/documents';
    let documentFolder = './documents';
    let paths = {};
    let filesPath = {};

    paths.chart = path.join(rootPath, hn, type, String(dateServ), String(serial), 'chart');
    paths.xray = path.join(rootPath, hn, type, String(dateServ), String(serial), 'xray');
    paths.ekg = path.join(rootPath, hn, type, String(dateServ), String(serial), 'ekg');
    paths.lab = path.join(rootPath, hn, type, String(dateServ), String(serial), 'lab');
    paths.other = path.join(rootPath, hn, type, String(dateServ), String(serial), 'other');

    filesPath.chart = path.join(documentFolder, hn, type, String(dateServ), String(serial), 'chart');
    filesPath.xray = path.join(documentFolder, hn, type, String(dateServ), String(serial), 'xray');
    filesPath.ekg = path.join(documentFolder, hn, type, String(dateServ), String(serial), 'ekg');
    filesPath.lab = path.join(documentFolder, hn, type, String(dateServ), String(serial), 'lab');
    filesPath.other = path.join(documentFolder, hn, type, String(dateServ), String(serial), 'other');

    let data = {};
    let files = [];

    files.chart = Finder.from(paths.chart).findFiles('*.pdf');
    files.xray = Finder.from(paths.xray).findFiles('*.pdf');
    files.ekg = Finder.from(paths.ekg).findFiles('*.pdf');
    files.lab = Finder.from(paths.lab).findFiles('*.pdf');
    files.other = Finder.from(paths.other).findFiles('*.pdf');

    let _files = {};
    _files.chart = [];
    _files.xray = [];
    _files.ekg = [];
    _files.lab = [];
    _files.other = [];

    files.chart.forEach((v) => {
      _files.chart.push(path.basename(v))
    });

    files.xray.forEach((v) => {
      _files.xray.push(path.basename(v))
    });

    files.ekg.forEach((v) => {
      _files.ekg.push(path.basename(v))
    });

    files.lab.forEach((v) => {
      _files.lab.push(path.basename(v))
    });

    files.other.forEach((v) => {
      _files.other.push(path.basename(v))
    });

    data.files = _files;
    data.urlPath = filesPath;

    return data;
  }
}