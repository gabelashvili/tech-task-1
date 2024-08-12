const routes = {
  tabs: {
    url: 'tabs',
    protected: true,
    fullUrl: '/tabs',
  },
  users: {
    url: 'users',
    protected: true,
    fullUrl: '/users',
  },
  roles: {
    url: 'roles',
    protected: true,
    fullUrl: '/roles',
  },
  auth: {
    url: 'auth',
    fullUrl: '/auth',
    protected: false,
  },
};

export const getAllRoutes = (
  obj?: { [key: string]: any },
  prevUrl: string = '',
  prevUrls: { [key: string]: { protected: boolean } } = {},
) => {
  const urls = prevUrls;
  if (!obj) {
    obj = routes;
  }
  Object.keys(obj).forEach((key) => {
    let url = prevUrl;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      url += `${url ? '/' : ''}${obj[key].url}`;
      urls[`/${url}`] = { protected: obj[key].protected };
      return getAllRoutes(obj[key], url, prevUrls);
    }
    return null;
  });
  return urls;
};

export default routes;
