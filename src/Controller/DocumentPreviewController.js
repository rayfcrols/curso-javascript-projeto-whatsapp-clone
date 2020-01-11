const pdfjsLib = require('pdfjs-dist');
const path = require('path');

pdfjsLib.GlobalWorkerOptions.workerSrc = path.resolve(
  __dirname,
  '../../dist/pdf.worker.dundle.js'
);

export class DocumentPreviewController {
  constructor(file) {
    this._file = file;
  }

  getPreviewData() {
    return new Promise((s, f) => {
      let reader = new FileReader();
      switch (this._file.type) {
        case 'image/jpeg':
        case 'image/jpg':
        case 'image/bmp':
        case 'image/png':
        case 'image/gif':
          reader.onload = (e) => {
            s({
              src: reader.result,
              info: this._file.name
            });
          };
          reader.onerror = (e) => {
            f(e);
          };
          reader.readAsDataURL(this._file);
          break;
        case 'video/mp4':
        case 'video/x-msvideo':
        case 'video/mpeg':
        case 'video/ogg':
        case 'video/3gpp':
          console.log('video');
          break;
        case 'application/pdf':
        case 'application/x-pkcs12':
          reader.onload = (e) => {
            pdfjsLib
              .getDocument(new Uint8Array(reader.result))
              .then((pdf) => {
                pdf
                  .getPage(1)
                  .then((page) => {
                    console.log('page', page);
                    let viewport = page.getViewport(1);
                    let canvas = document.createElement('canvas');
                    let context = canvas.getContext('2d');
                  })
                  .catch((err) => {
                    f(err);
                  });
              })
              .catch((err) => {
                f(err);
              });
          };
          reader.readAsArrayBuffer(this._file);
          break;
        case 'audio/ogg':
        case 'audio/mp3':
        case 'audio/mpeg':
        case 'audio/x-wav':
          console.log('audio');
          break;
        default:
          f();
      }
    });
  }
}
