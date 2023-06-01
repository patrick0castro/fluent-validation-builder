import { CustonError } from "./custonError";
import { message } from "./constants";

export class FluentValidation {
  #required: boolean;
  #length?: number;
  #min: number = -1;
  #max: number = -1;
  #minLength: number = -1;
  #maxLength: number = -1;

  #field: any;
  #errors: CustonError[];

  constructor(field: any) {
    this.#required = false;
    this.#field = field;
    this.#errors = [];
  }

  static for(field?: any) {
    return new FluentValidation(field || "");
  }

  required() {
    this.#required = true;
    return this;
  }

  length(length: number) {
    this.#length = length;
    return this;
  }

  min(value: number) {
    this.#min = value;
    return this;
  }

  max(value: number) {
    this.#max = value;
    return this;
  }

  minLength(value: number) {
    this.#minLength = value;
    return this;
  }

  maxLength(value: number) {
    this.#maxLength = value;
    return this;
  }

  #performMinMax() {
    if (this.#min > -1 && this.#max > -1) {
      if (this.#field < this.#min || this.#field > this.#max) {
        this.#errors.push({
          message: `O valor deve estar entre ${this.#min} e ${this.#max}`,
        });
      }
    } else if (this.#min > -1 && this.#field < this.#min) {
      this.#errors.push({ message: `O valor mínimo é ${this.#min}` });
    } else if (this.#max > -1 && this.#field > this.#max) {
      this.#errors.push({ message: `O valor máximo é ${this.#max}` });
    }
  }

  #performMinLengthMaxLength() {
    if (this.#minLength > -1 && this.#maxLength > -1) {
      if (
        this.#field.length < this.#minLength ||
        this.#field.length > this.#maxLength
      ) {
        this.#errors.push({
          message: `O valor deve estar entre ${this.#minLength} e ${
            this.#maxLength
          }`,
        });
      }
    } else if (this.#minLength > -1 && this.#field.length < this.#minLength) {
      this.#errors.push({ message: `O valor mínimo é ${this.#minLength}` });
    } else if (this.#maxLength > -1 && this.#field.length > this.#maxLength) {
      this.#errors.push({ message: `O valor máximo é ${this.#maxLength}` });
    }
  }

  build() {
    if (this.#required && !this.#field) {
      this.#errors.push({ message: message.REQUIRED });
    }

    if (this.#length && this.#length !== this.#field.length) {
      this.#errors.push({
        message: `${message.LENGTH} "${this.#length}" caracteres`,
      });
    }

    this.#performMinLengthMaxLength();

    this.#performMinMax();

    return this.#errors;
  }
}
