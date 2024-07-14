import { isPlatformBrowser } from "@angular/common";

export const LoginUtil = {
  /**
   * ログイン判定を行います.
   * @param platformId 
   * @param router 
   */
  checkLogin: (platformId: any, router: any, routePath: string) => {
    console.log(localStorage.getItem("loginIsEnabled"));
    if (isPlatformBrowser(platformId)) {
      if (localStorage.getItem("loginIsEnabled") === "true") {
        router.navigate([routePath]);
      } else {
        localStorage.clear();
        router.navigate(['/login']);
      }
    }
  }
}