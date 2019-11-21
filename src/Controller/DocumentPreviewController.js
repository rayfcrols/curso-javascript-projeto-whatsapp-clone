export class DocumentPreviewController {
  constructor(file) {
    this._file = file;
  }

  getPreviewData() {
    return new Promise((s, f) => {
      switch (this._file.type) {
        case 'image/jpeg':
        case 'image/jpg':
        case 'image/bmp':
        case 'image/png':
        case 'image/gif':
          let reader = new FileReader();
          reader.onload = (e) => {
            s(reader.result);
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
          console.log('img');
          break;
        case 'application/pdf':
        case 'application/x-pkcs12':
          console.log('img');
          break;
        case 'audio/ogg':
        case 'audio/mp3':
        case 'audio/mpeg':
        case 'audio/x-wav':
          console.log('img');
          break;
        default:
          f();
      }
    });
  }
}
