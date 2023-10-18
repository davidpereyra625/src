import { body } from "express-validator";

export const createMaterialesSchema = [
  body("codigo_materiales")
    .isNumeric()
    .withMessage("Debe ser Entero")
    .notEmpty()
    .withMessage("No debe ser vacio"),
  body("nombre_materiales")
    .isString()
    .withMessage("Debe ser string")
    .notEmpty()
    .withMessage("No debe ser vacio"),
];

export const editMaterialesSchema = [
  body("codigo_materiales")
    .optional()
    .isNumeric()
    .withMessage("Debe ser Entero")
    .notEmpty()
    .withMessage("No debe ser vacio"),
  body("nombre_materiales")
    .optional()
    .isString()
    .withMessage("Debe ser string")
    .notEmpty()
    .withMessage("No debe ser vacio"),
];
