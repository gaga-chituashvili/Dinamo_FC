type AuthRoutes = {
  login: string;
  register: string;
};

function resolvePrefix(pathname?: string): string {
  if (!pathname) {
    return "";
  }

  if (pathname === "/restaurants" || pathname.startsWith("/restaurants/")) {
    return "/restaurants";
  }

  return "";
}

export function resolveAuthRoutes(pathname?: string): AuthRoutes {
  const prefix = resolvePrefix(pathname);
  return {
    login: `${prefix}/login`,
    register: `${prefix}/register`,
  };
}

export const AUTH_ROUTES = resolveAuthRoutes();
