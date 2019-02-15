const Pkg = require('../package.json')

module.exports = {
  register: async (server) => {
    server.route({
      method: 'GET',
      path: '/status',
      config: {
        description: 'Status',
        notes: 'Service status endpoint',
        tags: ['api'],
      },
      handler: () => ({ version: Pkg.version }),
    })
  },
  name: 'status',
}
