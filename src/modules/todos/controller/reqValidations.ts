import { Validator } from "jsonschema";

const validator = new Validator();

export const validateCreateNewTodoRequest = (body) => {
  return validator.validate(body, {
    type: "object",
    properties: {
      content: {
        type: "string",
      },
    },
    required: ["content"],
  });
};

export const validateUpdateToDoRequest = (body) => {
  return validator.validate(body, {
    type: "object",
    properties: {
      content: {
        type: "string",
      },
      todoId: {
        type: "string",
      },
    },
    required: ["content", "todoId"],
  });
};

export const validateDeleteToDoRequest = (body) => {
  return validator.validate(body, {
    type: "object",
    properties: {
      todoId: {
        type: "string",
      },
    },
    required: ["todoId"],
  });
};
