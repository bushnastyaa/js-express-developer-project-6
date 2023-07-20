// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/statuses', { name: 'statuses' }, async (_req, reply) => {
      const statuses = await app.objection.models.status.query();
      return reply.render('statuses/index', { statuses });
    })
    .get('/statuses/new', { name: 'newStatus', preValidation: app.authenticate }, (_req, reply) => {
      const status = new app.objection.models.status();
      return reply.render('statuses/new', { status });
    })
    .get('/statuses/:id/edit', { name: 'editStatus', preValidation: app.authenticate }, async (req, reply) => {
      const status = await app.objection.models.status.query().findById(req.params.id);
      return reply.render('statuses/edit', { status });
    })
    .post('/statuses', { preValidation: app.authenticate }, async (req, reply) => {
      try {
        const validStatus = await app.objection.models.status.fromJson(req.body.data);
        await app.objection.models.status.query().insert(validStatus);
        req.flash('info', i18next.t('flash.statuses.create.success'));
        return reply.redirect(app.reverse('statuses'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.statuses.create.error'));
        return reply.render('statuses/new', { status: req.body.data, errors: data });
      }
    })
    .patch('/statuses/:id', { name: 'patchStatus', preValidation: app.authenticate }, async (req, reply) => {
      try {
        const status = await app.objection.models.status.fromJson(req.body.data);
        const currentStatus = await app.objection.models.status.query().findById(req.params.id);
        await currentStatus.$query().update(status);
        req.flash('info', i18next.t('flash.statuses.update.success'));
        return reply.redirect(app.reverse('statuses'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.statuses.update.error'));
        return reply.render('statuses/edit', { status: req.body.data, errors: data });
      }
    })
    .delete('/statuses/:id', { name: 'deleteStatus', preValidation: app.authenticate }, async (req, reply) => {
      const tasks = await app.objection.models.status.relatedQuery('tasks').for(req.params.id);

      if (tasks.length === 0) {
        await app.objection.models.status.query().deleteById(req.params.id);
        req.flash('info', i18next.t('flash.statuses.delete.success'));
      } else {
        req.flash('error', i18next.t('flash.statuses.delete.error'));
      }

      return reply.redirect(app.reverse('statuses'));
    });
};
