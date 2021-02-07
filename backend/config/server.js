module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  cron: { 
    enabled: true 
  },
  admin: {
    url: '/dashboard',
    auth: {
      secret: env('ADMIN_JWT_SECRET', '1c8195c03ac3f83a58f545c710085900'),
    },
  },
});
