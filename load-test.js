module.exports = {
  config: {
    target: 'http://localhost:3000',
    phases: [
      { duration: 60, arrivalRate: 5 },
      { duration: 120, arrivalRate: 10 },
      { duration: 60, arrivalRate: 20 }
    ],
    defaults: {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  },
  scenarios: [
    {
      name: 'Browse menu items',
      flow: [
        { get: { url: '/api/menu' } },
        { get: { url: '/api/menu/category/Sushi' } },
        { think: 1 }
      ]
    },
    {
      name: 'Place order',
      flow: [
        { post: { 
            url: '/api/auth/login',
            json: {
              email: '${email}',
              password: '${password}'
            },
            capture: {
              json: '$.token',
              as: 'token'
            }
          }
        },
        { post: {
            url: '/api/orders',
            headers: {
              Authorization: 'Bearer ${token}'
            },
            json: {
              items: [
                { menuItemId: '${menuItemId}', quantity: 2 }
              ]
            }
          }
        }
      ]
    }
  ]
};