export function getCurrentRole() {
  return "admin";
}

export function checkAccess(authority) {
  const role = getCurrentRole();
  return authority.includes(role);
}

export function isLogin() {
  const role = getCurrentRole();
  return role && role !== "guest";
}
