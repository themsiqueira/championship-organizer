import * as Yup from 'yup';

export const validationStoreChampionshipMiddleware = async (req, res, next) => {
  const schema = Yup.object().shape({
    title: Yup.string().required(),
    teams: Yup.array()
      .min(4)
      .required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation fails' });
  }

  return next();
};
