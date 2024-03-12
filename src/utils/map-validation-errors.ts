import { ValidationError } from 'class-validator';

export const mapAndJoinClassValidatorErrors = (errors: ValidationError[]) => {
  // Helper function to recursively find and extract constraint messages
  function findConstraints(error) {
    // Base case: if the error has a 'constraints' property, return its values
    if (error.constraints) {
      return Object.values(error.constraints);
    }
    // If the error has children, recursively find constraints within them
    if (error.children && error.children.length) {
      return error.children.flatMap(findConstraints);
    }
    // If no constraints or children are found, return an empty array
    return [];
  }

  // Map each error to its constraint messages, then flatten the result
  const allConstraintMessages = errors.flatMap(findConstraints);

  // Join all constraint messages into a single string
  return allConstraintMessages.join('; ');
};
