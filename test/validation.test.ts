import { expect, describe, test } from "@jest/globals";
import { FluentValidation } from "../src/fluentValidation";

const valueStr = "Test";
const valueNumber = 10;

describe("Test Suite for Validation Builder in Case Success", () => {
  test("#for: should return a Validation intence", () => {
    const field = valueStr;
    const result = FluentValidation.for(field);
    const expected = new FluentValidation(field);
    expect(result).toStrictEqual(expected);
  });

  test("#length: should contain the exact size of the field", () => {
    const result = FluentValidation.for(valueStr).length(4).build();
    expect(result).toStrictEqual([]);
  });

  test("#length: should return error when field is not the expected size", () => {
    const result = FluentValidation.for(valueStr).length(2).build();
    expect(result).toStrictEqual([
      { message: 'Campo deve conter "2" caracteres' },
    ]);
  });

  test("#required: the field should have content", () => {
    const result = FluentValidation.for(valueStr).required().build();
    expect(result).toStrictEqual([]);
  });

  test("#required: should return error when field is not exist", () => {
    const result = FluentValidation.for().required().build();
    const expected = [{ message: "Campo obrigatório" }];
    expect(result).toStrictEqual(expected);
  });

  test("#min: value must be equal to or greater than passed value", () => {
    const result = FluentValidation.for(valueNumber).min(5).build();
    const expected = [];
    expect(result).toStrictEqual(expected);
  });

  test("#min: should return error when value is smaller than passed value", () => {
    const result = FluentValidation.for(valueNumber).min(15).build();
    const expected = [{ message: "O valor mínimo é 15" }];
    expect(result).toStrictEqual(expected);
  });

  test("#max: value must be equal to or greater than the value passed", () => {
    const result = FluentValidation.for(valueNumber).max(15).build();
    const expected = [];
    expect(result).toStrictEqual(expected);
  });

  test("#max: should return an error when the value is greater than the value passed", () => {
    const result = FluentValidation.for(valueNumber).max(5).build();
    const expected = [{ message: "O valor máximo é 5" }];
    expect(result).toStrictEqual(expected);
  });

  test("#min_max: the value must be between the passed value", () => {
    const result = FluentValidation.for(valueNumber).min(5).max(15).build();
    const expected = [];
    expect(result).toStrictEqual(expected);
  });

  test("#min_max: should return error when the value is not between the lowest and highest value passed", () => {
    const result = FluentValidation.for(valueNumber).min(15).max(20).build();
    const expected = [{ message: "O valor deve estar entre 15 e 20" }];
    expect(result).toStrictEqual(expected);
  });

  test("#minLength: the number of characters must be equal to or greater than the value passed", () => {
    const result = FluentValidation.for(valueStr).minLength(3).build();
    const expected = [];
    expect(result).toStrictEqual(expected);
  });

  test("#minLength: the number of characters must be equal to or greater than the value passed", () => {
    const result = FluentValidation.for(valueStr).minLength(5).build();
    const expected = [{ message: "O valor mínimo é 5" }];
    expect(result).toStrictEqual(expected);
  });

  test("#maxLength: should return an error when the number of characters is less than the value passed", () => {
    const result = FluentValidation.for(valueStr).maxLength(5).build();
    const expected = [];
    expect(result).toStrictEqual(expected);
  });

  test("#maxLength: number of characters must be equal to or greater than the value passed", () => {
    const result = FluentValidation.for(valueStr).maxLength(3).build();
    const expected = [{ message: "O valor máximo é 3" }];
    expect(result).toStrictEqual(expected);
  });

  test("#minLength_maxLength: the number of characters must be between the value passed", () => {
    const result = FluentValidation.for(valueStr)
      .minLength(3)
      .maxLength(5)
      .build();
    const expected = [];
    expect(result).toStrictEqual(expected);
  });

  test("#minLength_maxLength: should return an error when the number of characters is not between the lowest and highest value passed", () => {
    const result = FluentValidation.for(valueStr)
      .minLength(5)
      .maxLength(10)
      .build();
    console.log(result);
    const expected = [{ message: "O valor deve estar entre 5 e 10" }];
    expect(result).toStrictEqual(expected);
  });
});
