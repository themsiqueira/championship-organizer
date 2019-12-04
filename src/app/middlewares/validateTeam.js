import * as Yup from 'yup';

export const validationStoreTeamMiddleware = async (req, res, next) => {
  const schema = Yup.object().shape({
    teams: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required(),
        })
      )
      .required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation fails' });
  }

  return next();
};

export const validationGetTeamByNameMiddleware = async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
  });

  if (!(await schema.isValid(req.query))) {
    return res.status(400).json({ error: 'Validation fails' });
  }

  return next();
};

export const validationUpdateTeamMiddleware = async (req, res, next) => {
  const schema = Yup.object().shape({
    id: Yup.number().required(),
    newName: Yup.string().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation fails' });
  }

  return next();
};

export const validationDeleteTeamMiddleware = async (req, res, next) => {
  const schema = Yup.object().shape({
    id: Yup.number().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation fails' });
  }

  return next();
};
