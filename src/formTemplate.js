export function exportFormTemplate(formFields) {
  // Map over each field and create an HTML snippet based on its type
  const htmlFields = formFields.map(field => {
    switch(field.type) {
      case 'textbox':
        return `<div class="form-group">
  <label>${field.label}</label>
  <input type="text" placeholder="${field.placeholder || ''}" class="form-control" />
</div>`;
      case 'email':
        return `<div class="form-group">
  <label>${field.label}</label>
  <input type="email" placeholder="${field.placeholder || ''}" class="form-control" />
</div>`;
      case 'number':
        return `<div class="form-group">
  <label>${field.label}</label>
  <input type="number" placeholder="${field.placeholder || ''}" class="form-control" />
</div>`;
      case 'date':
        return `<div class="form-group">
  <label>${field.label}</label>
  <input type="date" class="form-control" />
</div>`;
      case 'button':
        // Use buttonType if provided; otherwise default to 'button'
        return `<div class="form-group text-center">
  <button type="${field.buttonType || 'button'}" class="btn btn-primary">${field.label}</button>
</div>`;
      default:
        return '';
    }
  }).join('\n');

  // Wrap the generated fields in a <form> element
  const htmlTemplate = `<form>\n${htmlFields}\n</form>`;
  return htmlTemplate;
}
