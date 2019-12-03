import * as Yup from 'yup';

export const validationGetGamesByChampionshipMiddleware = async (
  req,
  res,
  next
) => {
  const schema = Yup.object().shape({
    championshipId: Yup.number().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation fails' });
  }

  return next();
};

export const validationUpdateGamesMiddleware = async (req, res, next) => {
  const schema = Yup.object().shape({
    gameId: Yup.number().required(),
    firstTeamGoals: Yup.number().required(),
    secondTeamGoals: Yup.number().required(),
    firstTeamProGoals: Yup.number().required(),
    secondTeamProGoals: Yup.number().required(),
  });

  if (!(await schema.isValid(req.query))) {
    return res.status(400).json({ error: 'Validation fails' });
  }

  return next();
};
