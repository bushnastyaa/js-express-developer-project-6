// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks', preValidation: app.authenticate }, async (req, reply) => {
      const status = req.query.status || undefined;
      const label = req.query.label || undefined;
      const executor = req.query.executor || undefined;
      const creator = req.query.isCreatorUser === 'on' ? req.user.id : undefined;

      const [statuses, executors, labels, tasks] = await Promise.all([
        app.objection.models.status.query(),
        app.objection.models.user.query(),
        app.objection.models.label.query(),
        app.objection.models.task.query()
          .withGraphJoined('[status, creator, executor, labels]')
          .skipUndefined()
          .where('statusId', status)
          .where('creatorId', creator)
          .where('executorId', executor)
          .where('labelId', label),
      ]);

      return reply.render('tasks/index', {
        executors, tasks, statuses, labels, values: req.query,
      });
    })
    .get('/tasks/new', { name: 'newTask', preValidation: app.authenticate }, async (_req, reply) => {
      const [task, users, statuses, labels] = await Promise.all([
        app.objection.models.task(),
        app.objection.models.user.query(),
        app.objection.models.status.query(),
        app.objection.models.label.query(),
      ]);

      return reply.render('tasks/new', {
        task, users, statuses, labels,
      });
    })
    .get('/tasks/:id', { name: 'taskView', preValidation: app.authenticate }, async (req, reply) => {
      const task = await app.objection.models.task
        .query()
        .findById(req.params.id)
        .withGraphFetched('[status, creator, executor, labels]');
      return reply.render('tasks/view', { task });
    })
    .get('/tasks/:id/edit', { name: 'editTask', preValidation: app.authenticate }, async (req, reply) => {
      const [task, users, statuses, labels] = await Promise.all([
        app.objection.models.task
          .query()
          .findById(req.params.id)
          .withGraphFetched('labels'),
        app.objection.models.user.query(),
        app.objection.models.status.query(),
        app.objection.models.label.query(),
      ]);

      return reply.render('tasks/edit', {
        task, users, statuses, labels,
      });
    })
    .post('/tasks', { preValidation: app.authenticate }, async (req, reply) => {
      try {
        const creatorId = req.user.id;
        await app.objection.models.task.query().upsertGraph({
          ...req.body.data,
          creatorId,
        }, { relate: true });

        req.flash('success', i18next.t('flash.tasks.create.success'));
        return reply.redirect(app.reverse('tasks'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.tasks.create.error'));
        const users = await app.objection.models.user.query();
        const statuses = await app.objection.models.status.query();
        const labels = await app.objection.models.label.query();
        return reply.render('/tasks/new', {
          task: req.body.data,
          errors: data,
          users,
          statuses,
          labels,
        });
      }
    })
    .patch('/tasks/:id', { name: 'patchTask', preValidation: app.authenticate }, async (req, reply) => {
      try {
        const { creatorId } = await app.objection.models.task.query().findById(req.params.id);
        const id = Number(req.params.id);

        await app.objection.models.task.transaction((trx) => (
          app.objection.models.task.query(trx).upsertGraph(
            { id, ...req.body.data, creatorId },
            { relate: true, unrelate: true, noUpdate: ['labels'] },
          )
        ));

        req.flash('success', i18next.t('flash.tasks.update.success'));
        return reply.redirect(app.reverse('tasks'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.tasks.update.error'));
        const users = await app.objection.models.user.query();
        const statuses = await app.objection.models.status.query();
        const labels = await app.objection.models.label.query();
        return reply.render('/tasks/edit', {
          task: req.body.data,
          errors: data,
          users,
          statuses,
          labels,
        });
      }
    })
    .delete('/tasks/:id', { name: 'deleteTask', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const task = await app.objection.models.task
        .query()
        .withGraphFetched('[status, creator, executor]')
        .findById(id);

      if (req.user.id !== task.creatorId) {
        req.flash('error', i18next.t('flash.tasks.delete.error'));
      } else {
        await app.objection.models.task.query().deleteById(id);
        req.flash('success', i18next.t('flash.tasks.delete.success'));
      }

      reply.redirect(app.reverse('tasks'));
    });
};
