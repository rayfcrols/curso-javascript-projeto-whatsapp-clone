class Format {
  static getCamelCase(text) {
    let div = document.createElement('div');

    div.innerHTML = `<div data-${text}='id'></div>`;

    return Object.keys(div.firstChild.dataset)[0];
  }

  static toTime(duration) {
    const seconds = parseInt((duration / 1000) % 60, 10);
    const minutes = parseInt((duration / (1000 * 60)) % 60, 10);
    const hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);

    if (hours > 0) {
      return `${hours} horas, ${minutes} minutos e ${seconds} segundos`;
    }
    if (minutes > 0) {
      return `${minutes} minutos e ${seconds} segundos`;
    }
    if (seconds > 0) {
      return `${seconds} segundos`;
    }
    return '';
  }
}
