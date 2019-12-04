import * as Yup from 'yup';

export const validationGetRankingMiddleware = async (req, res, next) => {
  const schema = Yup.object().shape({
    championshipId: Yup.number().required(),
  });

  if (!(await schema.isValid(req.query))) {
    return res.status(400).json({ error: 'Validation fails' });
  }

  return next();
};
