import Joi from "joi";

const authenticationJoi=Joi.object({
    username:Joi.string(),
    email:Joi.string().email({
        minDomainSegments:2,
        tlds: {allow:["com","net"]},
    }).lowercase().required().trim(),
    password:Joi.string(),
})
export default authenticationJoi;