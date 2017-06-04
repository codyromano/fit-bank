class TableRenderer {
  constructor({container, template}) {
    if (container && template) {
      Object.assign(this, {container, template});
    } else {
      throw new Error(`Container and template required`);
    }
  }

  getDynamicHTMLFromTemplate(vars = {}) {
    let html = this.template;
    for (const varName in vars) {
      const findVarName = new RegExp('{{' + varName + '}}', 'g');
      html = html.replace(findVarName, vars[varName]);
    }
    return html;
  }

  renderRows(rowData = []) {
    if (!Array.isArray(rowData) || !rowData.length) {
      return false;
    }

    let html = [];

    for (const dynamicVars of rowData) {
      html.push(
        this.getDynamicHTMLFromTemplate(dynamicVars)
      );
    }
    this.container.innerHTML = html.join('');
    return true;
  }
}