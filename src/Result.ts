import { ResultError } from "@/common/domain/result/ResultError";

export class Result<T = void> {
  public readonly isSuccess: boolean;
  protected readonly _errors?: Array<ResultError>;
  protected readonly _value?: T;

  protected constructor(
    isSuccess: boolean,
    errors?: Array<ResultError>,
    value?: T
  ) {
    this.isSuccess = isSuccess;
    this._errors = errors;
    this._value = value!;
  }

  public get isFailure() {
    return !this.isSuccess;
  }

  public get errors(): Array<ResultError> {
    if (this.isSuccess) {
      throw new Error("The errors of a success result can not be accessed.");
    }

    return this._errors!;
  }

  public get value(): T {
    if (!this.isSuccess) {
      throw new Error("The value of a failure result can not be accessed.");
    }

    return this._value!;
  }

  public static failure<T = void>(...errors: Array<ResultError>): Result<T> {
    return new Result<T>(false, errors, undefined);
  }

  public static success<T = void>(value?: T): Result<T> {
    return new Result<T>(true, undefined, value);
  }
}
