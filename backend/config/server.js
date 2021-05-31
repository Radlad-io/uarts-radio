module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 2000),
  cron: { 
    enabled: true 
  },
  admin: {
    url: '/admin',
    auth: {
      secret: env('ADMIN_JWT_SECRET', '1c8195c03ac3f83a58f545c710085900'),
    },
  }
});
