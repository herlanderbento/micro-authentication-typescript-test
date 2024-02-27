import { StatusCodes } from "http-status-codes";
import { AppError } from "~/_shared/domain";

export class UserPasswordMatchError extends AppError {
  constructor(message?: string) {
    super({
      name: "UserPasswordMatchError",
      message: message ?? "Password should be different from old password!",
      statusCode: StatusCodes.CONFLICT,
    });
  }
}


// export enum PasswordErrorType {
//   SameAsOld = "1",
//   NotMatching = "2",
// }

// export class UserPasswordMatchError extends AppError {
//   constructor(errorType: PasswordErrorType, customMessage?: string) {
//     let errorMessage: string;

//     switch (errorType) {
//       case PasswordErrorType.SameAsOld:
//         errorMessage =
//           customMessage ||
//           "Password should be different from the old password.";
//         break;
//       case PasswordErrorType.NotMatching:
//       default:
//         errorMessage = customMessage || "Password does not match.";
//         break;
//     }

//     super({
//       name: "UserPasswordMatchError",
//       message: errorMessage,
//       statusCode: StatusCodes.CONFLICT,
//     });
//   }
// }
