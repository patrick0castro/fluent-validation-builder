import { FluentValidation } from "./fluentValidation";

const result = FluentValidation.for('te').maxLength(3).minLength(2).build();

console.log(result);
