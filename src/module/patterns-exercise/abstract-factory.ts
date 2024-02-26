interface TextInput {
  setValue(value: string): void;
}

interface PasswordInput {
  setValue(value: string): void;
}

interface Button {
  click(): void;
}

interface SubmitFormFactory {
  getEmailInput(): TextInput;
  getPasswordInput(): PasswordInput;
  getSubmitButton(): Button;
}

class HtmlTextInput implements TextInput {
  private value: string;

  setValue(value: string) {
    this.value = value;
  }
}

class HtmlPasswordInput implements PasswordInput {
  private value: string;

  setValue(value: string) {
    this.value = value;
  }
}

class HtmlButton implements Button {
  click() {
    console.log('HtmlButton click');
  }
}

class PdfTextInput implements TextInput {
  private value: string;

  setValue(value: string) {
    this.value = value;
  }
}

class PdfPasswordInput implements PasswordInput {
  private value: string;

  setValue(value: string) {
    this.value = value;
  }
}

class PdfButton implements Button {
  click() {
    console.log('PdfButton click');
  }
}

interface SubmitForm {
  submit(email: TextInput, password: PasswordInput, submitButton: Button): void;
}
