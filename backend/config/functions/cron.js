'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/concepts/configurations.html#cron-tasks
 */

module.exports = {
  // TODO: Create post scheduling job system
  // '*/1 * * * *': async () => {
  //   // fetch articles to publish
  //   const draftArticleToPublish = await strapi.api.article.services.article.find({
  //     _publicationState: 'preview',
  //     publish_at_lt: new Date(),
  //   });

  //   // update published_at of articles
  //   draftArticleToPublish.forEach(async article => {
  //     await strapi.api.article.services.article.update(
  //       { id: article.id },
  //       { scheduled: new Date() }
  //     );
  //   });
  // },
};