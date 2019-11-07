// 判断权限显隐
export const judgeAuth_show = (auth, menus) => {
  if (menus.children && menus.children.length > 0) {
    let nav_auth_child = menus.children.filter(item => {
      return auth.includes(item.meta.api);
    });
    if (nav_auth_child.length) {
      return true;
    } else {
      return false;
    }
  } else {
    return auth.includes(menus.meta.title);
  }
};
