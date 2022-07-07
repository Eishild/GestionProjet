import Joi from "joi"

//VERIFICATION DES INPUTS D'INSCRIPTION

export const registerValidation = async (data) => {
  const schema = {
    firstName: Joi.string().alphanum().min(3).max(20).required().messages({
      "string.empty": `"Prenom" ne doit pas être vide`,
      "string.min": `"Prenom" doit contenir au moins 3 lettres`,
    }),
    lastName: Joi.string().alphanum().min(3).max(20).required().messages({
      "string.empty": `"Nom" ne doit pas être vide`,
      "string.min": `"Nom" doit contenir au moins 3 lettres`,
    }),
    email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
      "string.empty": `"Email" ne doit pas être vide`,
      "string.email": `"Email" n'est pas au bon format`,
    }),
    password: Joi.string()
      .min(4)
      // .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required()
      .messages({
        "string.empty": `"Mot de passe" ne doit pas être vide`,
        "string.min": `"Mot de passe" doit contenir minimum 4 carractères`,
      }),
  }

  return Joi.object(schema).validateAsync(data)
}
