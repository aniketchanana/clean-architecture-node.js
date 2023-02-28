import { Validator } from "jsonschema";

const validator = new Validator();

export const validateSignUpRequest = (body) => {
  return validator.validate(body, {
    type: "object",
    properties: {
      userDetails: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          emailId: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
          },
        },
        required: ["name", "emailId", "password"],
      },
    },
    required: ["userDetails"],
  });
};

export const validateSignInRequest = (body) => {
  return validator.validate(body, {
    type: "object",
    properties: {
      emailId: {
        type: "string",
        format: "email",
      },
      password: {
        type: "string",
      },
    },
    required: ["emailId", "password"],
  });
};
